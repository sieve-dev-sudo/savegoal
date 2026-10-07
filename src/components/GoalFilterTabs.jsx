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
      className="flex gap-1 overflow-x-auto rounded-lg bg-white p-1 shadow-sm dark:bg-slate-800"
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
            className={`flex-1 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
              active
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            {filter.label}
            {typeof counts?.[filter.id] === 'number' && (
              <span
                className={`ml-1 text-xs ${active ? 'text-indigo-200' : 'text-slate-400'}`}
              >
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
