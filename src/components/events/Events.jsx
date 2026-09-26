import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import { GopuramLineArt, KolamMotif } from '../ornaments/LineArt.jsx';
import { Icon } from '../ornaments/icons.jsx';
import { useInView } from '../../hooks/useInView.js';
import { events, venue, wedding } from '../../data/wedding.js';
import './Events.css';

const toCalendarStamp = (iso) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

function calendarUrl(item) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${item.name} · ${wedding.names}`,
    dates: `${toCalendarStamp(item.start)}/${toCalendarStamp(item.end)}`,
    details: item.text,
    location: `${venue.name}, ${venue.city}`,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// Group consecutive ceremonies by date for the "Day One / Day Two" timeline.
const DAY_NAMES = ['One', 'Two', 'Three', 'Four'];
const DAYS = events.items.reduce((days, item, index) => {
  const date = item.dateLabel.split(' · ')[1] ?? item.dateLabel;
  const last = days[days.length - 1];
  if (last && last.date === date) last.end = index;
  else days.push({ date, start: index, end: index });
  return days;
}, []);

// Thoranam: mango leaves with a marigold ball at every fourth position.
const THORANAM = Array.from({ length: 17 }, (_, i) => {
  const x = (i + 0.5) / 17;
  return {
    kind: i % 4 === 2 ? 'marigold' : 'leaf',
    x: `${(x * 100).toFixed(2)}%`,
    y: `${(4 + 22 * 4 * x * (1 - x)).toFixed(1)}px`, // follows the string's sag
    order: Math.abs(i - 8), // drop in from the centre outward
    sway: (i % 3) * -1.3,
  };
});

// Soft lamp-light bokeh drifting in the background.
const BOKEH = [
  [8, 24, 90, 0], [22, 70, 60, -6], [38, 38, 120, -12], [61, 18, 70, -3],
  [74, 62, 110, -9], [90, 32, 80, -15], [52, 84, 90, -5], [14, 90, 70, -11],
].map(([x, y, size, delay]) => ({ '--x': `${x}%`, '--y': `${y}%`, '--size': `${size}px`, '--delay': `${delay}s` }));

function ThoranamPiece({ kind }) {
  if (kind === 'marigold') {
    return (
      <svg viewBox="0 0 20 34" aria-hidden="true">
        <path d="M10 0v10" stroke="#c9a25e" strokeWidth="1" />
        <circle cx="10" cy="19" r="8.5" fill="#d98a2b" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <circle key={a} cx="10" cy="12.4" r="2.6" fill="#e9a743" transform={`rotate(${a} 10 19)`} />
        ))}
        <circle cx="10" cy="19" r="3" fill="#b8661c" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 48" aria-hidden="true">
      <path d="M10 0v7" stroke="#c9a25e" strokeWidth="1" />
      <path d="M10 6c9 8 8.5 26 0 40C1.5 32 1 14 10 6Z" fill="#6f7f45" />
      <path d="M10 6c9 8 8.5 26 0 40" fill="#86955a" opacity="0.6" />
      <path d="M10 9v34" stroke="#c7cf9c" strokeWidth="0.6" opacity="0.7" />
    </svg>
  );
}

export default function Events() {
  const [sectionRef, active] = useInView({ threshold: 0, rootMargin: '0px', once: false });
  const [revealRef, revealed] = useInView({ threshold: 0.1 });
  const [listRef, listIn] = useInView({ threshold: 0.2 });

  return (
    <section
      id="events"
      ref={sectionRef}
      className="section section--maroon events"
      data-active={active}
      aria-labelledby="events-title"
    >
      <div ref={revealRef} className="section__backdrop" data-revealed={revealed} aria-hidden="true">
        {BOKEH.map((style, i) => (
          <span key={`b${i}`} className="events__bokeh" style={style} />
        ))}
        <KolamMotif className="events__art events__art--kolam-l" />
        <KolamMotif className="events__art events__art--kolam-r" />
        <GopuramLineArt className="events__art events__art--gopuram" />

        <div className="thoranam">
          <svg className="thoranam__string" viewBox="0 0 1000 40" preserveAspectRatio="none">
            <path d="M0 4Q500 48 1000 4" />
          </svg>
          {THORANAM.map((piece, i) => (
            <span
              key={i}
              className={`thoranam__piece thoranam__piece--${piece.kind}`}
              style={{ '--x': piece.x, '--y': piece.y, '--order': piece.order, '--sway': `${piece.sway}s` }}
            >
              <ThoranamPiece kind={piece.kind} />
            </span>
          ))}
        </div>
      </div>

      <div className="section__inner">
        <SectionHeading id="events-title" tone="dark" eyebrow={events.eyebrow} title={events.title} intro={events.intro} />

        <div ref={listRef} className="events__stage" data-inview={listIn}>
          <div className="events__timeline" aria-hidden="true">
            <span className="events__timeline-line" />
            <span className="events__timeline-spark" />
            {events.items.map((item, i) => (
              <span key={item.name} className="events__node" style={{ '--i': i }} />
            ))}
            {DAYS.map((day, n) => (
              <span
                key={day.date}
                className="events__day"
                style={{ '--from': day.start, '--to': day.end }}
              >
                Day {DAY_NAMES[n] ?? n + 1} <em>· {day.date}</em>
              </span>
            ))}
          </div>

          <ol className="events__list">
            {events.items.map((item, index) => (
              <Reveal
                as="li"
                key={item.name}
                delay={0.16 * index}
                className={`event-card${item.featured ? ' event-card--featured' : ''}`}
              >
                <span className="event-card__aura" aria-hidden="true" />
                {item.featured && (
                  <span className="event-card__embers" aria-hidden="true">
                    {[12, 30, 48, 64, 80, 92].map((left, i) => (
                      <span key={left} style={{ '--left': `${left}%`, '--delay': `${-i * 0.9}s` }} />
                    ))}
                  </span>
                )}
                {item.featured && <p className="event-card__badge">The Wedding</p>}
                <span className="event-card__icon" aria-hidden="true">
                  <svg className="event-card__ring" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="29" pathLength="1" />
                  </svg>
                  <Icon name={item.icon} />
                </span>
                <p className="event-card__ta" lang="ta">
                  {item.nameTa}
                </p>
                <h3 className="event-card__name">{item.name}</h3>
                <p className="event-card__text">{item.text}</p>
                <span className="event-card__rule" aria-hidden="true" />
                <p className="event-card__date">
                  <time dateTime={item.start}>
                    {item.dateLabel.split(' · ').map((part) => (
                      <span key={part}>{part}</span>
                    ))}
                  </time>
                </p>
                <p className="event-card__time">{item.timeLabel}</p>
                <p className="event-card__venue">{venue.name}</p>
                <a className="event-card__calendar" href={calendarUrl(item)} target="_blank" rel="noopener noreferrer">
                  <Icon name="calendar" />
                  Add to calendar
                  <span className="visually-hidden">: {item.name} (opens Google Calendar)</span>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
