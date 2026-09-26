import { useCallback, useEffect, useRef, useState } from 'react';
import { navItems, wedding } from '../../data/wedding.js';
import './SiteHeader.css';

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;

    document.body.classList.add('is-locked');
    firstLinkRef.current?.focus({ preventScroll: true });

    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header className="site-header">
        <a className="monogram" href="#top" aria-label={`${wedding.couple.join(' and ')}, back to top`}>
          <span className="monogram__ring" aria-hidden="true">
            <span>{wedding.monogram[0]}</span>
            <span className="monogram__amp">&amp;</span>
            <span>{wedding.monogram[1]}</span>
          </span>
        </a>

        <p className="site-header__title" aria-hidden="true">
          {wedding.couple[0]} <span>&amp;</span> {wedding.couple[1]}
        </p>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-toggle__label">{open ? 'Close' : 'Menu'}</span>
          <span className="menu-toggle__button" aria-hidden="true">
            <span className="menu-toggle__bars">
              <span />
              <span />
              <span />
            </span>
          </span>
        </button>
      </header>

      <nav id="site-menu" className="site-menu" data-open={open} aria-label="Main" aria-hidden={!open}>
        <ul className="site-menu__list">
          {navItems.map((item, index) => (
            <li key={item.href} style={{ '--i': index }}>
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={item.href}
                tabIndex={open ? undefined : -1}
                onClick={close}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="site-menu__footnote">
          <time dateTime={wedding.date.iso}>{wedding.date.display}</time>
        </p>
      </nav>
    </>
  );
}
