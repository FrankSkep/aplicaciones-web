export interface PokemonResponse {
    data:       Datum[];
    total:      number;
    page:       number;
    size:       number;
    totalPages: number;
    hasNext:    boolean;
    hasPrev:    boolean;
    nextPage:   number | null;
    prevPage:   number | null;
}

export interface Datum {
    id:        number;
    name:      string;
    url:       string;
    image:     string;
    types:     string[];
    abilities: string[];
    height:    number;
    weight:    number;
}