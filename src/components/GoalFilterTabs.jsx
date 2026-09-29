const FILTERS = [
  { id: 'all', label: 'ទាំងអស់' },
  { id: 'in-progress', label: 'កំពុងដំណើរការ' },
  { id: 'completed', label: 'សម្រេចហើយ' },
];

function GoalFilterTabs({ activeFilter, onChange, counts }) {
  return (
    <div
      role="tablist"
      aria-label="Filter goals"
      className="flex gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-700"
    >
      {FILTERS.map((filter) => {
        const active = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(filter.id)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
              active
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            {filter.label}
            {typeof counts?.[filter.id] === 'number' && (
              <span className="ml-1.5 text-xs text-slate-400">
                ({counts[filter.id]})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default GoalFilterTabs;
