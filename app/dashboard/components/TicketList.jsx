// app/dashboard/components/TicketList.jsx
'use client';

import Link from 'next/link';

export default function TicketList({ tickets }) {
  if (!tickets || !Array.isArray(tickets)) {
    return <p>No tickets available</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
      <thead>
        <tr style={{ background: '#f5f5f5' }}>
          <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>ID</th>
          <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Titel</th>
          <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Priorität</th>
          <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Status</th>
          <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
              {ticket.id.toString().slice(0, 8)}
            </td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{ticket.titel}</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{ticket.dringlichkeit}</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{ticket.status}</td>
            <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
              <Link href={`/dashboard/${ticket.id}`}>Voir</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}