import { useState, useEffect } from 'react';
import type { Pokemon } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';
import { favoritosApi } from '../services/favoritosApi';

interface PokemonCardProps {
  id: number;
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

export default function PokemonCard({ id, onClick }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

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

  // Nota: para simplificar usamos un estado local optimista cuando el usuario agrega favorito.
  // Mejoraría consultando /favoritos al iniciar sesión.

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // evitar abrir modal cuando clickean el corazón
    try {
      await favoritosApi.addFavorito(id);
      setIsFavorite(true);
      // podríamos mostrar un pequeño toast aquí
    } catch (err: any) {
      console.error('Error al agregar favorito', err);
      alert(err?.response?.data?.message || err?.message || 'Error al agregar favorito. Inicia sesión primero.');
    }
  };

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
      {/* Corazón en la esquina superior derecha */}
      <button
        onClick={handleHeartClick}
        aria-label="Agregar a favoritos"
        className="absolute mt-1 mr-1 right-2 top-2 z-10 bg-white/80 rounded-full p-1 hover:bg-red-100"
        style={{outline: 'none'}}
      >
        {isFavorite ? (
          // corazón relleno
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.828a4 4 0 010-5.657z" />
          </svg>
        ) : (
          // corazón outline
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 115.656 5.656L12 21.343l-8.828-8.828a4 4 0 010-5.657z" />
          </svg>
        )}
      </button>
      <div className="text-center">
        <img
          src={pokemon.image || '/placeholder.png'}
          alt={pokemon.name}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 mx-auto mb-1 sm:mb-2 object-contain"
          loading="lazy"
        />
        <h3 className="font-bold text-xs sm:text-sm capitalize mb-1 sm:mb-2 leading-tight">
          #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
        </h3>

        <div className="flex flex-wrap justify-center gap-1">
          {(pokemon.types || []).map((t) => (
            <span
              key={t}
              className={`px-1 sm:px-1.5 py-0.5 rounded-full text-white text-xs font-semibold ${
                typeColors[t] || 'bg-gray-400'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}