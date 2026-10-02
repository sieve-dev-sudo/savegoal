import { PiggyBank, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <PiggyBank
            className="h-7 w-7 text-indigo-600 dark:text-indigo-400"
            aria-hidden="true"
          />
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            SaveGoal
          </h1>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'ប្តូរទៅ Light mode' : 'ប្តូរទៅ Dark mode'}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </header>
  );
}

export default Header;
