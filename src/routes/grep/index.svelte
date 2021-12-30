<script lang="ts" context="module">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import reporter from '@felte/reporter-tippy';
	import FirestoreAPI from '$lib/firebase/firestore';
	import StorageAPI from '$lib/firebase/storage';
	import { validationSchema } from '$lib/validations/testValidations';
	import FilePond from '$lib/components/inputs/FilePond.svelte';

	const Firestore = new FirestoreAPI();
	const Storage = new StorageAPI();
</script>

<script lang="ts">
	const { form } = createForm({
		extend: [validator, reporter()],
		validateSchema: validationSchema,
		onSubmit: (values) => {
			console.log('asdf');
			handleSubmit(values);
		}
	});

	const handleSubmit = async (values: any) => {
		const { searchFiles } = values;
		console.log('VALUES:', values);
		console.log('FILES:', searchFiles);

		try {
			return;
			Storage.uploadFile(searchFiles, 'someDir');
			const { data } = await Storage.getDownloadURL(`someDir/${searchFiles.name}`);
			const upsertResponse = await Firestore.addDoc('testCollection', {
				searchFiles,
				downloadURL: data.downloadURL
			});
		} catch (error) {
			console.log('Error:', error);
		}
	};
</script>

<div class="h-full p-4">
	<form use:form>
		<div class="mx-auto form-control my-4">
			<FilePond />
		</div>
		<button class="btn" type="submit">Buscar</button>
	</form>
</div>

<style>
</style>
