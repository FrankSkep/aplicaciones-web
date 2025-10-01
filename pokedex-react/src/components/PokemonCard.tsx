import { useState, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';

interface PokemonCardProps {
  id: number;
  name: string;
  onClick: () => void;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export default function PokemonCard({ id, name, onClick }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const data = await pokemonApi.getPokemon(id);
        setPokemon(data);
      } catch (err) {
        setError('Error al cargar el Pokémon');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 md:p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="animate-pulse">
          <div className="w-full h-20 sm:h-24 md:h-32 bg-gray-300 rounded mb-2"></div>
          <div className="h-3 sm:h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-2 sm:h-3 bg-gray-300 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 md:p-4">
        <div className="text-red-500 text-center text-xs sm:text-sm">{error || 'Error'}</div>
      </div>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-2 sm:p-3 hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 active:scale-95"
      onClick={onClick}
    >
      <div className="text-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 mx-auto mb-1 sm:mb-2"
          loading="lazy"
        />
        <h3 className="font-bold text-xs sm:text-sm capitalize mb-1 sm:mb-2 leading-tight">
          #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
        </h3>

        <div className="flex flex-wrap justify-center gap-1">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={`px-1 sm:px-1.5 py-0.5 rounded-full text-white text-xs font-semibold ${
                typeColors[type.type.name] || 'bg-gray-400'
              }`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}