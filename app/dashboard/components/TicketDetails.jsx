// app/dashboard/[id]/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StatusSelector from '../components/StatusSelector';
import { getTicketById, updateTicketStatus } from '@/lib/supabase';

export default function TicketDetails({ params }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchTicket() {
      try {
        const data = await getTicketById(params.id);
        console.log('Ticket files:', data.files); // Log pour déboguer
        setTicket(data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [params.id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateTicketStatus(params.id, newStatus);
      setTicket({ ...ticket, status: newStatus });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!ticket) return <p>Ticket non trouvé</p>;

  return (
    <div>
      <h1>Ticket: {ticket.titel}</h1>
      <p><strong>Mieter:</strong> {ticket.mieter}</p>
      <p><strong>Ansprechpartner:</strong> {ticket.ansprechpartner}</p>
      <p><strong>Beschreibung:</strong> {ticket.beschreibung}</p>
      <p><strong>Priorität:</strong> {ticket.dringlichkeit}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <StatusSelector status={ticket.status} onChange={handleStatusChange} />
      <h3>Fichiers:</h3>
      {ticket.files?.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {ticket.files.map((file, index) => (
            <div key={index}>
              <img
                src={file}
                alt={`Image ${index + 1}`}
                style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                onError={() => console.error(`Failed to load image: ${file}`)}
              />
              <p><a href={file} target="_blank" rel="noopener noreferrer">Ouvrir fichier {index + 1}</a></p>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun fichier</p>
      )}
      <button onClick={() => router.push('/dashboard')} style={{ marginTop: '1rem' }}>
        Retour
      </button>
    </div>
  );
}