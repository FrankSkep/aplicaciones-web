import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../shared/api';
import { useState } from 'react';
import type { PokemonResponse } from '../interface/types/PokemonResponse';

interface UseSearchPokemonsParams {
    page?: number;
    pageSize?: number;
    search?: string;
    sort?: 'asc' | 'desc';
}

export const useSearchPokemons = (initialParams?: UseSearchPokemonsParams) => {
    const [page, setPage] = useState(initialParams?.page || 1);
    const [pageSize, setPageSize] = useState(initialParams?.pageSize || 20);
    const [search, setSearch] = useState(initialParams?.search || '');
    const [sort, setSort] = useState<'asc' | 'desc'>(
        initialParams?.sort || 'asc'
    );

    let where = search;

    if (search) {
        const id = Number(search);
        if (!isNaN(id) && String(id) === String(search)) {
            where = id.toString();
        }
    }

    const params = {
        page,
        size: pageSize,
        name: search || undefined,
        order: sort,
    };

    const query = useQuery({
        queryKey: ['buscarPokemones', [params]],
        queryFn: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            const response = await api.get<PokemonResponse>('/pokemons', {
                params,
            });
            return response.data;
        },
    });

    const nextPage = () => {
        if (query.data?.hasNext) {
            setPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (query.data?.hasPrev) {
            setPage((prev) => prev - 1);
        }
    };

    const goTo = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const limitedPageSize = (size: number) => {
        setPageSize(size);
        setPage(1);
    };

    const sortPokemons = (sortOrder: 'asc' | 'desc') => {
        setSort(sortOrder);
        setPage(1);
    };

    const searchPokemons = (searchTerm: string) => {
        setSearch(searchTerm);
        setPage(1);
    };

    return {
        query,
        page,
        setPage,
        pageSize,
        setPageSize,
        search,
        setSearch,
        sort,
        setSort,
        nextPage,
        prevPage,
        goTo,
        limitedPageSize,
        sortPokemons,
        searchPokemons,
    };
};
