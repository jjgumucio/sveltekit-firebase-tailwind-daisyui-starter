<script lang="ts">
	import { goto } from '$app/navigation';
	import SessionStore from '$lib/stores/session';

	const user = $SessionStore;

	const path = user ? '/profile' : '/auth/login';
  console.log('path:', path);
  
</script>

<div class="avatar mr-4">
	<div class="rounded-full w-10 h-10 m-1">
		<button
			class="btn btn-circle"
			on:click={() => {
				goto(path);
			}}
		>
			{#if user}
				<img src="https://i.pravatar.cc/500?img=32" alt="avatar" />
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 loginIcon"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
					/>
				</svg>
			{/if}
		</button>
	</div>
</div>

<style>
	.loginIcon {
		margin-top: -0.5rem;
	}
</style>
