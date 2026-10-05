import { useLanguage } from '../context/LanguageContext';

function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t.language.toggleLabel}
      className="flex items-center overflow-hidden rounded-lg border border-slate-300 text-xs font-semibold dark:border-slate-600"
    >
      <span
        className={`px-2.5 py-1.5 transition-colors ${
          language === 'en'
            ? 'bg-indigo-600 text-white'
            : 'bg-transparent text-slate-500 dark:text-slate-400'
        }`}
      >
        EN
      </span>
      <span
        className={`px-2.5 py-1.5 transition-colors ${
          language === 'kh'
            ? 'bg-indigo-600 text-white'
            : 'bg-transparent text-slate-500 dark:text-slate-400'
        }`}
      >
        KH
      </span>
    </button>
  );
}

export default LanguageToggle;
