import { useLanguage } from '../context/LanguageContext';

function GoalFilterTabs({ activeFilter, onChange, counts }) {
  const { t } = useLanguage();

  const FILTERS = [
    { id: 'all', label: t.filters.all },
    { id: 'in-progress', label: t.filters.inProgress },
    { id: 'completed', label: t.filters.completed },
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter goals"
      className="flex gap-1 overflow-x-auto rounded-lg bg-slate-100 p-1 dark:bg-slate-700"
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
            className={`flex-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:px-3 sm:text-sm ${
              active
                ? 'bg-white text-indigo-600 shadow-sm dark:bg-slate-800 dark:text-indigo-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            {filter.label}
            {typeof counts?.[filter.id] === 'number' && (
              <span className="ml-1 text-xs text-slate-400">
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
