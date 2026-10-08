import { PiggyBank, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="border-t-4 border-amber-500 bg-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3.5 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <PiggyBank className="h-7 w-7 text-amber-400 sm:h-8 sm:w-8" />
          <h1 className="text-xl font-bold text-amber-400 sm:text-2xl">
            {t.appName}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <LanguageToggle />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t.theme.toLight : t.theme.toDark}
            className="rounded-lg p-2 text-amber-400 hover:bg-slate-700"
          >
            {isDark ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
