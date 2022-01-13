<script lang="ts">
  import { isLoggedIn } from '$lib/stores/user';
</script>

<svelte:head>
  <title>GREP PROJECT | Home</title>
</svelte:head>

<template>
  <div class="container mx-auto px-4 py-4 sm md lg xl 2xl">
    <h1 class="prose prose-xl">GREP PROJECT</h1>
    <p class="font-bold">
      {#if $isLoggedIn}
        <a href="/grep" class="btn-link">Go to GREP</a>
      {:else}
        Necesitas ingresar con tu cuenta <br />
        <a href="/auth/login" class="btn-link">Ingresar</a>
      {/if}
    </p>
  </div>
</template>
