import { useState } from 'react';
import SearchBar from './components/SearchBar';
import PokemonGrid from './components/PokemonGrid';
import Pagination from './components/Pagination';
import PokemonModal from './components/PokemonModal';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';
import { useSearchPokemons } from './hooks/useSearchPokemons';

function App() {
  const {
    query,
    page,
    pageSize,
    search,
    setSearch,
    setPage,
    nextPage,
    prevPage,
  } = useSearchPokemons({ page: 1, pageSize: 24, search: '' });

  const POKEMON_PER_PAGE = pageSize || 24;

  const loading = query.isLoading;
  const error = query.isError ? 'Error al cargar la lista de Pok\u00e9mon' : null;

  const currentRaw = query.data?.data || [];
  const totalPages = query.data?.totalPages || 1;
  const totalItems = query.data?.total || 0;

  const currentPokemons = currentRaw.map((d: any) => ({ id: d.id, name: d.name, url: d.url }));

  const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePokemonClick = (id: number) => {
    setSelectedPokemonId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemonId(null);
  };

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner message="Cargando Pok\u00e9dex..." />;
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
              <SearchBar searchTerm={search} onSearchChange={setSearch} />
            </div>
          
          <div className="text-center sm:text-right">
            <p className="text-orange-600 font-medium text-xs sm:text-sm">
              {totalItems > 0 ? (
                <>
                  <span className="block sm:inline">
                    Mostrando {(page - 1) * POKEMON_PER_PAGE + 1}-{Math.min(page * POKEMON_PER_PAGE, totalItems)} de {totalItems}
                  </span>
                  <span className="block sm:inline"> Pokémon</span>
                  {search && (
                    <span className="block sm:inline text-xs"> (filtrado)</span>
                  )}
                </>
              ) : (
                `0 de ${totalItems} Pokémon`
              )}
            </p>
          </div>
        </div>

  <PokemonGrid pokemon={currentPokemons} onPokemonClick={handlePokemonClick} searchTerm={search} />

        <Pagination 
          currentPage={page}
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
