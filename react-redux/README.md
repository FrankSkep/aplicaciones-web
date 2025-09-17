# React Redux Counter App

Este proyecto es una aplicación React que demuestra el uso de **Redux Toolkit** para el manejo del estado global.

## Funcionalidad Principal

La aplicación es un **contador con múltiples operaciones** que utiliza Redux para gestionar el estado. Las principales características son:

### Funcionalidades del Contador
- **Incrementar**: Suma 1 al valor actual
- **Decrementar**: Resta 1 al valor actual
- **Reset**: Reinicia el contador a 0
- **Incrementar por cantidad**: Permite sumar una cantidad específica
- **Incremento asíncrono**: Incrementa el valor después de un delay de 500ms

### Estructura del Estado
El estado del contador incluye:
- `value`: El valor numérico actual
- `status`: El estado de las operaciones (`'idle'`, `'loading'`, `'failed'`)

## Arquitectura Técnica

### Stack Tecnológico
- **React 19** + **TypeScript**
- **Redux Toolkit** para manejo de estado
- **React-Redux** para conectar React con Redux
- **Vite** como bundler
- **ESLint** para linting

### Estructura de Archivos Clave
- `src/store/store.ts`: Configuración del store de Redux
- `src/features/counter/counterSlice.ts`: Slice del contador con reducers y acciones
- `src/store/hooks/hooks.ts`: Hooks tipados para Redux
- `src/App.tsx`: Componente principal con la interfaz del contador
- `src/main.tsx`: Punto de entrada con el Provider de Redux

### Patrones de Redux Implementados
- **Slices**: Uso de `createSlice` para definir reducers y acciones
- **Async Thunks**: `incrementAsync` para operaciones asíncronas
- **Typed Hooks**: Hooks personalizados `useAppSelector` y `useAppDispatch`
- **Estado inmutable**: Uso de Immer a través de Redux Toolkit

## Propósito Educativo

Este proyecto sirve como **ejemplo de aprendizaje** para:
- Implementar Redux Toolkit en aplicaciones React modernas
- Manejar estado global de forma eficiente
- Trabajar con operaciones síncronas y asíncronas en Redux
- Aplicar TypeScript con Redux para type safety

## Instalación y Ejecución

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Construir para producción
pnpm build

# Vista previa de la build
pnpm preview
```

## Estructura del Proyecto

```
src/
├── App.tsx                    # Componente principal
├── main.tsx                   # Punto de entrada
├── features/
│   └── counter/
│       └── counterSlice.ts    # Slice de Redux para el contador
└── store/
    ├── store.ts               # Configuración del store
    └── hooks/
        └── hooks.ts           # Hooks tipados de Redux
```

Es un proyecto básico pero completo que demuestra las mejores prácticas actuales para el manejo de estado en React con Redux Toolkit.

