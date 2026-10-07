import { ChevronDown } from 'lucide-react';

const OPTIONS = [
  { id: 'default', label: 'Sort by default' },
  { id: 'date', label: 'Sort by date' },
  { id: 'amount', label: 'Sort by amount' },
];

function RecordSortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort records"
        className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}

export default RecordSortDropdown;
