import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import ImageSlot from '../common/ImageSlot.jsx';
import LotusDivider from '../ornaments/LotusDivider.jsx';
import { JasmineSpray } from '../ornaments/LineArt.jsx';
import { useInView } from '../../hooks/useInView.js';
import { family } from '../../data/wedding.js';
import './Family.css';

// Jasmine garland (maalai): buds strung in a ring, a rose at every sixth.
const GARLAND = Array.from({ length: 30 }, (_, i) => ({ angle: i * 12, rose: i % 6 === 3 }));

// Blessing shower: jasmine, rose petals and grains of akshathai (turmeric rice).
const SHOWER = [
  ['jasmine', 6, 0, 17, 13], ['rice', 12, -5, 14, 7], ['rose', 19, -9, 19, 11],
  ['rice', 27, -2, 15, 6], ['jasmine', 34, -12, 21, 12], ['rice', 41, -7, 13, 7],
  ['rose', 49, -14, 18, 10], ['rice', 56, -3, 16, 6], ['jasmine', 63, -10, 20, 13],
  ['rice', 70, -6, 14, 7], ['rose', 77, -1, 19, 11], ['rice', 84, -11, 15, 6],
  ['jasmine', 91, -4, 18, 12], ['rice', 96, -8, 16, 7],
].map(([kind, left, delay, dur, size]) => ({
  kind,
  style: { '--left': `${left}%`, '--delay': `${delay}s`, '--dur': `${dur}s`, '--size': `${size}px` },
}));

function ShowerPiece({ kind }) {
  if (kind === 'rice') {
    return (
      <svg viewBox="-3 -6 6 12">
        <ellipse rx="2" ry="5" fill="#e6be55" />
      </svg>
    );
  }
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
      <path d="M0-8.5C5.5-6.5 6.5 3 0 8.5-6.5 3-5.5-6.5 0-8.5Z" fill="#b8484a" />
    </svg>
  );
}

function Garland() {
  return (
    <svg className="family-card__garland" viewBox="-100 -100 200 200" aria-hidden="true">
      {GARLAND.map(({ angle, rose }, i) => (
        <g key={angle} transform={`rotate(${angle}) translate(0 -91)`}>
          <g className="garland__bud" style={{ '--i': i }}>
            {rose ? (
              <>
                <circle r="5" fill="#a83c3a" />
                <circle r="2.6" fill="#c9585a" />
                <path d="M-6 3.5 -2 1M6 3.5 2 1" stroke="#7d8a5c" strokeWidth="1.6" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse rx="3.1" ry="6.4" fill="#fffaf1" stroke="#dccaa4" strokeWidth="0.5" />
                <ellipse cy="-4.6" rx="1.5" ry="1.7" fill="#f1dcd2" />
              </>
            )}
          </g>
        </g>
      ))}
    </svg>
  );
}

function FamilyCard({ side, which, delay }) {
  return (
    <Reveal as="article" delay={delay} className={`family-card family-card--${which}`}>
      <div className="family-card__portrait">
        <Garland />
        <svg className="family-card__ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="49.4" pathLength="1" />
        </svg>
        <ImageSlot src={side.photo.src} alt={side.photo.alt} label="Family photo" className="family-card__photo" />
      </div>
      <p className="family-card__role">{side.role}</p>
      <h3 className="family-card__name">{side.name}</h3>
      <svg className="family-card__flourish" viewBox="0 0 120 12" fill="none" aria-hidden="true">
        <path d="M4 7c18 0 26-5 40-3.5 7 .8 11 5 16 5s9-4.2 16-5C90 2 98 7 116 7" pathLength="1" />
      </svg>
      <p className="family-card__relation">{side.relation}</p>
      <p className="family-card__parents">{side.parents}</p>
      <p className="family-card__relation family-card__relation--grand">{side.grandRelation}</p>
      <p className="family-card__grand">{side.grandparents}</p>
    </Reveal>
  );
}

export default function Family() {
  const [left, right] = family.sides;
  const [sectionRef, active] = useInView({ threshold: 0, rootMargin: '0px', once: false });
  const [closingRef, closingIn] = useInView({ threshold: 0.4 });
  const words = family.note.split(' ');

  return (
    <section
      id="family"
      ref={sectionRef}
      className="section section--paper family"
      data-active={active}
      aria-labelledby="family-title"
    >
      <div className="section__backdrop" aria-hidden="true">
        <div className="family__photo">
          <img src={family.backdrop.src} alt="" loading="lazy" decoding="async" />
        </div>
        <div className="family__light" />
        <div className="family__shower">
          {SHOWER.map((piece, i) => (
            <span key={i} className={`shower__piece shower__piece--${piece.kind}`} style={piece.style}>
              <ShowerPiece kind={piece.kind} />
            </span>
          ))}
        </div>
      </div>

      <div className="section__inner">
        <SectionHeading id="family-title" eyebrow={family.eyebrow} title={family.title} />

        <div className="family__grid">
          <FamilyCard side={left} which="left" delay={0} />
          <Reveal className="family__union" delay={0.2} aria-hidden="true">
            <span className="family__link family__link--a" />
            <span className="family__amp">
              <span className="family__ripple" />
              <span className="family__ripple family__ripple--late" />
              <span className="family__amp-char">&amp;</span>
            </span>
            <span className="family__link family__link--b" />
          </Reveal>
          <FamilyCard side={right} which="right" delay={0.15} />
        </div>

        <div ref={closingRef} className="family__closing" data-inview={closingIn}>
          <LotusDivider className="family__divider" />
          <p className="family__note">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} style={{ '--w': i }}>
                {word}{' '}
              </span>
            ))}
          </p>
          <p className="family__signature">{family.signature}</p>
          <JasmineSpray className="family__jasmine" />
        </div>
      </div>
    </section>
  );
}
