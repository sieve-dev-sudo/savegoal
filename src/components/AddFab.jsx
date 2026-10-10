function AddFab({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <line x1="12" y1="3" x2="12" y2="10.5" stroke="#ea4335" />
        <line x1="12" y1="13.5" x2="12" y2="21" stroke="#34a853" />
        <line x1="3" y1="12" x2="10.5" y2="12" stroke="#fbbc05" />
        <line x1="13.5" y1="12" x2="21" y2="12" stroke="#4285f4" />
      </svg>
    </button>
  );
}

export default AddFab;
