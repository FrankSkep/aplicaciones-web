import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../shared/api';
import { useState } from 'react';
import type { PokemonResponse } from '../interface/types/PokemonResponse';

export const useSearchPokemons = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState<'asc' | 'desc'>('asc');

    const params = {
        page,
        size: pageSize,
        name: search || undefined,
        order: sort,
    };

    const query = useQuery({
        queryKey: ['buscarPokemones'],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const response = await api.get<PokemonResponse>('/pokemons', { params });
            return response.data;
        },
    });
    return { query, page, setPage, pageSize, setPageSize, search, setSearch, sort, setSort };
};
