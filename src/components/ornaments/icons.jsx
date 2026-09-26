const base = { fill: 'none', 'aria-hidden': true, focusable: 'false' };
const line = { stroke: 'currentColor', strokeWidth: 1.3, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M3 12h17M14.5 6.5 20 12l-5.5 5.5" {...line} />
    </svg>
  );
}

export function MusicNoteIcon(props) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <path d="M9.5 17.5V5.8l9-2v11.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="7.2" cy="17.6" rx="2.4" ry="1.9" fill="currentColor" />
      <ellipse cx="16.2" cy="15.3" rx="2.4" ry="1.9" fill="currentColor" />
    </svg>
  );
}

// Named line icons used by data-driven content.
const PATHS = {
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
      <path d="M7.5 13h1M11.5 13h1M15.5 13h1M7.5 16.5h1M11.5 16.5h1" strokeWidth="1.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.8" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2Z" />,
  directions: (
    <>
      <path d="M12 2.8 21.2 12 12 21.2 2.8 12 12 2.8Z" />
      <path d="M9 14v-2.5h5.5M12.5 9.5l2 2-2 2" />
    </>
  ),
  car: (
    <>
      <path d="M4 15.5v-3l1.8-4.5h12.4l1.8 4.5v3" />
      <path d="M3.5 15.5h17v2.5h-17z" />
      <circle cx="7.5" cy="18" r="1.4" />
      <circle cx="16.5" cy="18" r="1.4" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20C4 10 10 4.5 20 4c-.5 10-6 16-16 16Z" />
      <path d="M4 20 13 11" />
    </>
  ),
  rings: (
    <>
      <circle cx="9" cy="13.5" r="5.2" />
      <circle cx="15" cy="13.5" r="5.2" />
      <path d="m13.3 5.3 1.7-2 1.7 2-1.7 2.2-1.7-2.2Z" />
    </>
  ),
  note: (
    <>
      <path d="M9.5 17.5V5.8l9-2v11.4" />
      <ellipse cx="7.2" cy="17.6" rx="2.3" ry="1.8" />
      <ellipse cx="16.2" cy="15.3" rx="2.3" ry="1.8" />
    </>
  ),
  kalash: (
    <>
      <path d="M7 14c0 3.9 2.2 6.8 5 6.8s5-2.9 5-6.8c0-2-1-3.5-2.5-4.3h-5C8 10.5 7 12 7 14Z" />
      <path d="M9.3 9.7h5.4l-.6-1.6h-4.2l-.6 1.6ZM7.6 15.2h8.8" />
      <circle cx="12" cy="5.4" r="2.1" />
      <path d="M10 7.3 7.2 5.6M14 7.3l2.8-1.7" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21" />
      <path d="m12 8.8 3.2 3.2-3.2 3.2L8.8 12 12 8.8Z" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="M14.5 5.5 8 12l6.5 6.5" />,
  chevronRight: <path d="M9.5 5.5 16 12l-6.5 6.5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

export function Icon({ name, ...props }) {
  return (
    <svg viewBox="0 0 24 24" {...base} {...props}>
      <g {...line}>{PATHS[name]}</g>
    </svg>
  );
}
