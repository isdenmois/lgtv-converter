<script lang="ts">
	import { page } from '$app/stores';
	import { ListItem } from '$lib/shared';
	import { trpc } from '$lib/trpc/client';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Choose media to copy subtitles</h1>

<ul>
	{#each data.files as file}
		<a href={`/copy/${file}`}>
			<ListItem label={file} />
		</a>
	{/each}
</ul>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		font-size: 20px;
	}
</style>
