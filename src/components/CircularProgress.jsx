function CircularProgress({ progress, size = 220 }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* រង្វង់ illustration ខាងក្នុង */}
      <div className="absolute inset-[10px] overflow-hidden rounded-full bg-sky-300">
        <div className="absolute left-1/2 top-[22%] h-7 w-7 -translate-x-1/2 rounded-full bg-amber-400" />
        <div className="absolute bottom-0 left-[8%] h-[55%] w-[45%] bg-emerald-800 [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
        <div className="absolute bottom-0 right-[8%] h-[70%] w-[55%] bg-lime-600 [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
      </div>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
        />
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="45%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease-out' }}
        />
      </svg>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
        <span className="rounded bg-lime-600 px-3 py-1 text-sm font-bold text-white shadow">
          {progress} %
        </span>
      </div>
    </div>
  );
}

export default CircularProgress;
