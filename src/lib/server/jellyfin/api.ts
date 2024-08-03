import { REFRESH_URL } from '../env';

export const jellyfinApi = {
	refreshMetadata: () => fetch(REFRESH_URL, { method: 'POST' })
} as const;
