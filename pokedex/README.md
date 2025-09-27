## Hooks Utilizados

- [`useState`](https://react.dev/reference/react/useState): Para manejar estado local en componentes.
- [`useEffect`](https://react.dev/reference/react/useEffect): Para efectos secundarios como cargar datos de la API.
- [`useMemo`](https://react.dev/reference/react/useMemo): Para optimizar cálculos de filtrado y paginación.

## Componentes

- `App`: Componente principal que gestiona el estado global, carga la lista de Pokémon y coordina la búsqueda y paginación.
- `SearchBar`: Barra de búsqueda para filtrar Pokémon por nombre.
- `PokemonGrid`: Grid responsivo que muestra las tarjetas de Pokémon.
- `PokemonCard`: Tarjeta individual de Pokémon con imagen, nombre, ID y tipos.
- `Pagination`: Componente de paginación con navegación entre páginas.
- `PokemonModal`: Modal que muestra detalles completos de un Pokémon seleccionado.
- `LoadingSpinner`: Spinner de carga con mensaje personalizado.