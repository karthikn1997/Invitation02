import { useEffect, useRef } from 'react';
import LotusDivider from '../ornaments/LotusDivider.jsx';
import Diya from '../ornaments/Diya.jsx';
import { useInView } from '../../hooks/useInView.js';
import { footer, navItems, wedding } from '../../data/wedding.js';
import './Footer.css';

// Row of lamps lit from the centre outward.
const LAMPS = Array.from({ length: 9 }, (_, i) => ({ order: Math.abs(i - 4), edge: Math.abs(i - 4) >= 3 }));

// Night-sky stars: [left %, top %, size px, delay s]
const STARS = [
  [4, 12, 2, 0.2], [11, 44, 1.5, 2.1], [17, 20, 2.5, 1.2], [23, 70, 1.5, 3.4], [29, 34, 2, 0.8],
  [36, 12, 1.5, 2.8], [42, 58, 2, 1.6], [58, 16, 2, 3.1], [64, 48, 1.5, 0.5], [70, 26, 2.5, 2.4],
  [76, 66, 1.5, 1.1], [82, 14, 2, 3.8], [88, 40, 1.5, 0.3], [94, 22, 2, 2.6], [50, 80, 1.5, 1.9],
  [8, 84, 2, 2.2], [92, 78, 2, 0.9], [33, 88, 1.5, 3.3],
].map(([x, y, size, delay]) => ({ left: `${x}%`, top: `${y}%`, width: size, height: size, '--delay': `${delay}s` }));

// Gold ring on the back-to-top button tracks page scroll progress.
function useScrollProgress(ref, enabled) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : '0');
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

function Letters({ text, start }) {
  return [...text].map((ch, i) => (
    <span key={i} className="site-footer__letter" style={{ '--i': start + i }} aria-hidden="true">
      {ch === ' ' ? ' ' : ch}
    </span>
  ));
}

export default function Footer() {
  const [footerRef, active] = useInView({ threshold: 0, rootMargin: '0px', once: false });
  const [mainRef, seen] = useInView({ threshold: 0.3 });
  const topRef = useRef(null);
  useScrollProgress(topRef, active);

  const [first, second] = wedding.couple;

  return (
    <footer ref={footerRef} className="site-footer" data-active={active} data-inview={seen}>
      <div className="site-footer__sky" aria-hidden="true">
        {STARS.map((style, i) => (
          <span key={i} className="site-footer__star" style={style} />
        ))}
        <span className="site-footer__shooting" />
        <span className="site-footer__shooting site-footer__shooting--late" />
      </div>

      <div className="site-footer__lamps" aria-hidden="true">
        {LAMPS.map((lamp, i) => (
          <Diya
            key={i}
            id={`footer-flame-${i}`}
            className={`site-footer__lamp${lamp.edge ? ' site-footer__lamp--edge' : ''}`}
            style={{ '--order': lamp.order }}
          />
        ))}
      </div>

      <div className="site-footer__inner">
        <div ref={mainRef} className="site-footer__main">
          <p className="site-footer__blessing" lang="ta">
            {footer.blessingTa}
          </p>
          <p className="site-footer__names" aria-label={wedding.names}>
            <Letters text={first} start={0} />
            <span className="site-footer__amp" style={{ '--i': first.length }} aria-hidden="true">
              &amp;
            </span>
            <Letters text={second} start={first.length + 1} />
          </p>
          <LotusDivider className="site-footer__divider" />
          <p className="site-footer__date">
            <time dateTime={wedding.date.iso}>{wedding.date.display}</time>
          </p>
          <p className="site-footer__thanks">{footer.thanks}</p>
          <p className="site-footer__hashtag">
            <span className="site-footer__typed">{wedding.hashtag}</span>
            <span className="site-footer__caret" aria-hidden="true" />
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.href} style={{ '--i': i }}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__bottom">
          <p>Made with love for our families · {new Date(wedding.date.iso).getFullYear()}</p>
          <a ref={topRef} href="#top" className="site-footer__top">
            <span className="site-footer__top-ring" aria-hidden="true">
              <svg viewBox="0 0 48 48">
                <circle className="site-footer__top-track" cx="24" cy="24" r="22" />
                <circle className="site-footer__top-progress" cx="24" cy="24" r="22" pathLength="1" />
              </svg>
              <span className="site-footer__top-arrow">↑</span>
            </span>
            <span>Back to top</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
