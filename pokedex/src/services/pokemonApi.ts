import axios from 'axios';
import type { Pokemon, PokemonListItem } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  async getPokemonList(): Promise<PokemonListItem[]> {
    const response = await axios.get(`${API_BASE_URL}/pokemon?limit=252`);
    return response.data.results.map((pokemon: any, index: number) => ({
      ...pokemon,
      id: index + 1
    }));
  },

  async getPokemon(id: number): Promise<Pokemon> {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${id}`);
    return response.data;
  }
};