function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 py-10 text-center dark:border-slate-600">
      {Icon && (
        <div className="rounded-full bg-slate-100 p-3 dark:bg-slate-700">
          <Icon className="h-6 w-6 text-slate-400 dark:text-slate-500" />
        </div>
      )}
      <h3 className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
        {title}
      </h3>
      {description && (
        <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export default EmptyState;
