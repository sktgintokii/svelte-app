// https://pokeapi.co

type PokemonLinkRef = {
  name: string;
  url: string;
};

export type PokemonListItem = PokemonLinkRef & {
  id: number;
  imageUrl: string;
};

export type Pokemon = {
  abilities: {
    ability: string;
    url: string;
    isHidden: boolean;
    slot: number;
  }[];
  baseExperience: number;
  forms: PokemonLinkRef[];
  height: number;
  id: number;
  isDefault: boolean;
};

export const getPokemons = () => {
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=898&offset=0`)
    .then((res) => res.json())
    .then((json: { results: { name: string; url: string }[] }) => {
      return json.results.map((pokemon, index) => {
        const id = index + 1;
        return {
          name: pokemon.name,
          url: pokemon.url,
          id,
          imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        } as PokemonListItem;
      });
    });
};

export const getPokemonByName = (name: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
    res.json()
  );
};
