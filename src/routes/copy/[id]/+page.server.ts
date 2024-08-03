import { trpc } from '$lib/server/trpc';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const id = event.params.id;
	const api = await trpc(event);
	const subtitles = await api.getSubtitlesList(id);

	return { id, subtitles };
}) satisfies PageServerLoad;
