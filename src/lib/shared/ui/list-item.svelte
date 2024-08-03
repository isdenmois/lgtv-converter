<script lang="ts">
	export let label: string;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li on:click>
	<slot name="left" />

	<div class="label">
		{label}
	</div>
	<slot name="right" />
</li>

<style>
	li {
		display: flex;
		gap: 1rem;
		align-items: center;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		overflow: hidden;
		padding: 1rem 1rem;
		position: relative;
		margin-bottom: 1rem;
	}

	.label {
		flex: 1;
		font-weight: bold;
		font-size: 20px;
	}
</style>
