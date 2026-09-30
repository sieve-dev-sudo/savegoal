function ProgressBar({ progress, completed }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
      <div
        className={`h-full rounded-full transition-[width] duration-500 ease-out ${
          completed
            ? 'bg-green-500'
            : progress >= 75
              ? 'bg-indigo-500'
              : progress >= 40
                ? 'bg-indigo-400'
                : 'bg-indigo-300'
        }`}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

export default ProgressBar;
