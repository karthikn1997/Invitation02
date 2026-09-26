// Slow-falling jasmine, marigold and rose petals plus a few golden motes.
// Values are seeded so the layout is stable between renders.
function seeded(seed) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seeded(17122026);
const between = (min, max) => min + rand() * (max - min);

const KINDS = ['jasmine', 'marigold', 'jasmine', 'rose', 'marigold', 'jasmine'];

const PETALS = Array.from({ length: 20 }, (_, i) => {
  const duration = between(22, 38);
  return {
    kind: KINDS[i % KINDS.length],
    style: {
      '--left': `${between(2, 98).toFixed(2)}%`,
      '--size': `${between(9, 17).toFixed(1)}px`,
      '--dur': `${duration.toFixed(1)}s`,
      '--delay': `${(-rand() * duration).toFixed(1)}s`,
      '--drift': `${between(-90, 90).toFixed(0)}px`,
      '--sway': `${between(10, 26).toFixed(0)}px`,
      '--sway-dur': `${between(3.8, 7).toFixed(1)}s`,
      '--spin': `${Math.round((rand() > 0.5 ? 1 : -1) * between(70, 200))}deg`,
      '--o': between(0.6, 0.92).toFixed(2),
    },
  };
});

const MOTES = Array.from({ length: 8 }, () => ({
  '--x': `${between(6, 94).toFixed(1)}%`,
  '--y': `${between(8, 62).toFixed(1)}%`,
  '--dur': `${between(4, 8).toFixed(1)}s`,
  '--delay': `${(-between(0, 8)).toFixed(1)}s`,
}));

function PetalShape({ kind }) {
  if (kind === 'jasmine') {
    return (
      <svg viewBox="-10 -10 20 20">
        <g fill="#fffaf0">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-4.6" rx="2.6" ry="4.6" transform={`rotate(${a})`} />
          ))}
        </g>
        <circle r="1.5" fill="#efd79a" />
      </svg>
    );
  }
  return (
    <svg viewBox="-10 -10 20 20">
      <path
        d="M0-8.5C5.5-6.5 6.5 3 0 8.5-6.5 3-5.5-6.5 0-8.5Z"
        fill={kind === 'rose' ? '#8f2c27' : '#e39a3b'}
      />
      <path d="M0-6.5V6" stroke="rgba(0,0,0,.14)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((petal, i) => (
        <span key={i} className={`petal petal--${petal.kind}`} style={petal.style}>
          <span className="petal__body">
            <PetalShape kind={petal.kind} />
          </span>
        </span>
      ))}
      {MOTES.map((style, i) => (
        <span key={`m${i}`} className="mote" style={style} />
      ))}
    </div>
  );
}
