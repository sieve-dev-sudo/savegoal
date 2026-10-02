import { ArrowUpDown } from 'lucide-react';
import { SORT_OPTIONS } from '../utils/sortGoals';

function SortDropdown({ value, onChange }) {
  return (
    <div className="relative">
      <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort goals"
        className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-8 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortDropdown;
