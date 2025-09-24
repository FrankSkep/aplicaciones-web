# 🧠 Pokédex React - Análisis Técnico

## 🎯 ¿Qué hace la aplicación?
Una Pokédex que muestra 252 Pokémon con búsqueda, paginación y modal de detalles. **React + TypeScript + PokéAPI**.

## � Stack Técnico Clave
- **React 19.1.1** con hooks modernos
- **TypeScript** para tipado fuerte  
- **Tailwind CSS** para estilos
- **Axios** para HTTP requests
- **PokéAPI** como fuente de datos

## 🪝 **ANÁLISIS DE HOOKS**

### 📦 **1. useState - Gestión de Estados**

#### **Estados Simples:**
```tsx
const [loading, setLoading] = useState(true);        // Controla spinner de carga
const [error, setError] = useState<string | null>(null);  // Mensajes de error
const [searchTerm, setSearchTerm] = useState('');    // Input de búsqueda
const [currentPage, setCurrentPage] = useState(1);   // Página actual (paginación)
const [isModalOpen, setIsModalOpen] = useState(false); // Visibilidad del modal
```

#### **Estados Complejos con TypeScript:**
```tsx
const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
const [selectedPokemonId, setSelectedPokemonId] = useState<number | null>(null);
```

**¿Qué hace cada uno?**
- `pokemonList`: **Almacena los 252 Pokémon** descargados de la API
- `loading`: **Controla si muestra el spinner** mientras carga los datos
- `error`: **Guarda mensajes de error** si falla la petición HTTP
- `searchTerm`: **Estado controlado** para el input de búsqueda
- `currentPage`: **Rastrea qué página está viendo** el usuario
- `selectedPokemonId`: **ID del Pokémon seleccionado** para mostrar en el modal
- `isModalOpen`: **Controla si el modal está visible** o no

---

### ⚡ **2. useEffect - Efectos Secundarios**

#### **Efecto de Carga Inicial (Petición HTTP):**
```tsx
useEffect(() => {
  const fetchPokemonList = async () => {
    try {
      setLoading(true);                           // Activa spinner
      const data = await pokemonApi.getPokemonList(); // Petición HTTP
      setPokemonList(data);                       // Guarda datos
    } catch (err) {
      setError('Error al cargar la lista de Pokémon'); // Error
    } finally {
      setLoading(false);                          // Quita spinner
    }
  };
  fetchPokemonList();
}, []); // ← Array vacío = solo se ejecuta AL MONTAR el componente
```

**¿Qué hace exactamente?**
- **Se ejecuta UNA SOLA VEZ** cuando se monta el componente
- **Hace la petición HTTP** a la PokéAPI para traer 252 Pokémon
- **Maneja los 3 estados**: loading (cargando), success (éxito), error (fallo)
- **Finally siempre se ejecuta** para quitar el loading

#### **Efecto Reactivo (Reset de página):**
```tsx
useEffect(() => {
  setCurrentPage(1);  // Vuelve a página 1
}, [searchTerm]);     // ← Se ejecuta cuando CAMBIA searchTerm
```

**¿Por qué es necesario?**
- Si el usuario está en la página 5 y busca "pikachu"
- Solo hay 1 resultado, no existe página 5
- **Automáticamente vuelve a página 1** para evitar páginas vacías

---

### 🚀 **3. useMemo - Optimizaciones Críticas**

#### **Filtrado Optimizado:**
```tsx
const filteredPokemon = useMemo(() => {
  return pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [pokemonList, searchTerm]); // ← Solo recalcula si cambian ESTOS valores
```

**¿Qué optimiza?**
- **Sin useMemo**: El filtro se ejecutaría en CADA render (ej: al cambiar página)
- **Con useMemo**: Solo se ejecuta cuando cambia `pokemonList` o `searchTerm`
- **Búsqueda case-insensitive**: Convierte a minúsculas para comparar
- **Performance**: Con 252 Pokémon, evita 252 comparaciones innecesarias

#### **Paginación Optimizada:**
```tsx
const currentPokemon = useMemo(() => {
  const startIndex = (currentPage - 1) * POKEMON_PER_PAGE; // Ej: página 2 = índice 24
  const endIndex = startIndex + POKEMON_PER_PAGE;          // índice 48
  return filteredPokemon.slice(startIndex, endIndex);      // Solo 24 elementos
}, [filteredPokemon, currentPage]);
```

**¿Qué optimiza?**
- **Sin useMemo**: Calcularía slice() en cada render
- **Con useMemo**: Solo recalcula cuando cambia página o filtro
- **Renderizado**: En lugar de 252 tarjetas, solo renderiza 24
- **Memoria**: Reduce drasticamente los elementos en el DOM

---

## 🧮 **FLUJO DE DATOS**

### **1. Carga Inicial:**
```
Componente se monta → useEffect([]) → HTTP request → setPokemonList()
→ useMemo recalcula filteredPokemon → useMemo recalcula currentPokemon → Render
```

### **2. Usuario Busca:**
```
onChange input → setSearchTerm() → useEffect([searchTerm]) → setCurrentPage(1)
→ useMemo recalcula filteredPokemon → useMemo recalcula currentPokemon → Render
```

### **3. Usuario Cambia Página:**
```
Click botón → setCurrentPage() → useMemo recalcula currentPokemon → Render
```

### **4. Usuario Abre Modal:**
```
Click tarjeta → setSelectedPokemonId() + setIsModalOpen(true) → Render modal
```

---

## 💡 **DECISIONES TÉCNICAS - Justificaciones**

### **¿Por qué useMemo y no useCallback?**
- `useMemo`: **Cachea VALORES** (arrays, objetos, cálculos)
- `useCallback`: **Cachea FUNCIONES** 
- **Aquí necesitamos**: Cachear resultados de filter() y slice()

### **¿Por qué useEffect y no useLayoutEffect?**
- `useLayoutEffect`: Se ejecuta **ANTES** del repaint
- `useEffect`: Se ejecuta **DESPUÉS** del repaint
- **Peticiones HTTP**: No afectan el layout, mejor useEffect

### **¿Por qué varios useState y no useReducer?**
- `useReducer`: Para **lógica de estado compleja**
- `useState`: Para **estados independientes y simples**
- **Aquí**: Cada estado es independiente, useState es más directo

---

## � **PUNTOS CLAVE**

1. **"¿Por qué usaste useMemo?"** 
   - "Para optimizar filtros y paginación, evitando recálculos innecesarios en cada render"

2. **"¿Qué hace el useEffect vacío?"**
   - "Carga inicial de datos, se ejecuta solo una vez al montar el componente"

3. **"¿Por qué TypeScript en los useState?"**
   - "Tipado fuerte previene errores, mejor IntelliSense, código más mantenible"

4. **"¿Cómo manejas errores?"**
   - "Try-catch en peticiones HTTP, estado de error con UI informativa y botón de reintento"

5. **"¿Por qué separaste componentes?"**
   - "Principio de responsabilidad única, reutilización, fácil testing"