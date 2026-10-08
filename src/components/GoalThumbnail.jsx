function GoalThumbnail({ size = 76 }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-sky-300"
      style={{ width: size, height: size }}
    >
      <div className="absolute left-1/2 top-[20%] h-3 w-3 -translate-x-1/2 rounded-full bg-amber-400" />
      <div className="absolute bottom-0 left-[8%] h-[55%] w-[45%] bg-emerald-800 [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
      <div className="absolute bottom-0 right-[8%] h-[70%] w-[55%] bg-lime-600 [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
    </div>
  );
}

export default GoalThumbnail;
