import { api } from '../shared/api';

export const authApi = {
  async register(payload: { username: string; email: string; password: string }) {
    // backend auth/register POST
    const res = await api.post('/auth/register', payload);
    return res.data;
  },

  async login(payload: { username: string; password: string }) {
    // backend login (sets cookies)
    const res = await api.post('/auth/login', payload);
    return res.data; // user object
  },

  async logout() {
    await api.post('/auth/logout');
  },
};

export default authApi;
