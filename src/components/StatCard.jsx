function StatCard({ icon: Icon, label, value, colorClass }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${colorClass}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
