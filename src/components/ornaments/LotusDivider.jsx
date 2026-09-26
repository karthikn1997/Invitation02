// Antique-gold hairline divider with a lotus at its centre.
export function Lotus({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 24" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round">
        <path d="M20 2.5c3 3.6 3.8 8.6 0 14.5-3.8-5.9-3-10.9 0-14.5Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M20 17c-1.4-4.6-5-7.6-10-8.2.8 4.9 4.5 7.9 10 8.2Z" />
        <path d="M20 17c1.4-4.6 5-7.6 10-8.2-.8 4.9-4.5 7.9-10 8.2Z" />
        <path d="M20 17c-3.6-2.6-8.2-3.3-13.2-1.6 3.1 3.1 8.1 3.7 13.2 1.6Z" />
        <path d="M20 17c3.6-2.6 8.2-3.3 13.2-1.6-3.1 3.1-8.1 3.7-13.2 1.6Z" />
        <path d="M12 21h16" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function LotusDivider({ className = '' }) {
  return (
    <div className={`lotus-divider ${className}`} aria-hidden="true">
      <span className="lotus-divider__line" />
      <Lotus className="lotus-divider__lotus" />
      <span className="lotus-divider__line lotus-divider__line--end" />
    </div>
  );
}
