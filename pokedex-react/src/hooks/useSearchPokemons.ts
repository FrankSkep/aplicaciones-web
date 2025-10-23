import { useQuery } from '@tanstack/react-query';
import { api } from '../shared/api';
import { useState, useEffect } from 'react';
import type { PokemonResponse } from '../types/pokemonResponse';

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

    // Debounce search to avoid firing a request on every keystroke
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(t);
    }, [search]);

    const params = {
        page,
        size: pageSize,
        name: debouncedSearch || undefined,
        order: sort,
    };

    const query = useQuery<PokemonResponse, Error>({
        // use primitives in the key to avoid new object identity each render
        queryKey: ['buscarPokemones', page, pageSize, debouncedSearch, sort],
        queryFn: async () => {
            const response = await api.get<PokemonResponse>('/pokemons', { params });
            return response.data;
        },
        staleTime: 1000 * 10, // 10s
    });

    const typedData = query.data as PokemonResponse | undefined;

    const nextPage = () => {
        if (typedData?.hasNext) {
            setPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (typedData?.hasPrev) {
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
