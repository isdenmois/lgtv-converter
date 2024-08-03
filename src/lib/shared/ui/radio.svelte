<script lang="ts" context="module">
	import { onMount } from 'svelte';
</script>

<script lang="ts">
	export let name: string;
	export let items: string[];
	export let initialValue: unknown = items[0];

	let listRoot: HTMLUListElement;

	onMount(() => {
		const initialItem = listRoot.querySelector(
			`input[value="${initialValue}"]`
		) as HTMLInputElement;

		if (initialItem) {
			initialItem.checked = true;
		}
	});
</script>

<ul bind:this={listRoot}>
	{#each items as item}
		<li>
			<label>
				<input type="radio" {name} value={item} />
				{item}
			</label>
		</li>
	{/each}
</ul>

<style>
	ul {
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		list-style: none;
		padding: 0;
	}

	li {
		display: flex;
	}

	label {
		flex: 1;
		padding: 0.5rem;
		text-align: center;
		font-size: 32px;
		font-weight: bold;
	}

	li + li {
		border-left: var(--border);
	}

	label:has(:checked) {
		background-color: var(--color-checked, var(--color-header));
		color: var(--color-background);
	}
</style>
