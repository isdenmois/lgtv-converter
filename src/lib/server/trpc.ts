import type { RequestEvent } from '@sveltejs/kit';
import { createContext } from '$lib/trpc/context';
import { createCaller } from '$lib/trpc/router';

export async function trpc(event: RequestEvent) {
	return createCaller(await createContext(event));
}
