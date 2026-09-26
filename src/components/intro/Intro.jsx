import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Diya from '../ornaments/Diya.jsx';
import { Lotus } from '../ornaments/LotusDivider.jsx';
import { TempleBell } from '../ornaments/LineArt.jsx';
import { OPEN_EVENT } from '../layout/MusicToggle.jsx';
import { wedding } from '../../data/wedding.js';
import './Intro.css';

// Timeline of the opening sequence (ms after the click). The doors
// themselves start swinging at 0.65s via a CSS transition delay.
const T = {
  reveal: 1500, // hero animations resume behind the doors
  fade: 2500, // overlay fades out
  done: 3200, // overlay unmounts
};

// Petals that burst out from the seam as the doors part.
const BURST = Array.from({ length: 26 }, (_, i) => ({
  '--a': `${(i * 137.5) % 360}deg`,
  '--dist': `${28 + (i % 5) * 7}vmin`,
  '--delay': `${(i % 6) * 0.04}s`,
  '--spin': `${(i % 2 ? 1 : -1) * (180 + (i % 4) * 60)}deg`,
  kind: ['rose', 'jasmine', 'marigold'][i % 3],
}));

// A few petals drifting across the closed doors.
const DRIFT = [
  ['jasmine', 12, -2, 16], ['rose', 30, -9, 19], ['marigold', 52, -5, 17],
  ['jasmine', 70, -12, 21], ['rose', 86, -4, 18], ['jasmine', 42, -15, 20],
].map(([kind, left, delay, dur]) => ({ kind, style: { '--left': `${left}%`, '--delay': `${delay}s`, '--dur': `${dur}s` } }));

function Petal({ kind }) {
  if (kind === 'jasmine') {
    return (
      <svg viewBox="-10 -10 20 20">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-4.6" rx="2.6" ry="4.6" transform={`rotate(${a})`} fill="#fffaf0" stroke="#e2d3b4" strokeWidth="0.4" />
        ))}
        <circle r="1.5" fill="#e8cc86" />
      </svg>
    );
  }
  return (
    <svg viewBox="-10 -10 20 20">
      <path d="M0-8.5C5.5-6.5 6.5 3 0 8.5-6.5 3-5.5-6.5 0-8.5Z" fill={kind === 'rose' ? '#b8484a' : '#e39a3b'} />
    </svg>
  );
}

function Door({ side }) {
  return (
    <div className={`intro__door intro__door--${side}`}>
      <span className="intro__panel intro__panel--top" />
      <span className="intro__panel intro__panel--bottom" />
      <span className="intro__knocker" />
    </div>
  );
}

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('idle'); // idle → opening → fading
  const buttonRef = useRef(null);
  const timers = useRef([]);

  // Hold the page (and the hero's entrance animations) until the doors open.
  useLayoutEffect(() => {
    document.documentElement.classList.add('is-intro');
    return () => document.documentElement.classList.remove('is-intro');
  }, []);

  useEffect(() => {
    buttonRef.current?.focus({ preventScroll: true });
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const open = () => {
    if (phase !== 'idle') return;
    // Dispatched synchronously inside the click so music may start.
    window.dispatchEvent(new Event(OPEN_EVENT));
    setPhase('opening');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const at = (ms, fn) => timers.current.push(setTimeout(fn, reduced ? Math.min(ms, 400) : ms));
    at(T.reveal, () => document.documentElement.classList.remove('is-intro'));
    at(T.fade, () => setPhase('fading'));
    at(T.done, () => onDone?.());
  };

  return (
    <div className="intro" data-phase={phase} role="dialog" aria-modal="true" aria-labelledby="intro-title">
      {/* Golden light that floods through the parting doors */}
      <span className="intro__seam" aria-hidden="true" />
      <span className="intro__flood" aria-hidden="true" />

      <div className="intro__doors" aria-hidden="true">
        <Door side="l" />
        <Door side="r" />
      </div>

      <div className="intro__lintel" aria-hidden="true">
        <div className="intro__bells">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="intro__bell" style={{ '--i': i }}>
              <TempleBell />
            </span>
          ))}
        </div>
      </div>

      <div className="intro__drift" aria-hidden="true">
        {DRIFT.map((p, i) => (
          <span key={i} className="intro__drift-petal" style={p.style}>
            <Petal kind={p.kind} />
          </span>
        ))}
      </div>

      <div className="intro__diyas" aria-hidden="true">
        <Diya id="intro-flame-l" className="intro__diya" />
        <Diya id="intro-flame-r" className="intro__diya" />
      </div>

      <div className="intro__card">
        <Lotus className="intro__lotus" />
        <p className="intro__ta" lang="ta">
          {wedding.invitationTa}
        </p>
        <p className="intro__kicker">You are warmly invited to the wedding of</p>
        <h2 id="intro-title" className="intro__names">
          <span>{wedding.couple[0]}</span>
          <em>&amp;</em>
          <span>{wedding.couple[1]}</span>
        </h2>
        <p className="intro__date">{wedding.date.display}</p>
        <span className="intro__halo">
          <button ref={buttonRef} type="button" className="intro__open" onClick={open} disabled={phase !== 'idle'}>
            Open Invitation
          </button>
        </span>
        <p className="intro__hint">Tap to open the temple doors</p>
      </div>

      <div className="intro__burst" aria-hidden="true">
        {phase !== 'idle' &&
          BURST.map(({ kind, ...style }, i) => (
            <span key={i} style={style}>
              <Petal kind={kind} />
            </span>
          ))}
      </div>
    </div>
  );
}
