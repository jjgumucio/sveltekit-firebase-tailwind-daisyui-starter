<script lang="ts" context="module">
  import { getContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { createForm } from 'felte';
  import { validator } from '@felte/validator-yup';
  import reporter from '@felte/reporter-tippy';
  import FirestoreAPI from '$lib/firebase/firestore';
  import StorageAPI from '$lib/firebase/storage';
  import AuthAPI from '$lib/firebase/auth';
  import { validationSchema } from '$lib/validations/testValidations';
  import FilePond from '$lib/components/inputs/FilePond.svelte';
  import TagsInput from '$lib/components/inputs/TagsInput.svelte';
  import type { DocumentReference } from 'firebase/firestore';
  import type { iResearch } from '$lib/firebase/interfaces';
  import { UserStore, isLoggedIn } from '$lib/stores/user';
  import { fetch } from '@sveltejs/kit/install-fetch';

  const Storage = new StorageAPI();
  const Firestore = new FirestoreAPI();
  const Auth = new AuthAPI();

  export const load = async ({ params, fetch, session, stuff }) => {
    const url = '/grep.json';
    try {
      console.log('Still here!)');
      const res = await fetch(url);

      if (res.ok) {
        return {
          props: {
            session: await res,
          },
        };
      }
      return {
        status: res.status,
        error: new Error(`Could not load ${url}`),
      };
    } catch (error) {
      console.log('Still here!)');
      console.error('Error getting User session:', error);
    }
  };
</script>

<script lang="ts">
  let user = getContext('user');
  let storeUser = $UserStore;
  let storeLoggedIn = $isLoggedIn;
  console.log('IS LOGed:', storeLoggedIn);

  let researches = writable<DocumentReference<unknown>[] | DocumentReference<unknown>>();
  $: researchNames = $researches?.map((r: iResearch) => r.name);
  onMount(async () => {
    try {
      const response = await Firestore.listCollectionDocs('researches');
      researches.set(response.data);
      console.log('names:', researchNames);
      // Reasing here to trigger Svelte's reactivity
      researchNames = researchNames;
    } catch (error) {
      console.error('Error:', error);
    }
  });

  const { form } = createForm({
    extend: [validator, reporter()],
    validateSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values: any) => {
    const { searchFiles } = values;
    try {
      return;
      Storage.uploadFile(searchFiles, 'someDir');
      const { data } = await Storage.getDownloadURL(`someDir/${searchFiles.name}`);
      const upsertResponse = await Firestore.addDoc('testCollection', {
        searchFiles,
        downloadURL: data.downloadURL,
      });
    } catch (error) {
      console.log('Error:', error);
    }
  };
</script>

<div class="mx-auto w-full lg:w-4/12 px-4">
  <h1 class="text-3xl my-10">Nueva búsqueda:</h1>

  <p class="text-xl my-10">
    Mediante esta interfaz podrá seleccionar un estudio ya existente, o crear uno nuevo, al cual se
    le asociará la búsqueda que especifique a continuación y sus respectivos resultados.
  </p>

  <form use:form>
    <TagsInput label="Seleccione o cree estudio:" options={researchNames} multiple={false} />

    <div class="form-control my-4">
      <label for="filepond">Arrastre o seleccione archivos</label>
      <FilePond />
    </div>

    <TagsInput
      label="Seleccione o agregue términos:"
      options={[
        'GASTRITIS CRONICA ATROFICA',
        'METAPLASIA INTESTINAL COMPLETA',
        'METAPLASIA INTESTINAL INCOMPLETA',
        'METAPLASIA INTESTINAL MIXTA',
        'METAPLASIA PSEUDOPILORICA',
        'HELICOBACTER PYLORI',
        'OLGA',
        'OLGIM',
      ]}
    />

    <button class="btn" type="submit">Buscar</button>
  </form>
</div>

<style>
</style>
