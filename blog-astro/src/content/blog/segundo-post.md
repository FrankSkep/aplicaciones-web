---
title: "Introducción a React en Astro"
description: "Cómo integrar React con Astro para componentes interactivos"
author: "FrankSkep"
date: "2025-11-26T00:00:00.000Z"
tags: ["astro", "react", "javascript", "componentes"]
image: "/public/post-02.png"
---

¡Hola de nuevo! En este post, vamos a explorar cómo integrar React con Astro para crear componentes interactivos en nuestros sitios web.

React es una biblioteca popular para construir interfaces de usuario, y Astro permite usarla de manera eficiente sin comprometer el rendimiento.

### ¿Por qué usar React en Astro?

- **Interactividad:** React es ideal para componentes que necesitan estado y eventos.
- **Reutilización:** Puedes reutilizar componentes React existentes en proyectos Astro.
- **Optimización:** Astro solo carga JavaScript cuando es necesario, manteniendo la velocidad.

### Cómo crear un componente React en Astro

Primero, instala React si no lo tienes:

```bash
npm install react react-dom
```

Luego, crea un archivo `.jsx` o `.tsx` en la carpeta de componentes:

```jsx
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
```

### Integración en páginas Astro

En tu archivo `.astro`, importa y usa el componente:

```astro
---
import Counter from '../components/Counter.jsx';
---

<Counter client:load />
```

El atributo `client:load` indica que el componente debe ejecutarse en el cliente.

### Conclusión

Combinar Astro con React te da lo mejor de ambos mundos: la velocidad de Astro y la interactividad de React. ¡Experimenta y crea aplicaciones web increíbles!