import { useState, useEffect, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import PokemonGrid from './components/PokemonGrid';
import Pagination from './components/Pagination';
import PokemonModal from './components/PokemonModal';
import LoadingSpinner from './components/LoadingSpinner';
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

  const POKEMON_PER_PAGE = 24;

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
    return <LoadingSpinner message="Cargando Pokédex..." />;
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
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4">
        <div className="text-center mb-4 sm:mb-6">
          <div className="flex justify-center mb-2 sm:mb-4">
            <img 
              src="/pokemon-logo.png" 
              alt="Pokémon Logo" 
              className="h-12 sm:h-16 md:h-18 lg:h-20 xl:h-24 drop-shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-orange-600 font-medium text-xs sm:text-sm">
              {filteredPokemon.length > 0 ? (
                <>
                  <span className="block sm:inline">
                    Mostrando {((currentPage - 1) * POKEMON_PER_PAGE) + 1}-{Math.min(currentPage * POKEMON_PER_PAGE, filteredPokemon.length)} de {filteredPokemon.length}
                  </span>
                  <span className="block sm:inline"> Pokémon</span>
                  {searchTerm && (
                    <span className="block sm:inline text-xs"> (filtrado de {pokemonList.length})</span>
                  )}
                </>
              ) : (
                `0 de ${pokemonList.length} Pokémon`
              )}
            </p>
          </div>
        </div>

        <PokemonGrid pokemon={currentPokemon} onPokemonClick={handlePokemonClick} searchTerm={searchTerm} />

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      
      <PokemonModal
        pokemonId={selectedPokemonId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
