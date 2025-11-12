import React, { useState } from 'react';
import { authApi } from '../services/authApi';

export default function RegisterModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess?: () => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
  await authApi.register({ username, email, password });
      setLoading(false);
      onClose();
      onSuccess?.();
      alert('Registro exitoso. Ahora inicia sesión.');
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      alert(err?.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-80">
        <h3 className="text-lg font-semibold mb-3">Registrarse</h3>
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" className="border px-3 py-2 rounded" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" type="email" className="border px-3 py-2 rounded" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" className="border px-3 py-2 rounded" />
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-200">Cancelar</button>
            <button type="submit" disabled={loading} className="px-3 py-1 rounded bg-green-500 text-white">{loading ? 'Registrando...' : 'Crear'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
