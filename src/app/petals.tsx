// Cánh hoa rơi nhẹ — chỉ dùng CSS, không tốn JS
const petals = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 10 + ((i * 7) % 12),
  dur: 9 + ((i * 5) % 8),
  delay: -((i * 13) % 17),
  hue: i % 3,
}));

const fills = ["#f3d6d9", "#fffaf2", "#e8c7a0"];

export default function Petals({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal absolute -top-8"
          style={{ left: `${p.left}%`, width: p.size, height: p.size, animationDuration: `${p.dur}s, ${p.dur / 3}s`, animationDelay: `${p.delay}s, ${p.delay}s` }}
        >
          <svg viewBox="0 0 20 20" className="h-full w-full">
            <path d="M10 1C14 5 18 9 10 19 2 9 6 5 10 1Z" fill={fills[p.hue]} opacity=".85" />
          </svg>
        </span>
      ))}
    </div>
  );
}
