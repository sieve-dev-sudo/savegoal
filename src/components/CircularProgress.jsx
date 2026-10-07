function CircularProgress({ progress, completed, size = 220 }) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-700"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={
            completed
              ? 'text-green-500'
              : progress >= 75
                ? 'text-indigo-500'
                : progress >= 40
                  ? 'text-indigo-400'
                  : 'text-pink-400'
          }
          style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-bold text-white dark:bg-indigo-600">
          {progress}%
        </span>
      </div>
    </div>
  );
}

export default CircularProgress;
