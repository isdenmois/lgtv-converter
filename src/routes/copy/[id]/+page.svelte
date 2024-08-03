<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Radio } from '$lib/shared';
	import { trpc } from '$lib/trpc/client';
	import type { PageData } from './$types';

	export let data: PageData;

	const api = trpc($page);

	let form: HTMLFormElement;

	const submit = async () => {
		const formData = new FormData(form);
		const selected = formData.get('name');

		if (selected && typeof selected === 'string') {
			await api.copy.mutate({
				folder: data.id,
				subtitles: selected
			});

			alert('Copied');

			goto('/');
		}
	};
</script>

<h1>{data.id}</h1>

<form on:submit|preventDefault={submit} bind:this={form}>
	<Radio name="name" items={data.subtitles} />

	<button type="submit">Copy</button>
</form>

<style>
	button {
		display: block;
		margin-top: 1rem;
		margin-left: auto;
		margin-right: auto;
	}
</style>
