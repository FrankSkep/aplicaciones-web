import { useEffect, useState } from 'react';
import type { Pokemon } from '../types/pokemon';
import { pokemonApi } from '../services/pokemonApi';

interface PokemonModalProps {
  pokemonId: number | null;
  isOpen: boolean;
  onClose: () => void;
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

export default function PokemonModal({ pokemonId, isOpen, onClose }: PokemonModalProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (pokemonId && isOpen) {
      const fetchPokemon = async () => {
        setLoading(true);
        try {
          const data = await pokemonApi.getPokemon(pokemonId);
          setPokemon(data);
        } catch (error) {
          console.error('Error fetching pokemon details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPokemon();
    }
  }, [pokemonId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold">Detalles del Pokémon</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl p-1"
            >
              ×
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-sm sm:text-base">Cargando detalles...</p>
            </div>
          ) : pokemon ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <img
                  src={pokemon.image || '/placeholder.png'}
                  alt={pokemon.name}
                  className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 object-contain"
                />
                <h3 className="text-xl sm:text-2xl font-bold capitalize mb-2">
                  #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
                </h3>
                <div className="flex justify-center gap-2 mb-4 flex-wrap">
                  {(pokemon.types || []).map((t) => (
                    <span
                      key={t}
                      className={`px-2 sm:px-3 py-1 rounded-full text-white font-semibold text-sm ${
                        typeColors[t] || 'bg-gray-400'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Información Básica</h4>
                  <div className="space-y-2">
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Altura:</span> {pokemon.height ? `${pokemon.height / 10} m` : '-'}
                    </p>
                    <p className="text-sm sm:text-base">
                      <span className="font-medium">Peso:</span> {pokemon.weight ? `${pokemon.weight / 10} kg` : '-'}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-3">Habilidades</h4>
                    <div className="space-y-1">
                      {(pokemon.abilities || []).map((a, index) => (
                        <p key={index} className="capitalize text-sm sm:text-base">
                          {a.replace('-', ' ')}
                        </p>
                      ))}
                    </div>
                </div>
              </div>

              {/* Backend doesn't return stats in this entity — remove stats UI. */}
            </div>
          ) : (
            <div className="text-center py-8 text-red-500 text-sm sm:text-base">
              Error al cargar los detalles del Pokémon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}