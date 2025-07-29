// app/dashboard/components/Filters.jsx
'use client';

export default function Filters({ filters, setFilters }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">Tous les statuts</option>
        <option value="pending">Pending</option>
        <option value="opened">Opened</option>
        <option value="processing">Processing</option>
        <option value="closed">Closed</option>
      </select>
      <select
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
      >
        <option value="">Toutes les priorités</option>
        <option value="Hoch">Hoch</option>
        <option value="Mittel">Mittel</option>
        <option value="Niedrig">Niedrig</option>
      </select>
      <input
        type="text"
        placeholder="Rechercher par titre..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={{ padding: '0.5rem' }}
      />
    </div>
  );
}