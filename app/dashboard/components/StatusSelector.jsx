// app/dashboard/components/StatusSelector.jsx
'use client';

export default function StatusSelector({ status, onChange }) {
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: '0.5rem' }}
    >
      <option value="pending">Pending</option>
      <option value="opened">Opened</option>
      <option value="processing">Processing</option>
      <option value="closed">Closed</option>
    </select>
  );
}