import { trpc } from '$lib/server/trpc';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const api = await trpc(event);
	const files = await api.list();

	return { files };
}) satisfies PageServerLoad;
