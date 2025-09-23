import { useState, useEffect, useMemo } from 'react';
import PokemonCard from './components/PokemonCard';
import PokemonModal from './components/PokemonModal';
import type { PokemonListItem } from './types/pokemon';
import { pokemonApi } from './services/pokemonApi';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const POKEMON_PER_PAGE = 24; // 8 columnas x 3 filas

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        setLoading(true);
        const data = await pokemonApi.getPokemonList();
        setPokemonList(data);
      } catch (err) {
        setError('Error al cargar la lista de Pokémon');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonList();
  }, []);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemonList, searchTerm]);

  const totalPages = Math.ceil(filteredPokemon.length / POKEMON_PER_PAGE);

  const currentPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
    const endIndex = startIndex + POKEMON_PER_PAGE;
    return filteredPokemon.slice(startIndex, endIndex);
  }, [filteredPokemon, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handlePokemonClick = (id: number) => {
    setSelectedPokemonId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemonId(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-400 mx-auto mb-4"></div>
          <p className="text-orange-600 text-xl font-semibold">Cargando Pokédex...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-50 flex items-center justify-center">
        <div className="text-center text-orange-600">
          <p className="text-xl font-semibold">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-yellow-100 to-amber-50">
      <div className="container mx-auto px-12 py-4">
        {/* Header */}
        <div className="text-center mb-2">
            <div className="flex justify-center mb-2">
            <img 
              src="/pokemon-logo.png" 
              alt="Pokémon Logo" 
              className="h-18 md:h-20 lg:h-24 drop-shadow-lg"
            />
            </div>
        </div>

        {/* Search Bar and Results Info Row */}
        <div className="relative mb-4">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full border border-orange-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-orange-600 focus:ring-opacity-50 focus:border-orange-400 text-gray-700"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          
          {/* Results Info - Top Right */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <p className="text-orange-600 font-medium text-sm whitespace-nowrap">
              {filteredPokemon.length > 0 ? (
                <>
                  Mostrando {((currentPage - 1) * POKEMON_PER_PAGE) + 1}-{Math.min(currentPage * POKEMON_PER_PAGE, filteredPokemon.length)} de {filteredPokemon.length} Pokémon
                  {searchTerm && ` (filtrado de ${pokemonList.length})`}
                </>
              ) : (
                `0 de ${pokemonList.length} Pokémon`
              )}
            </p>
          </div>
        </div>

        {/* Pokemon Grid */}
        {currentPokemon.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-8">
            {currentPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                onClick={() => handlePokemonClick(pokemon.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-orange-600 text-xl font-medium">
              No se encontraron Pokémon con "{searchTerm}"
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors shadow-lg cursor-pointer"
            >
              Anterior
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer shadow-lg ${
                    currentPage === pageNum
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-200 text-orange-700 hover:bg-orange-300'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-orange-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors shadow-lg cursor-pointer"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>

      {/* Pokemon Modal */}
      <PokemonModal
        pokemonId={selectedPokemonId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
