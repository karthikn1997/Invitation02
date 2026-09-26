import { useState } from 'react';
import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import { Lotus } from '../ornaments/LotusDivider.jsx';
import { KolamMotif, Mandala } from '../ornaments/LineArt.jsx';
import { ArrowIcon, Icon } from '../ornaments/icons.jsx';
import { useInView } from '../../hooks/useInView.js';
import { events, rsvp, wedding } from '../../data/wedding.js';
import './Rsvp.css';

const EMPTY = { name: '', phone: '', attending: 'yes', guests: 1, events: events.items.map((e) => e.name), message: '' };

const ATTENDING = [
  ['yes', 'Joyfully accepts'],
  ['no', 'Regretfully declines'],
];

// Twinkling gold stars in the backdrop: [left %, top %, size px, delay s]
const STARS = [
  [7, 18, 10, 0], [16, 62, 7, 1.4], [24, 34, 8, 2.6], [83, 22, 9, 0.7],
  [91, 58, 7, 2], [76, 80, 10, 3.1], [12, 86, 8, 1.1], [60, 10, 7, 2.3],
];

// Petal burst for the thank-you: angle, distance and delay per petal.
const BURST = Array.from({ length: 18 }, (_, i) => ({
  '--a': `${i * 20 + (i % 2) * 8}deg`,
  '--dist': `${90 + (i % 3) * 38}px`,
  '--delay': `${(i % 4) * 0.05}s`,
  kind: ['rose', 'jasmine', 'marigold'][i % 3],
}));

function buildMessage(form) {
  const lines = [`RSVP · ${wedding.bride} & ${wedding.groom}`, '', `Name: ${form.name}`];
  if (form.phone) lines.push(`Phone: ${form.phone}`);
  if (form.attending === 'yes') {
    lines.push('Response: Joyfully accepts', `Guests: ${form.guests}`, `Attending: ${form.events.join(', ') || '—'}`);
  } else {
    lines.push('Response: Regretfully declines');
  }
  if (form.message.trim()) lines.push('', `Message: ${form.message.trim()}`);
  return lines.join('\n');
}

function WaxSeal({ className }) {
  return (
    <svg className={className} viewBox="-40 -40 80 80" aria-hidden="true">
      <defs>
        <radialGradient id="rsvp-wax" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#b3473a" />
          <stop offset="0.6" stopColor="#8a2a22" />
          <stop offset="1" stopColor="#5e1812" />
        </radialGradient>
      </defs>
      {/* Wavy wax edge */}
      <path
        d={Array.from({ length: 24 }, (_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const r = i % 2 ? 36 : 38.5;
          return `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(2)} ${(Math.sin(a) * r).toFixed(2)}`;
        }).join('') + 'Z'}
        fill="url(#rsvp-wax)"
        strokeLinejoin="round"
        stroke="#5e1812"
        strokeWidth="2"
      />
      <circle r="27" fill="none" stroke="rgba(255, 220, 190, 0.35)" strokeWidth="1" />
      <circle r="23.5" fill="none" stroke="rgba(0, 0, 0, 0.25)" strokeWidth="1" />
      <text className="rsvp__seal-text" y="7" textAnchor="middle">
        M<tspan className="rsvp__seal-amp">&amp;</tspan>A
      </text>
    </svg>
  );
}

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

export default function Rsvp() {
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [sectionRef, active] = useInView({ threshold: 0, rootMargin: '0px', once: false });
  const attending = form.attending === 'yes';

  const update = (field) => (event) => setForm((f) => ({ ...f, [field]: event.target.value }));
  const setGuests = (delta) =>
    setForm((f) => ({ ...f, guests: Math.min(rsvp.maxGuests, Math.max(1, f.guests + delta)) }));

  const toggleEvent = (name) =>
    setForm((f) => ({
      ...f,
      events: f.events.includes(name) ? f.events.filter((n) => n !== name) : [...f.events, name],
    }));

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `https://wa.me/${rsvp.whatsapp}?text=${encodeURIComponent(buildMessage(form))}`;
    window.open(url, '_blank', 'noopener');
    setSent(true);
  };

  return (
    <section
      id="rsvp"
      ref={sectionRef}
      className="section section--maroon rsvp"
      data-active={active}
      aria-labelledby="rsvp-title"
    >
      <div className="section__backdrop" aria-hidden="true">
        <Mandala className="rsvp__mandala" />
        <KolamMotif className="rsvp__art rsvp__art--l" />
        <KolamMotif className="rsvp__art rsvp__art--r" />
        {STARS.map(([left, top, size, delay], i) => (
          <svg
            key={i}
            className="rsvp__star"
            viewBox="-10 -10 20 20"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, '--delay': `${delay}s` }}
          >
            <path d="M0-10C1-2 2-1 10 0 2 1 1 2 0 10-1 2-2 1-10 0-2-1-1-2 0-10Z" />
          </svg>
        ))}
      </div>

      <div className="section__inner">
        <SectionHeading id="rsvp-title" tone="dark" eyebrow={rsvp.eyebrow} title={rsvp.title} intro={rsvp.intro} />

        <Reveal className="rsvp__stage">
          <div className="rsvp__card" data-sent={sent}>
            <span className="rsvp__trace" aria-hidden="true" />
            <WaxSeal className="rsvp__seal" />

            {sent ? (
              <div className="rsvp__thanks" role="status">
                <span className="rsvp__burst" aria-hidden="true">
                  {BURST.map(({ kind, ...style }, i) => (
                    <span key={i} style={style}>
                      <Petal kind={kind} />
                    </span>
                  ))}
                </span>
                <Lotus className="rsvp__thanks-lotus" />
                <h3>Thank you, {form.name.trim().split(' ')[0]}!</h3>
                <p>
                  {attending
                    ? 'Your reply is ready in WhatsApp. Just press send. We can’t wait to celebrate with you.'
                    : 'Your reply is ready in WhatsApp. Just press send. You will be missed, and we are grateful for your blessings.'}
                </p>
                <button type="button" className="btn btn--ghost" onClick={() => setSent(false)}>
                  Edit response
                </button>
              </div>
            ) : (
              <form className="rsvp__form" onSubmit={onSubmit}>
                <div className="field" style={{ '--k': 0 }}>
                  <label htmlFor="rsvp-name">Your name</label>
                  <input id="rsvp-name" name="name" required autoComplete="name" value={form.name} onChange={update('name')} placeholder="Full name" />
                  <span className="field__line" aria-hidden="true" />
                </div>

                <div className="field" style={{ '--k': 1 }}>
                  <label htmlFor="rsvp-phone">Phone (optional)</label>
                  <input id="rsvp-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={update('phone')} placeholder="+91" />
                  <span className="field__line" aria-hidden="true" />
                </div>

                <fieldset className="field" style={{ '--k': 2 }}>
                  <legend>Will you attend?</legend>
                  <div className="segmented" data-value={form.attending}>
                    <span className="segmented__thumb" aria-hidden="true" />
                    {ATTENDING.map(([value, label]) => (
                      <label key={value} className="segmented__option">
                        <input type="radio" name="attending" value={value} checked={form.attending === value} onChange={update('attending')} />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Folds away when declining */}
                <div className="rsvp__more" data-open={attending} inert={attending ? undefined : ''} style={{ '--k': 3 }}>
                  <div className="rsvp__more-inner">
                    <div className="field">
                      <span className="field__label" id="rsvp-guests-label">
                        Number of guests
                      </span>
                      <div className="stepper" role="group" aria-labelledby="rsvp-guests-label">
                        <button type="button" className="stepper__btn" aria-label="Fewer guests" disabled={form.guests <= 1} onClick={() => setGuests(-1)}>
                          −
                        </button>
                        <output className="stepper__value" aria-live="polite">
                          <span key={form.guests} className="stepper__num">
                            {form.guests}
                          </span>
                          <small>{form.guests === 1 ? 'guest' : 'guests'}</small>
                        </output>
                        <button type="button" className="stepper__btn" aria-label="More guests" disabled={form.guests >= rsvp.maxGuests} onClick={() => setGuests(1)}>
                          +
                        </button>
                      </div>
                    </div>

                    <fieldset className="field field--choices">
                      <legend>Ceremonies you will attend</legend>
                      <div className="choices choices--chips">
                        {events.items.map((item) => (
                          <label key={item.name} className="choice choice--chip">
                            <input
                              type="checkbox"
                              name="events"
                              value={item.name}
                              checked={form.events.includes(item.name)}
                              onChange={() => toggleEvent(item.name)}
                            />
                            <span>
                              <Icon name="check" className="choice__check" />
                              {item.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div className="field" style={{ '--k': 4 }}>
                  <label htmlFor="rsvp-message">Blessings for the couple (optional)</label>
                  <textarea id="rsvp-message" name="message" rows="3" value={form.message} onChange={update('message')} placeholder="Write a few words…" />
                  <span className="field__line" aria-hidden="true" />
                </div>

                <div className="rsvp__submit" style={{ '--k': 5 }}>
                  <button type="submit" className="btn btn--maroon rsvp__send">
                    <span>Send via WhatsApp</span>
                    <ArrowIcon />
                  </button>
                  <p className="rsvp__hint">Your reply opens in WhatsApp so it reaches the family directly.</p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
