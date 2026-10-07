import { PiggyBank, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="border-t-4 border-amber-500 bg-slate-800">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 py-3 sm:px-4">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <PiggyBank className="h-6 w-6 text-amber-400 sm:h-7 sm:w-7" />
          <h1 className="text-lg font-bold text-amber-400 sm:text-xl">
            {t.appName}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t.theme.toLight : t.theme.toDark}
            className="rounded-lg p-2 text-amber-400 hover:bg-slate-700"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
