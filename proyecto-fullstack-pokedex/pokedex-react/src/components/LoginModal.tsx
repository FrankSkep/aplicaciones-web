import React, { useState } from 'react';
import { authApi } from '../services/authApi';

export default function LoginModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess?: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authApi.login({ username, password });
      setLoading(false);
      onClose();
      onSuccess?.();
      alert('Inicio de sesión exitoso');
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      alert(err?.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 w-80">
        <h3 className="text-lg font-semibold mb-3">Iniciar sesión</h3>
        <form onSubmit={submit} className="flex flex-col gap-2">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" className="border px-3 py-2 rounded" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" type="password" className="border px-3 py-2 rounded" />
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-200">Cancelar</button>
            <button type="submit" disabled={loading} className="px-3 py-1 rounded bg-blue-500 text-white">{loading ? 'Entrando...' : 'Entrar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
