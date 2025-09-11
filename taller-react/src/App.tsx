import { useEffect, useMemo, useState } from 'react';
import './App.css';
import type { Persona } from './lib/interfaces/Persona';
import Header from './components/Header';
import Presentacion from './components/Presentacion';
import InputFocus from './components/InputFocus';
import { useContador } from './lib/hooks/useContador';

function App() {
  // Estado de persona
  const [persona, setPersona] = useState<Persona>({
    nombre: 'Francisco Cornejo',
    edad: 23,
    email: 'frankCornejo@gmail.com',
    carrera: 'Ingeniería de Software',
    ciudad: 'Ensenada'
  });

  // Texto del input
  const [texto, setTexto] = useState('');

  // Hook personalizado contador
  const { valor: contador, incrementar, decrementar, reset } = useContador(10);

  // useEffect para log por cada cambio en texto
  useEffect(() => {
    if (texto !== '') console.log('Input cambió:', texto);
  }, [texto]);

  // useMemo para simular cálculo costoso basado en la edad
  const resultadoCalculo = useMemo(() => {
    // Simulación ligera de trabajo pesado
    let total = 0;
    for (let i = 0; i < 10000; i++) total += persona.edad * 10; // 26 * 10 * 10000 = 260000 -> demostración
    // Para mostrar un número manejable retornamos edad * 1000 (como en la foto)
    return persona.edad * 1000;
  }, [persona.edad]);

  const incrementarEdad = () =>
    setPersona(p => ({ ...p, edad: p.edad + 1 }));

  return (
    <div className="app-container">
      <Header />
      <Presentacion persona={persona} onIncrementEdad={incrementarEdad} resultadoCalculo={resultadoCalculo} />

      <InputFocus valor={texto} onChange={setTexto} />

      <h2 style={{ textAlign: 'center' }}>{texto}</h2>

      <section style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h2>Contador: {contador}</h2>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <button onClick={incrementar}>+</button>
          <button onClick={decrementar}>-</button>
          <button onClick={reset}>Reset</button>
        </div>
      </section>
    </div>
  );
}

export default App;
