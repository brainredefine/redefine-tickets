// app/dashboard/page.jsx
'use client';

import { useState, useEffect } from 'react';
import TicketList from './components/TicketList';
import Filters from './components/Filters';
import { getTickets } from '@/lib/supabase';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTickets() {
      try {
        console.log('Fetching tickets with filters:', filters);
        const data = await getTickets(filters);
        console.log('Tickets received:', data);
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTickets();
  }, [filters]);

  if (error) return <div>Error: {error}</div>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard - Mangelmanagement</h1>
      <Filters filters={filters} setFilters={setFilters} />
      <TicketList tickets={tickets} />
    </div>
  );
}