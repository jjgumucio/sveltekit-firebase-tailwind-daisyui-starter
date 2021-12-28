<script lang="ts" context="module">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import reporter from '@felte/reporter-tippy';
	import FirestoreAPI from '$lib/firebase/firestore';
	import StorageAPI from '$lib/firebase/storage';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import FileInput from '$lib/components/inputs/FileInput.svelte';
	import { validationSchema } from '$lib/validations/testValidations';

	const Firestore = new FirestoreAPI();
	const Storage = new StorageAPI();
</script>

<script lang="ts">
	const { form } = createForm({
		extend: [validator, reporter()],
		validateSchema: validationSchema,
		onSubmit: (values) => {
			handleSubmit(values);
		}
	});

	const selectOptions = [
		{ id: 'firstOption', text: 'First Option' },
		{ id: 'secondOption', text: 'Second Option' },
		{ id: 'thirdOption', text: 'Third Option' }
	];

	const handleSubmit = async (values: any) => {
		const { testFile, testInput, testSelect } = values;
		try {
			Storage.uploadFile(testFile, 'someDir');
			const { data } = await Storage.getDownloadURL(`someDir/${testFile.name}`);
			const upsertResponse = await Firestore.addDoc('testCollection', {
				testInput,
				testSelect,
				downloadURL: data.downloadURL
			});
		} catch (error) {
			console.log('Error:', error);
		}
	};
</script>

<svelte:head>
	<title>SvelteKit Firebase Tailwindcss Starter</title>
</svelte:head>

<template>
	<div class="container mx-auto px-4 py-4 sm md lg xl 2xl">
		<h1 class="prose prose-xl">Welcome to SvelteKit Firebase & Tailwindcss starter</h1>

		<form use:form>
			<div class="form-control my-4">
				<TextInput label="Test Input" name="testInput" />
			</div>

			<div class="form-control my-4">
				<select class="select select-bordered w-full max-w-xs" name="testSelect">
					{#each selectOptions as option}
						<option value={option.id}>{option.text}</option>
					{/each}
					<option disabled>Disabled Option</option>
				</select>
			</div>

			<div class="mx-auto form-control my-4">
				<FileInput label="Select a file" name="testFile" />
			</div>
			<button class="btn" type="submit">Submit</button>
		</form>
	</div>
</template>
