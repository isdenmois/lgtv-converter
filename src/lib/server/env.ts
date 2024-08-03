import { env } from '$env/dynamic/public';

export const MEDIA_LOCATION = env.PUBLIC_MEDIA_LOCATION ?? '/app';
export const REFRESH_URL = env.PUBLIC_REFRESH_URL ?? '/';
