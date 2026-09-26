// Line art and small illustrations shared across the paper sections.

/* ---------- Jasmine spray (overlaps a corner of the portrait) ---------- */

function JasmineFlower({ x, y, r, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="0"
          cy={-r * 0.92}
          rx={r * 0.44}
          ry={r}
          transform={`rotate(${a})`}
          fill="#fffaf1"
          stroke="#dccaa4"
          strokeWidth="0.6"
        />
      ))}
      <circle r={r * 0.3} fill="#e8cc86" />
    </g>
  );
}

function Leaf({ x, y, len, rotate }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <path
        d={`M0 0C${len * 0.28} ${-len * 0.22} ${len * 0.72} ${-len * 0.22} ${len} 0C${len * 0.72} ${len * 0.22} ${len * 0.28} ${len * 0.22} 0 0Z`}
        fill="#8c9a6a"
        fillOpacity="0.9"
      />
      <path d={`M1 0H${len - 2}`} stroke="#c9d1b0" strokeWidth="0.6" strokeOpacity="0.8" />
    </g>
  );
}

function Bud({ x, y, rotate }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <ellipse cx="0" cy="-5" rx="2.4" ry="5.6" fill="#fffaf1" stroke="#dccaa4" strokeWidth="0.6" />
      <ellipse cx="0" cy="-9" rx="1.4" ry="1.6" fill="#efd3cb" />
    </g>
  );
}

export function JasmineSpray({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 170 130" fill="none" aria-hidden="true" focusable="false">
      <path d="M6 124C42 104 74 80 160 26" stroke="#7d8a5c" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M62 88c6-14 16-24 30-30" stroke="#7d8a5c" strokeWidth="1" strokeLinecap="round" />
      <Leaf x={30} y={110} len={30} rotate={-80} />
      <Leaf x={52} y={96} len={26} rotate={10} />
      <Leaf x={96} y={66} len={28} rotate={-100} />
      <Leaf x={122} y={48} len={24} rotate={20} />
      <Bud x={150} y={34} rotate={60} />
      <Bud x={92} y={58} rotate={40} />
      <Bud x={138} y={42} rotate={-20} />
      <JasmineFlower x={22} y={116} r={9} rotate={10} />
      <JasmineFlower x={46} y={100} r={7.5} rotate={30} />
      <JasmineFlower x={76} y={80} r={9.5} rotate={-8} />
      <JasmineFlower x={108} y={60} r={7} rotate={22} />
    </svg>
  );
}

/* ---------- Tiny temple bell ---------- */

export function TempleBell({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 36" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1v8" />
        <circle cx="12" cy="10.5" r="1.5" />
        <path d="M5.5 25c0-7 2.8-12.4 6.5-12.4s6.5 5.4 6.5 12.4l2 3H3.5l2-3Z" fill="currentColor" fillOpacity="0.1" />
        <path d="M7.5 21.5h9" strokeOpacity="0.6" />
      </g>
      <circle cx="12" cy="31" r="1.8" fill="currentColor" />
    </svg>
  );
}

/* ---------- Faint background line art ---------- */

// Gopuram outline: stacked tiers narrowing toward a barrel-vault crown.
const TIERS = (() => {
  const tiers = [];
  let y = 330;
  for (let i = 0; i < 7; i += 1) {
    const w = 236 - i * 26;
    const h = 34 - i * 1.5;
    const x = 150 - w / 2;
    tiers.push({ x, y: y - h, w, h, inset: 5 });
    y -= h;
  }
  return tiers;
})();
const CROWN_Y = TIERS[TIERS.length - 1].y;

export function GopuramLineArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 300 400" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <rect x="20" y="330" width="260" height="66" />
        <path d="M130 396v-38c0-11 9-20 20-20s20 9 20 20v38" />
        <path d="M40 346h40M220 346h40M40 372h40M220 372h40" strokeOpacity="0.6" />
        {TIERS.map(({ x, y, w, h, inset }) => (
          <g key={y}>
            <path d={`M${x} ${y + h}L${x + inset} ${y}H${x + w - inset}L${x + w} ${y + h}`} />
            <rect x={150 - 6} y={y + h * 0.3} width="12" height={h * 0.5} strokeOpacity="0.7" />
            <path
              d={`M${x + w * 0.2} ${y + h * 0.75}v${-h * 0.4}M${x + w * 0.8} ${y + h * 0.75}v${-h * 0.4}`}
              strokeOpacity="0.5"
            />
          </g>
        ))}
        <path d={`M92 ${CROWN_Y}c0-22 26-34 58-34s58 12 58 34`} />
        {[108, 129, 150, 171, 192].map((x) => (
          <path key={x} d={`M${x} ${CROWN_Y - 22 - (x === 150 ? 12 : 4)}v-12m-3 5h6`} strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

// Loose lotus-and-leaf botanical, drawn as a single weight line.
export function LotusLineArt({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 220 220" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M110 40c14 18 18 42 0 70-18-28-14-52 0-70Z" />
        <path d="M110 110c-6-24-24-40-50-44 4 26 22 42 50 44Z" />
        <path d="M110 110c6-24 24-40 50-44-4 26-22 42-50 44Z" />
        <path d="M110 110c-18-14-42-18-68-8 16 16 42 20 68 8Z" />
        <path d="M110 110c18-14 42-18 68-8-16 16-42 20-68 8Z" />
        <path d="M110 110c-2 30 4 60 20 96" />
        <path d="M122 170c20-16 50-18 76-4-22 16-52 18-76 4Z" />
        <path d="M122 170c26-2 50-2 76-4" strokeOpacity="0.6" />
        <path d="M100 150c-20-10-44-8-62 6 20 10 44 8 62-6Z" />
      </g>
    </svg>
  );
}

// Simple kolam: dot grid threaded by a continuous looping line.
export function KolamMotif({ className = '' }) {
  const dots = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) dots.push([40 + c * 20, 40 + r * 20]);
  }
  const corners = [
    [40, 40],
    [80, 40],
    [40, 80],
    [80, 80],
  ];
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
      <g fill="currentColor">
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
        <path d="M60 10C80 30 90 40 110 60 90 80 80 90 60 110 40 90 30 80 10 60 30 40 40 30 60 10Z" />
        <circle cx="60" cy="60" r="11" />
        {corners.map(([x, y]) => (
          <circle key={`c${x}-${y}`} cx={x} cy={y} r="8" strokeOpacity="0.7" />
        ))}
      </g>
    </svg>
  );
}

// Temple-ceiling style mandala: petal rings, dotted orbits and a lotus core.
const MANDALA_ANGLES = Array.from({ length: 16 }, (_, i) => i * 22.5);

export function Mandala({ className = '' }) {
  return (
    <svg className={className} viewBox="-100 -100 200 200" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="0.5">
        <circle r="97" />
        <circle r="92" strokeDasharray="1 3" />
        {MANDALA_ANGLES.map((a) => (
          <path key={`o${a}`} d="M0-89C9-75 9-61 0-51-9-61-9-75 0-89Z" transform={`rotate(${a})`} />
        ))}
        {MANDALA_ANGLES.map((a) => (
          <path key={`s${a}`} d="M0-84C4-76 4-68 0-62-4-68-4-76 0-84Z" transform={`rotate(${a + 11.25})`} strokeOpacity="0.6" />
        ))}
        <circle r="49" />
        <circle r="45" strokeDasharray="2 2.5" />
        {MANDALA_ANGLES.filter((_, i) => i % 2 === 0).map((a) => (
          <path key={`i${a}`} d="M0-43C7-33 7-25 0-19-7-25-7-33 0-43Z" transform={`rotate(${a + 22.5})`} />
        ))}
        <circle r="17" />
        <circle r="10" strokeDasharray="1.5 1.5" />
      </g>
      <g fill="currentColor">
        {MANDALA_ANGLES.map((a) => (
          <circle key={`d${a}`} cx="0" cy="-56" r="1.1" transform={`rotate(${a + 11.25})`} />
        ))}
        <circle r="2.2" />
      </g>
    </svg>
  );
}
