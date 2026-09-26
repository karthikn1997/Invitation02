import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import Countdown from '../common/Countdown.jsx';
import CornerOrnament from '../ornaments/CornerOrnament.jsx';
import { Lotus } from '../ornaments/LotusDivider.jsx';
import { LotusLineArt, Mandala } from '../ornaments/LineArt.jsx';
import { ArrowIcon, Icon } from '../ornaments/icons.jsx';
import { useInView } from '../../hooks/useInView.js';
import { wedding, welcome } from '../../data/wedding.js';
import './Welcome.css';

const CORNERS = ['tl', 'tr', 'bl', 'br'];

// Golden motes that rise like lamp glow (seeded positions, stable per render).
const MOTES = [
  [6, 0, 13], [14, -4, 16], [23, -9, 12], [31, -2, 15], [42, -11, 14], [55, -6, 17],
  [63, -1, 12], [71, -8, 15], [79, -3, 13], [87, -12, 16], [94, -5, 14], [48, -14, 18],
].map(([left, delay, dur]) => ({ '--left': `${left}%`, '--delay': `${delay}s`, '--dur': `${dur}s` }));

const PETALS = [
  { kind: 'rose', left: '8%', top: '22%', size: 12, dur: 18, delay: -4 },
  { kind: 'jasmine', left: '88%', top: '14%', size: 14, dur: 22, delay: -10 },
  { kind: 'marigold', left: '93%', top: '46%', size: 10, dur: 19, delay: -6 },
  { kind: 'jasmine', left: '4%', top: '58%', size: 13, dur: 21, delay: -13 },
  { kind: 'rose', left: '76%', top: '78%', size: 11, dur: 20, delay: -8 },
];

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
      <path d="M0-8.5C5.5-6.5 6.5 3 0 8.5-6.5 3-5.5-6.5 0-8.5Z" fill={kind === 'rose' ? '#b8484a' : '#df9a45'} />
    </svg>
  );
}

export default function Welcome() {
  // Ambient animations only run while the section is on screen.
  const [sectionRef, active] = useInView({ threshold: 0, rootMargin: '0px', once: false });

  return (
    <section
      id="celebration"
      ref={sectionRef}
      className="section section--paper welcome"
      data-active={active}
      aria-labelledby="welcome-title"
    >
      <div className="section__backdrop" aria-hidden="true">
        <div className="welcome__photo">
          <picture>
            <source media="(min-aspect-ratio: 2/3)" srcSet={welcome.backdrop.wide} />
            <img src={welcome.backdrop.narrow} alt="" loading="lazy" decoding="async" />
          </picture>
        </div>
        <Mandala className="welcome__mandala" />
        <LotusLineArt className="welcome__art welcome__art--left" />
        <LotusLineArt className="welcome__art welcome__art--right" />
        {MOTES.map((style, i) => (
          <span key={`m${i}`} className="welcome__mote" style={style} />
        ))}
        {PETALS.map((p, i) => (
          <span
            key={`p${i}`}
            className="welcome__petal"
            style={{ '--left': p.left, '--top': p.top, '--size': `${p.size}px`, '--dur': `${p.dur}s`, '--delay': `${p.delay}s` }}
          >
            <Petal kind={p.kind} />
          </span>
        ))}
      </div>

      <div className="section__inner">
        <SectionHeading id="welcome-title" eyebrow={welcome.eyebrow} title={welcome.title} />

        <ul className="welcome__details">
          {welcome.details.map((item, index) => (
            <Reveal as="li" key={item.label} delay={0.18 * index} className="detail-card">
              {CORNERS.map((pos) => (
                <CornerOrnament key={pos} className={`detail-card__corner detail-card__corner--${pos}`} />
              ))}
              <span className="detail-card__shine" aria-hidden="true" />
              <span className="detail-card__icon" aria-hidden="true">
                <span className="detail-card__orbit" />
                <Icon name={item.icon} />
              </span>
              <h3 className="detail-card__label">{item.label}</h3>
              {item.lines?.map((text) => (
                <p key={text} className="detail-card__value">
                  {text}
                </p>
              ))}
              {item.accent && <p className="detail-card__accent">{item.accent}</p>}
              {item.small && <p className="detail-card__small">{item.small}</p>}
              <Lotus className="detail-card__lotus" />
            </Reveal>
          ))}
        </ul>

        <Reveal className="welcome__countdown">
          <Countdown iso={wedding.muhurthamStart} label={welcome.countdownLabel} />
        </Reveal>

        <Reveal className="welcome__cta" delay={0.1}>
          <span className="welcome__cta-halo">
            <a className="btn btn--maroon" href={welcome.cta.href}>
              <span>{welcome.cta.label}</span>
              <ArrowIcon />
            </a>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
