<script lang="ts">
	export let type: string = 'text';
	export let name: string;
	export let label: string;
	export let placeholder: string = label;
	export let helpText: string = '';
</script>

	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label">
		<span class="label-text">{label}</span>
	</label>
	<input {type} {placeholder} {name} class="input input-bordered w-full max-w-xs" />

	{#if helpText}
		<span class="label-text-alt">Enter any text!</span>
	{/if}
