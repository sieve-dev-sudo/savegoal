import { LayoutDashboard, Target } from 'lucide-react';

const TABS = [
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

function Nav({ currentPage, onNavigate }) {
  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="mx-auto flex max-w-4xl gap-1 px-4">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              aria-current={active ? 'page' : undefined}
              className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                active
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Nav;
