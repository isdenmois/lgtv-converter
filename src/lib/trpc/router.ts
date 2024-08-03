import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import type { Context } from '$lib/trpc/context';
import {
	copyAll,
	getMediaItems,
	getMediaSubtitles
} from '$lib/server/repositories/files.repository';
import { jellyfinApi } from '$lib/server/jellyfin/api';

export const t = initTRPC.context<Context>().create();
const p = t.procedure;

export const router = t.router({
	greeting: p.query(async () => {
		return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	}),
	list: t.procedure.query(async () => {
		return await getMediaItems();
	}),
	getSubtitlesList: p.input(z.string()).query(({ input }) => getMediaSubtitles(input)),
	copy: p
		.input(z.object({ folder: z.string(), subtitles: z.string() }))
		.mutation(async ({ input }) => {
			await copyAll(input.folder, input.subtitles);

			jellyfinApi.refreshMetadata();
		})
});

export const createCaller = t.createCallerFactory(router);

export type Router = typeof router;
