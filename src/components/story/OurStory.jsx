import { useEffect } from 'react';
import LotusDivider from '../ornaments/LotusDivider.jsx';
import {
  GopuramLineArt,
  JasmineSpray,
  KolamMotif,
  LotusLineArt,
  TempleBell,
} from '../ornaments/LineArt.jsx';
import { useInView } from '../../hooks/useInView.js';
import { story } from '../../data/wedding.js';
import './OurStory.css';

const photo = (ext) => `/images/story-couple-600.${ext} 600w, /images/story-couple-902.${ext} 902w`;

// A handful of petals that drift in place; paused while off-screen.
const PETALS = [
  { kind: 'rose', left: '6%', top: '14%', size: 12, dur: 17, delay: -3 },
  { kind: 'jasmine', left: '91%', top: '9%', size: 14, dur: 21, delay: -9 },
  { kind: 'marigold', left: '47%', top: '4%', size: 10, dur: 19, delay: -5 },
  { kind: 'rose', left: '94%', top: '52%', size: 11, dur: 23, delay: -14 },
  { kind: 'jasmine', left: '3%', top: '64%', size: 13, dur: 20, delay: -7 },
  { kind: 'rose', left: '58%', top: '93%', size: 10, dur: 18, delay: -11 },
  { kind: 'marigold', left: '22%', top: '38%', size: 9, dur: 24, delay: -16 },
  { kind: 'jasmine', left: '72%', top: '30%', size: 11, dur: 22, delay: -2 },
];

// Twinkling gold sparkles around the portrait (position within the figure).
const SPARKLES = [
  { top: '6%', left: '-6%', size: 14, delay: 0 },
  { top: '30%', left: '103%', size: 10, delay: 1.6 },
  { top: '64%', left: '-9%', size: 9, delay: 3.1 },
  { top: '90%', left: '98%', size: 13, delay: 2.2 },
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

// Subtle scroll parallax for the portrait: writes --parallax (-1 … 1).
function useParallax(ref, enabled) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const half = window.innerHeight / 2;
      const progress = (rect.top + rect.height / 2 - half) / (half + rect.height / 2);
      el.style.setProperty('--parallax', Math.max(-1, Math.min(1, progress)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, enabled]);
}

export default function OurStory() {
  const [sectionRef, active] = useInView({ threshold: 0, rootMargin: '0px', once: false });
  const [headRef, headIn] = useInView();
  const [figureRef, figureIn] = useInView({ threshold: 0.25 });
  const [textRef, textIn] = useInView({ threshold: 0.3 });

  useParallax(figureRef, active);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="story"
      data-active={active}
      data-revealed={headIn}
      aria-labelledby="story-title"
    >
      <div className="story__backdrop" aria-hidden="true">
        <LotusLineArt className="story__art story__art--lotus" />
        <KolamMotif className="story__art story__art--kolam" />
        <GopuramLineArt className="story__art story__art--gopuram" />
        {PETALS.map((p, i) => (
          <span
            key={i}
            className="story-petal"
            style={{
              '--left': p.left,
              '--top': p.top,
              '--size': `${p.size}px`,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
            }}
          >
            <Petal kind={p.kind} />
          </span>
        ))}
      </div>

      <div className="story__inner">
        <header ref={headRef} className="story__head" data-inview={headIn}>
          <p className="story__eyebrow reveal">
            <span className="story__eyebrow-line" aria-hidden="true" />
            {story.eyebrow}
            <span className="story__eyebrow-line story__eyebrow-line--end" aria-hidden="true" />
          </p>
          <LotusDivider className="story__divider reveal" />
          <h2 id="story-title" className="story__title reveal">
            <span className="story__title-line">{story.title[0]}</span>{' '}
            <em className="story__title-line">{story.title[1]}</em>
          </h2>
        </header>

        <div className="story__grid">
          <figure ref={figureRef} className="story__figure" data-inview={figureIn}>
            <svg className="story__trace" viewBox="0 0 100 150" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M0 46A50 46 0 0 1 100 46V146.5Q100 150 96 150H4Q0 150 0 146.5Z"
                pathLength="1"
              />
            </svg>
            <div className="story__arch">
              <div className="story__frame">
                <picture>
                  <source type="image/webp" srcSet={photo('webp')} sizes="(min-width: 960px) 460px, 82vw" />
                  <img
                    className="story__photo"
                    src="/images/story-couple-902.jpg"
                    srcSet={photo('jpg')}
                    sizes="(min-width: 960px) 460px, 82vw"
                    width="902"
                    height="1353"
                    alt={story.photo.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="story__glow" aria-hidden="true" />
              </div>
            </div>
            <JasmineSpray className="story__jasmine" />
            {SPARKLES.map((s, i) => (
              <svg
                key={i}
                className="story__sparkle"
                viewBox="-10 -10 20 20"
                aria-hidden="true"
                style={{ top: s.top, left: s.left, width: s.size, height: s.size, '--delay': `${s.delay}s` }}
              >
                <path d="M0-10C1-2 2-1 10 0 2 1 1 2 0 10-1 2-2 1-10 0-2-1-1-2 0-10Z" />
              </svg>
            ))}
          </figure>

          {/* <div className="story__body">
            <div ref={textRef} className="story__text" data-inview={textIn}>
              <span className="story__bell-wrap reveal" aria-hidden="true">
                <span className="story__ripple" />
                <span className="story__ripple story__ripple--late" />
                <TempleBell className="story__bell" />
              </span>
              <h3 className="story__heading reveal">{story.heading}</h3>
              <p className="story__lead">
                {story.lead.map((line, i) => (
                  <span key={line} style={{ '--i': i }}>
                    {line}{' '}
                  </span>
                ))}
              </p>
              <span className="story__rule" aria-hidden="true" />
              <p className="story__copy reveal">{story.body}</p>
              <svg className="story__flourish" viewBox="0 0 160 24" fill="none" aria-hidden="true">
                <path
                  d="M4 14C28 14 40 6 58 8c10 1 14 8 22 8s12-7 22-8c18-2 30 6 54 6"
                  pathLength="1"
                />
                <path d="m80 7 3.5 4.5L80 16l-3.5-4.5L80 7Z" className="story__flourish-gem" />
              </svg>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}
