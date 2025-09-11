import { useRef } from 'react';

interface Props {
  valor: string;
  onChange: (v: string) => void;
}

export function InputFocus({ valor, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', margin: '1rem 0' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Escribe algo..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        style={{ padding: '0.25rem 0.5rem' }}
      />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

export default InputFocus;
