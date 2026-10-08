import { LayoutDashboard, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function Nav({ currentPage, onNavigate }) {
  const { t } = useLanguage();

  const TABS = [
    { id: 'goals', label: t.nav.goals, icon: Target },
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-slate-700 bg-slate-800"
    >
      <div className="mx-auto flex max-w-6xl gap-1 px-2 sm:px-6">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-1 items-center justify-center gap-2 border-b-2 px-3 py-3 text-base font-medium sm:flex-initial sm:px-5 ${
                active
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Nav;
