import './App.css'
import { useSearchPokemons } from './features/grid/components/hooks/useSearchPokemons';

function App() {

  const { query, nextPage, prevPage, goTo, limitedPageSize, sortPokemons, searchPokemons } = useSearchPokemons();

  console.log(query.data);

  let pageNumber;

  return (
    <>
      <h2>Pokedex</h2>
      <button onClick={prevPage}>Prev</button>
      <button onClick={nextPage}>Next</button>

      <input
        type="text"
        value={pageNumber}
        onChange={(e) => pageNumber = Number(e.target.value)}
        placeholder="Page number"
      />

      <button onClick={() => goTo(Number(pageNumber))}>Go to page {pageNumber}</button>

      <button onClick={() => limitedPageSize(10)}>Set page size to 10</button>
      <button onClick={() => limitedPageSize(50)}>Set page size to 50</button>

      <button onClick={() => sortPokemons('asc')}>Sort Ascending</button>
      <button onClick={() => sortPokemons('desc')}>Sort Descending</button>

      <br />

      <input
        type="text"
        onChange={(e) => searchPokemons(e.target.value)}
        placeholder="Search pokemons"
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', marginTop: '20px' }}>
        {query.data?.data.map((pokemon) => (
          <div key={pokemon.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <img src={pokemon.image} alt={pokemon.name} style={{ width: '150px' }} />
            <h3>{pokemon.name}</h3>
            <p>Types: {pokemon.types.join(', ')}</p>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
          </div>
        ))}
      </div>  



    </>
  )
}

export default App
