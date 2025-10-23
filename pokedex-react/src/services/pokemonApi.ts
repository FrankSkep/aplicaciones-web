import { api } from '../shared/api';
import type { Pokemon, PokemonListItem } from '../types/pokemon';
import type { PokemonResponse, Datum } from '../types/pokemonResponse';

export const pokemonApi = {
  async fetchAndSave(): Promise<void> {
    await api.post('/pokemons/fetch');
  },

  async getPokemonList(): Promise<PokemonListItem[]> {
    // Backwards-compatible: fetch all 252 items via backend if available
    const response = await api.get<PokemonResponse>('/pokemons', { params: { page: 1, size: 1000 } });
    return response.data.data.map((d: Datum) => ({
      name: d.name,
      url: d.url,
      id: d.id,
    }));
  },

  async getPokemon(id: number): Promise<Pokemon> {
    const response = await api.get(`/pokemons/${id}`);
    return response.data as Pokemon;
  },

  async search(params: { page?: number; size?: number; name?: string; order?: 'asc'|'desc' }) {
    const response = await api.get<PokemonResponse>('/pokemons', { params });
    return response.data;
  }
};