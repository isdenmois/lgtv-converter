import fs, { readdir, lstat } from 'node:fs/promises';
import { readdirSync, statSync, existsSync } from 'node:fs';
import path, { basename } from 'node:path';
import { MEDIA_LOCATION } from '../env';

export const getMediaItems = async () => {
	const content = await readdir(MEDIA_LOCATION);

	return content.filter((item) => !item.startsWith('.')).sort();
};

const SUBTITLE_EXTS = new Set(['.ass', '.srt', '.ssa', '.sub']);
const isSubtitles = (filename: string) => SUBTITLE_EXTS.has(path.extname(filename));

function searchDirsWithFiles(
	directory: string,
	exts: Set<string>,
	filepaths: string[] = [],
	isRoot = true
) {
	const files = readdirSync(directory);

	for (const filename of files) {
		const filepath = path.join(directory, filename);
		if (statSync(filepath).isDirectory()) {
			searchDirsWithFiles(filepath, exts, filepaths, false);
		} else if (!isRoot && isSubtitles(filename)) {
			filepaths.push(directory);
			break;
		}
	}

	return filepaths;
}

export const getMediaSubtitles = async (title: string) => {
	const root = path.join(MEDIA_LOCATION, title);
	const details = await lstat(root);

	if (!details.isDirectory()) {
		throw new Error(`No such directory: ${root}`);
	}

	const exts = new Set(['.ass', '.srt', '.ssa', '.sub']);
	const dirs = searchDirsWithFiles(root, exts);

	return dirs.map((dir) => dir.replace(root, '').slice(1)).sort();
};

function addPostfix(destination: string, postfix: string) {
	const dir = path.dirname(destination);
	const ext = path.extname(destination);
	const base = path.basename(destination, ext);

	return path.join(dir, `${base}.${postfix}${ext}`);
}

export const copyAll = async (folder: string, source: string, parents: string[] = []) => {
	const postfix = basename(source)
		.replace(/[^A-Za-z0-9]+/g, ' ')
		.replace(/(rus|sub[s]?)/gi, '')
		.trim();
	const root = path.join(MEDIA_LOCATION, folder, source, ...parents);

	const contents = await readdir(root, { withFileTypes: true });

	for (const entry of contents) {
		const from = path.join(root, entry.name);
		const destination = path.join(MEDIA_LOCATION, folder, ...parents, entry.name);

		if (entry.isDirectory()) {
			if (!existsSync(destination)) {
				console.log('Make a directory', destination);

				await fs.mkdir(destination);
			}

			await copyAll(folder, source, [...parents, entry.name]);
		} else {
			const to = isSubtitles(entry.name) ? addPostfix(destination, postfix) : destination;

			console.log('copy', from, '=>', to);
			await fs.copyFile(from, to);
		}
	}
};
