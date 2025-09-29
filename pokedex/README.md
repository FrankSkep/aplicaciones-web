## Componentes

- `App`: Componente principal que gestiona el estado global, carga la lista de Pokémon y coordina la búsqueda y paginación.
- `SearchBar`: Barra de búsqueda para filtrar Pokémon por nombre.
- `PokemonGrid`: Grid responsivo que muestra las tarjetas de Pokémon.
- `PokemonCard`: Tarjeta individual de Pokémon con imagen, nombre, ID y tipos.
- `Pagination`: Componente de paginación con navegación entre páginas.
- `PokemonModal`: Modal que muestra detalles completos de un Pokémon seleccionado.
- `LoadingSpinner`: Spinner de carga con mensaje personalizado.

## Hooks utilizados y propósito

### useState
- App
  - pokemonList: almacena la lista base completa para filtrar y paginar sin volver a pedirla.
  - loading: controla render condicional (spinner vs contenido) durante la carga inicial.
  - error: guarda mensaje de fallo para mostrar UI de reintento.
  - searchTerm: estado controlado del input; dispara nuevo filtrado.
  - currentPage: define el rango de elementos mostrados; se restablece al cambiar la búsqueda.
  - selectedPokemonId: identifica qué Pokémon mostrar en el modal.
  - isModalOpen: evita renderizar/modalizar detalles cuando está cerrado (optimiza).
- PokemonCard
  - pokemon: datos individuales mínimos para cada tarjeta.
  - loading: muestra esqueleto/spinner local sin bloquear toda la grilla.
  - error: permite degradar solo esa tarjeta si falla.
- PokemonModal
  - pokemon: detalles ampliados del Pokémon seleccionado.
  - loading: spinner interno mientras llegan los datos del modal.
  
Separación de estados finos mejora la granularidad de re-render y la claridad.

### useEffect
- App (montaje): realiza la petición inicial (pokemonApi.getPokemonList); maneja ciclo loading/error; dependencia vacía => solo una vez.
- App (reinicio de página): cuando cambia searchTerm se fuerza currentPage = 1 para evitar páginas vacías; dependencia [searchTerm].
- PokemonCard: obtiene datos del Pokémon al montar o cambiar el id prop; aísla latencias por tarjeta.
- PokemonModal: carga o recarga detalles cuando cambia pokemonId y el modal está abierto; evita peticiones innecesarias si está cerrado.

Principio: efectos solo para I/O o sincronizar con el exterior (fetch, scroll reset).

### useMemo
- filteredPokemon: evita recalcular el filtrado completo si no cambian (pokemonList, searchTerm); reduce costo en listas grandes.
- currentPokemon: calcula el slice paginado (start/end) solo cuando cambian filteredPokemon o currentPage; mantiene renders baratos.

Se usa para micro-optimización de cálculos derivados puros.