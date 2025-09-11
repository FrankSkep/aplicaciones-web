import { useCallback, useState } from 'react';

/**
 * Hook personalizado de contador.
 * @param inicial valor inicial (default 0)
 * @param paso incremento/decremento (default 1)
 */
export function useContador(inicial: number = 0, paso: number = 1) {
  const [valor, setValor] = useState(inicial);

  const incrementar = useCallback(() => setValor(v => v + paso), [paso]);
  const decrementar = useCallback(() => setValor(v => v - paso), [paso]);
  const reset = useCallback(() => setValor(inicial), [inicial]);

  return { valor, incrementar, decrementar, reset } as const;
}
