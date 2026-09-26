import { useEffect, useMemo, useState } from 'react';

const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hours'],
  ['minutes', 'Minutes'],
  ['seconds', 'Seconds'],
];

function remaining(target) {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export default function Countdown({ iso, label }) {
  const target = useMemo(() => new Date(iso).getTime(), [iso]);
  const [left, setLeft] = useState(() => remaining(target));

  useEffect(() => {
    if (left.done) return undefined;
    const id = setInterval(() => setLeft(remaining(target)), 1000);
    return () => clearInterval(id);
  }, [target, left.done]);

  if (left.done) {
    return <p className="countdown__done">We are married! Thank you for your blessings.</p>;
  }

  return (
    <div className="countdown" role="timer" aria-label={`${label}: ${left.days} days to go`}>
      <p className="countdown__label" aria-hidden="true">{label}</p>
      <ol className="countdown__units" aria-hidden="true">
        {UNITS.map(([key, name]) => (
          <li key={key} className="countdown__unit">
            {/* Keyed by value so each change remounts and plays the digit animation */}
            <span className="countdown__digits">
              <span key={left[key]} className="countdown__value">
                {String(left[key]).padStart(2, '0')}
              </span>
            </span>
            <span className="countdown__name">{name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
