// Clay oil lamp with a flickering flame. `id` must be unique per instance
// (it names the flame gradient). Base styles live in styles/sections.css.
export default function Diya({ className = '', id, style }) {
  return (
    <span className={`diya ${className}`} style={style} aria-hidden="true">
      <span className="diya__glow" />
      <svg viewBox="0 0 40 34">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset="0.55" stopColor="#f6b94a" />
            <stop offset="1" stopColor="#e0702a" />
          </linearGradient>
        </defs>
        <path className="diya__flame" d="M20 2c4 5 5 9 0 14-5-5-4-9 0-14Z" fill={`url(#${id})`} />
        <ellipse cx="20" cy="16.5" rx="3" ry="1.1" fill="#5d3216" />
        <path d="M3 18h34c-2 8-8.5 12-17 12S5 26 3 18Z" fill="#b5652d" />
        <path d="M3 18h34" stroke="#e3a45e" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M9 22.5c4 2 18 2 22 0" stroke="#8f4b22" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M14 30h12l2 3H12l2-3Z" fill="#8f4b22" />
      </svg>
    </span>
  );
}
