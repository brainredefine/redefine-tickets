// app/login/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/dashboard');
    } else {
      alert('Mot de passe incorrect');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', textAlign: 'center' }}>
      <h2>Connexion au Dashboard</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Entrez le mot de passe"
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%' }}
      />
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem' }}>
        Connexion
      </button>
    </div>
  );
}