<script lang="ts" context="module">
	import 'tippy.js/dist/tippy.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { UserStore, isLoggedIn } from '$lib/stores/user';
	import AuthIndicator from '$lib/components/nav/AuthIndicator.svelte';
	import FirestoreAPI from '$lib/firebase/firestore';
	import AuthAPI from '$lib/firebase/auth';
	import '../app.css';

	const Auth = new AuthAPI();
</script>

<script>
	Auth.onAuthStateChange();
	$: user = $UserStore;
</script>

<svelte:head>
	<title>GREP PROJECT</title>
</svelte:head>

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
	<main>
		<slot />
		<SvelteToast options={{ reversed: true, intro: { y: 50 } }} />
	</main>
	<footer class="p-4 footer bg-slate-800 text-slate-50 footer-center">
		<div>
			<p>
				Copyright © 2021 - All right reserved
				<a href="http://pixelcode.cl" target="_blank">
					<span class="text-amber-400">Pixel</span><span class="text-sky-500">Code</span>
				</a>
			</p>
		</div>
	</footer>
</template>

<style global>
	@import 'filepond/dist/filepond.css';
	@import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

	:root {
		--toastContainerTop: auto;
		--toastContainerRight: auto;
		--toastContainerBottom: 1rem;
		--toastContainerLeft: calc(50vw - 8rem);
	}

	main {
		height: calc(100vh - 124px);
	}
</style>
