// Fine gold filigree for the card corners: an arc echoing the corner,
// two inward curls and a lotus bud pointing toward the card centre.
export default function CornerOrnament({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        <path d="M3 20C3 10.6 10.6 3 20 3" />
        <path d="M3 30c0-5.2 3.1-8.4 7.6-8.4 3 0 4.8 2 4.8 4.3 0 1.9-1.4 3.3-3.1 3.3" />
        <path d="M30 3c-5.2 0-8.4 3.1-8.4 7.6 0 3 2 4.8 4.3 4.8 1.9 0 3.3-1.4 3.3-3.1" />
        <path d="M9 9c6.4 0 11.6 5.2 11.6 11.6C14.2 20.6 9 15.4 9 9Z" fill="currentColor" fillOpacity="0.14" />
        <path d="M11.5 11.5l6.8 6.8" strokeOpacity="0.6" />
      </g>
      <circle cx="24.6" cy="24.6" r="1.3" fill="currentColor" />
      <circle cx="20" cy="3" r="1" fill="currentColor" />
      <circle cx="3" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}
