export interface Pokemon {
  id: number;
  name: string;
  url?: string;
  image?: string | null;
  types?: string[];
  abilities?: string[];
  height?: number | null;
  weight?: number | null;
}

export interface PokemonListItem {
  name: string;
  url: string;
  id: number;
}