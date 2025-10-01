import PokemonCard from './PokemonCard';
import type { PokemonListItem } from '../types/pokemon';

interface PokemonGridProps {
  pokemon: PokemonListItem[];
  onPokemonClick: (id: number) => void;
  searchTerm?: string;
}

export default function PokemonGrid({ pokemon, onPokemonClick, searchTerm }: PokemonGridProps) {
  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="text-6xl sm:text-8xl mb-4">🔍</div>
        <h3 className="text-lg sm:text-xl font-semibold text-orange-600 mb-2">
          No se encontraron Pokémon
        </h3>
        {searchTerm && (
          <p className="text-sm sm:text-base text-orange-500">
            No hay resultados para "{searchTerm}"
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
      {pokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          onClick={() => onPokemonClick(pokemon.id)}
        />
      ))}
    </div>
  );
}