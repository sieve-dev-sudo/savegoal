const SEGMENT_COLORS = ['#dc2626', '#ec4899', '#84cc16'];
// ប្រវែង arc សរុប = 75% នៃរង្វង់ (ទុកចន្លោះ 25% នៅខាងក្រោម)
const SWEEP = 0.75;

function CircularProgress({ progress, size = 210 }) {
  const safeProgress = Math.min(100, Math.max(0, progress));
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const trackLength = circumference * SWEEP;
  const progressLength = trackLength * (safeProgress / 100);
  const segmentLength = progressLength / SEGMENT_COLORS.length;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* រូប illustration ខាងក្នុង */}
      <div className="absolute inset-[16px] overflow-hidden rounded-full bg-[#6fcbe6]">
        <div className="absolute left-[24%] top-[18%] h-[15%] w-[15%] rounded-full bg-[#e5a82e]" />
        <div className="absolute bottom-0 left-[6%] h-[48%] w-[48%] bg-[#56744d] [clip-path:polygon(40%_0%,0%_100%,100%_100%)]" />
        <div className="absolute bottom-0 right-[2%] h-[62%] w-[70%] bg-[#84a540] [clip-path:polygon(45%_0%,0%_100%,100%_100%)]" />
      </div>

      {/* Ring: ចាប់ផ្តើមពីជ្រុងខាងក្រោមឆ្វេង វិលតាមទ្រនិចនាឡិកា */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
        style={{ transform: 'rotate(135deg)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${trackLength} ${circumference}`}
          className="text-slate-200 dark:text-slate-700"
        />

        {progressLength > 0 &&
          SEGMENT_COLORS.map((color, index) => (
            <circle
              key={color}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeLinecap={
                index === 0 || index === SEGMENT_COLORS.length - 1
                  ? 'round'
                  : 'butt'
              }
              strokeDasharray={`${segmentLength} ${circumference}`}
              strokeDashoffset={-segmentLength * index}
              style={{ transition: 'stroke-dasharray 0.6s ease-out' }}
            />
          ))}
      </svg>

      {/* Badge ភាគរយ នៅចន្លោះខាងក្រោម */}
      <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2">
        <span className="rounded bg-[#9aab1a] px-2.5 py-0.5 text-sm font-semibold text-white shadow">
          {safeProgress} %
        </span>
      </div>
    </div>
  );
}

export default CircularProgress;
