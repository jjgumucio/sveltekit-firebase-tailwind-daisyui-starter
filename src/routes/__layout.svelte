<script lang="ts" context="module">
	import '../app.css';
	import 'tippy.js/dist/tippy.css';
	import AuthAPI from '$lib/firebase/auth';
	import UserStore from '$lib/stores/user';
	import AuthIndicator from '$lib/components/nav/AuthIndicator.svelte';
	import FirestoreAPI from '$lib/firebase/firestore';
	const Auth = new AuthAPI();
	const Firestore = new FirestoreAPI();

	export async function load({ url, params, fetch, session, stuf }) {
		try {
			const researchDocs = await Firestore.listCollectionDocs('researchs');
			console.log('RESEARCHS:', researchDocs);

			return {
				props: {
					researches: researchDocs
				}
			};
		} catch (error) {
			console.log('Error:', error.message);
		}
	}
</script>

<script>
	$: user = $UserStore;
</script>

<template>
	<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
		<div class="flex-none hidden lg:flex">
			<button class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/>
				</svg>
			</button>
		</div>
		<div class="flex-1 hidden px-2 mx-2 lg:flex">
			<a href="/" alt="Home">
				<span class="text-lg font-bold"> GREP </span>
			</a>
		</div>
		{#if user}
			<div class="flex-none">
				<button class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block w-6 h-6 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>
				</button>
			</div>
		{/if}
		<div class="flex-none">
			<AuthIndicator {user} />
		</div>
	</div>
	<slot />
</template>

<style global>
	@import 'filepond/dist/filepond.css';
	@import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
</style>
