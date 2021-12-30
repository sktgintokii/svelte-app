<style global lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

main {
  text-align: center;
  padding: 1em;
  max-width: 240px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  main {
    max-width: none;
  }
}
</style>

<script lang="ts">
import { Router, Link, Route } from 'svelte-routing';
import PokemonListPage from './pages/PokemonList.svelte';
import PokemonDetailsPage from './pages/PokemonDetails.svelte';

export let url = '';
</script>

<main>
  <Router url="{url}">
    <Route path="details/:id" component="{PokemonDetailsPage}" />
    <Route path="/" component="{PokemonListPage}" />
  </Router>
</main>
