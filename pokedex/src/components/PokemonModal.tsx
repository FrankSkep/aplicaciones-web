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
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Detalles del Pokémon</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4">Cargando detalles...</p>
            </div>
          ) : pokemon ? (
            <div className="space-y-6">
              <div className="text-center">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-48 h-48 mx-auto mb-4"
                />
                <h3 className="text-3xl font-bold capitalize mb-2">
                  #{pokemon.id.toString().padStart(3, '0')} {pokemon.name}
                </h3>
                <div className="flex justify-center gap-2 mb-4">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`px-3 py-1 rounded-full text-white font-semibold ${
                        typeColors[type.type.name] || 'bg-gray-400'
                      }`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Información Básica</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Altura:</span> {pokemon.height / 10} m</p>
                    <p><span className="font-medium">Peso:</span> {pokemon.weight / 10} kg</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3">Habilidades</h4>
                  <div className="space-y-1">
                    {pokemon.abilities.map((ability, index) => (
                      <p key={index} className="capitalize">
                        {ability.ability.name.replace('-', ' ')}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">Estadísticas Base</h4>
                <div className="space-y-3">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="capitalize font-medium">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span className="font-semibold">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-red-500">
              Error al cargar los detalles del Pokémon
            </div>
          )}
        </div>
      </div>
    </div>
  );
}