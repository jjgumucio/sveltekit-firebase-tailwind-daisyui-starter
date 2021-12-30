<script lang="ts">
  export let label: string
  export let name: string
  export let multiple: boolean
</script>

<template>
	<label
		class="
      label
      w-64
      flex flex-col
      items-center
      px-4
      py-6
      bg-white
      rounded-md
      shadow-md
      tracking-wide
      uppercase
      border border-blue
      cursor-pointer
      hover:bg-purple-600 hover:text-white
      text-purple-600
      ease-linear
      transition-all
      duration-150
    "
	>
		<span class="text-base leading-normal">{label}</span>
		<input type="file" class="hidden" {name} {multiple} />
	</label>
</template>
