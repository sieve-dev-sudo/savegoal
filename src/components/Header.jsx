import { PiggyBank, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <PiggyBank
            className="h-6 w-6 text-indigo-600 dark:text-indigo-400 sm:h-7 sm:w-7"
            aria-hidden="true"
          />
          <h1 className="text-lg font-bold text-slate-900 dark:text-slate-100 sm:text-xl">
            {t.appName}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t.theme.toLight : t.theme.toDark}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
