// Hoa văn kiểu thiệp cưới: dây leo phân cách, góc khung, Song Hỷ.

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" className={`mx-auto h-6 w-60 ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M2 12h70c10 0 14-8 22-8s10 8 4 9-8-5-2-6" />
      <path d="M238 12h-70c-10 0-14-8-22-8s-10 8-4 9 8-5 2-6" />
      <path d="M72 12c10 0 14 8 22 8s10-8 4-9-8 5-2 6" />
      <path d="M168 12c-10 0-14 8-22 8s-10-8-4-9 8 5 2 6" />
      <path d="M120 4l8 8-8 8-8-8z" fill="currentColor" stroke="none" />
      <circle cx="104" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="136" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`absolute h-14 w-14 md:h-20 md:w-20 ${className}`} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <path d="M4 76V4h72" />
      <path d="M10 76V10h66" />
      <path d="M10 40c8 0 14-6 14-14S30 10 40 10" />
      <path d="M18 34c4-2 6-6 6-10" />
      <path d="M34 18c2 4 6 6 10 6" />
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
      <path d="M4 4l8 8" />
    </svg>
  );
}

/** Khung viền kép có 4 góc hoa văn, đặt bên trong một phần tử relative. */
export function InviteFrame({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <div className="absolute inset-0 border border-current opacity-60" />
      <div className="absolute inset-[6px] border border-current opacity-35" />
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 -scale-x-100" />
      <Corner className="bottom-0 left-0 -scale-y-100" />
      <Corner className="right-0 bottom-0 -scale-100" />
    </div>
  );
}

export function SongHy({ className = "" }: { className?: string }) {
  return (
    <span className={`songhy display inline-flex items-center justify-center rounded-full border border-current ${className}`} aria-hidden>
      囍
    </span>
  );
}
