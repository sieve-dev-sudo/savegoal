import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

function Header({ title, onMenu }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="bg-slate-800">
      <div className="mx-auto grid max-w-3xl grid-cols-[3rem_1fr_3rem] items-center px-3 py-4">
        <button
          type="button"
          onClick={onMenu}
          aria-label={t.drawer.menu}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-amber-400 hover:bg-slate-700"
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="truncate text-center text-xl text-amber-400">
          {title}
        </h1>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? t.theme.toLight : t.theme.toDark}
          className="flex h-10 w-10 items-center justify-center justify-self-end rounded-lg text-amber-400 hover:bg-slate-700"
        >
          {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>
      </div>
    </header>
  );
}

export default Header;
