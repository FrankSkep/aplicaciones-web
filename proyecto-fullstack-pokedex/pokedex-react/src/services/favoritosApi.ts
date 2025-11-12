import { api } from '../shared/api';

export const favoritosApi = {
  async addFavorito(pokemonId: number) {
    const res = await api.post(`/favoritos/${pokemonId}`);
    return res.data;
  },

  async getFavoritos() {
    const res = await api.get('/favoritos');
    return res.data;
  },
};

export default favoritosApi;
