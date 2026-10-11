function SectionCard({ title, hint, tone = 'default', children }) {
  const toneClass =
    tone === 'danger'
      ? 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-900/20'
      : 'border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800';

  return (
    <section
      className={`rounded-2xl border p-4 shadow-sm sm:p-5 ${toneClass}`}
    >
      <h3 className="text-base font-medium text-slate-800 dark:text-slate-100">
        {title}
      </h3>
      {hint && (
        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default SectionCard;
