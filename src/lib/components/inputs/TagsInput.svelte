<script lang="ts">
  import AutoComplete from 'simply-svelte-autocomplete';

  export let label: string;
  export let options: string[];
  export let multiple = true;

  let selectedTerms: string[] = [];

  const onTermSubmission = (term: string) => {
    if (multiple) {
      if (selectedTerms.indexOf(term) === -1) {
        selectedTerms = [...selectedTerms, term];
      }
    } else {
      selectedTerms = [term];
    }
  };

  const removeTerm = (term: string) => {
    selectedTerms = selectedTerms.filter((selectedTerm) => {
      return term !== selectedTerm;
    });
  };
</script>

<div class="form-control my-4">
  <label for="searchTerms" class="py-2">{label}</label>
  <AutoComplete {options} onSubmit={onTermSubmission} />
  <div class="my-2">
    {#each selectedTerms as term}
      <button
        class="badge badge-outline badge-secondary h-8"
        on:click={() => {
          removeTerm(term);
        }}
      >
        {term}
      </button>
    {/each}
  </div>
</div>

<style>
  .tag {
    background-color: #4470ff;
  }
</style>
