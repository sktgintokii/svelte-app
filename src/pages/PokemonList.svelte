<style>
.search-field {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: baseline;
}

.pokemon-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

:global(.pokemon-card) {
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

:global(.pokemon-card):hover {
  transform: scale(105%);
}
</style>

<script lang="ts">
import { onMount } from 'svelte';
import { scale } from 'svelte/transition';
import {
  FormField,
  TextField,
  Card,
  Headline,
  Pagination,
  Button,
} from 'attractions';
import { getPokemons, PokemonListItem } from '../services/pokemon';

const pageSize = 20;
let keyword = '';
let keywordInput = '';
let pokemons: PokemonListItem[] = [];
let currentPageNum = 0;
let totalPageNum = 0;
const handlePageChange = (event: CustomEvent<{ value: number }>) => {
  currentPageNum = event.detail.value - 1;
};
const handleSubmit = () => {
  keyword = keywordInput;
  currentPageNum = 0;
};

$: filteredPokemons = keyword.length
  ? pokemons.filter((pokemon) => pokemon.name.includes(keyword))
  : pokemons;
$: pokemonsInThisPage = filteredPokemons.slice(
  currentPageNum * pageSize,
  currentPageNum * pageSize + pageSize
);
$: totalPageNum = Math.ceil(filteredPokemons.length / pageSize);

onMount(async () => {
  pokemons = await getPokemons();
});
</script>

<div>
  <Headline>Poke Base</Headline>
  <form class="search-field" on:submit|preventDefault="{handleSubmit}">
    <TextField outline label="Keyword" bind:value="{keywordInput}" />
    <Button class="search-button" filled type="submit">Search</Button>
  </form>

  <Pagination pages="{totalPageNum}" on:change="{handlePageChange}" />
  <div class="pokemon-list">
    {#each pokemonsInThisPage as pokemon, i}
      <div transition:scale="{{ duration: 1000 }}">
        <Card class="pokemon-card">
          <div>
            {pokemon.id}. {pokemon.name}
          </div>
          <img src="{pokemon.imageUrl}" alt="{pokemon.name}" />
        </Card>
      </div>
    {/each}
  </div>
</div>
