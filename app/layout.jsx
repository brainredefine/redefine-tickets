// app/layout.jsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated && window.location.pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, [router]);

  return (
    <html lang="de">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </main>
      </body>
    </html>
  );
}