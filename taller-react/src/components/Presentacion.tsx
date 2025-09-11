import type { Persona } from '../lib/interfaces/Persona';

interface Props {
  persona: Persona;
  onIncrementEdad: () => void;
  resultadoCalculo: number;
}

export function Presentacion({ persona, onIncrementEdad, resultadoCalculo }: Props) {
  const { edad, email, carrera, ciudad } = persona;
  return (
    <section style={{ textAlign: 'center' }}>
      <h2 style={{ margin: '0.75rem 0 0.25rem' }}>Edad: {edad}</h2>
      <p style={{ margin: '0.25rem 0' }}>Email: {email}</p>
      <p style={{ margin: '0.25rem 0' }}>Carrera: {carrera}</p>
      <p style={{ margin: '0.25rem 0 1rem' }}>Ciudad: {ciudad}</p>
      <p style={{ margin: '0.5rem 0' }}>Resultado del cálculo: {resultadoCalculo}</p>
      <button onClick={onIncrementEdad}>Incrementar Edad</button>
    </section>
  );
}

export default Presentacion;
