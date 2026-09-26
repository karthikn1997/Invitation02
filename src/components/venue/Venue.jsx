import SectionHeading from '../common/SectionHeading.jsx';
import Reveal from '../common/Reveal.jsx';
import ImageSlot from '../common/ImageSlot.jsx';
import CornerOrnament from '../ornaments/CornerOrnament.jsx';
import Diya from '../ornaments/Diya.jsx';
import { KolamMotif, LotusLineArt, TempleBell } from '../ornaments/LineArt.jsx';
import { ArrowIcon, Icon } from '../ornaments/icons.jsx';
import { useInView } from '../../hooks/useInView.js';
import { venue, wedding } from '../../data/wedding.js';
import './Venue.css';

const query = encodeURIComponent(venue.mapQuery);
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
const embedUrl = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;

const CORNERS = ['tl', 'tr', 'bl', 'br'];

function Compass({ className }) {
  return (
    <svg className={className} viewBox="-30 -30 60 60" aria-hidden="true">
      <circle r="27" className="compass__face" />
      <circle r="23" className="compass__ring" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path key={a} d={a % 90 === 0 ? 'M0-23v4' : 'M0-23v2.5'} transform={`rotate(${a})`} className="compass__tick" />
      ))}
      <text y="-12" className="compass__n">
        N
      </text>
      <g className="compass__needle">
        <path d="M0-17 3.2 0H-3.2Z" className="compass__north" />
        <path d="M0 17 3.2 0H-3.2Z" className="compass__south" />
        <circle r="2" className="compass__pin" />
      </g>
    </svg>
  );
}

export default function Venue() {
  const [sectionRef, active] = useInView({ threshold: 0, rootMargin: '0px', once: false });
  const [infoRef, infoIn] = useInView({ threshold: 0.3 });

  return (
    <section
      id="venue"
      ref={sectionRef}
      className="section section--paper-deep venue"
      data-active={active}
      aria-labelledby="venue-title"
    >
      <div className="section__backdrop" aria-hidden="true">
        <svg className="venue__route" viewBox="0 0 1000 1400" preserveAspectRatio="xMidYMid slice">
          <path d="M60 0C220 170 20 330 190 470S460 640 330 820 110 1040 380 1150 780 1180 950 1400" />
        </svg>
        <LotusLineArt className="venue__art" />
      </div>

      <div className="section__inner">
        <SectionHeading id="venue-title" eyebrow="The Venue" title={['Where We', 'Celebrate']} />

        <div className="venue__grid">
          <Reveal className="venue__figure">
            <span className="venue__bell venue__bell--l" aria-hidden="true">
              <TempleBell />
            </span>
            <span className="venue__bell venue__bell--r" aria-hidden="true">
              <TempleBell />
            </span>

            <div className="venue__arch">
              <div className="venue__doorway">
                <ImageSlot src={venue.photo.src} alt={venue.photo.alt} label="Venue photo" className="venue__photo" />
                <span className="venue__door venue__door--l" aria-hidden="true" />
                <span className="venue__door venue__door--r" aria-hidden="true" />
              </div>
            </div>

            <Diya className="venue__diya venue__diya--l" id="diya-flame-l" />
            <Diya className="venue__diya venue__diya--r" id="diya-flame-r" />
            <KolamMotif className="venue__kolam" />
          </Reveal>

          <div ref={infoRef} className="venue__info" data-inview={infoIn}>
            <h3 className="venue__name">{venue.name}</h3>
            <address className="venue__address">
              {venue.address.map((line, i) => (
                <span key={line} style={{ '--i': i }}>
                  {line}
                </span>
              ))}
            </address>

            <ul className="venue__facts">
              {[{ icon: 'calendar', text: wedding.date.display }, ...venue.notes].map((fact, i) => (
                <li key={fact.text} style={{ '--i': i }}>
                  <span className="venue__fact-icon" aria-hidden="true">
                    <Icon name={fact.icon} />
                  </span>
                  <span>{fact.text}</span>
                </li>
              ))}
            </ul>

            <div className="venue__actions">
              <a className="btn btn--maroon venue__directions" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <span>Get Directions</span>
                <ArrowIcon />
              </a>
              <a className="btn btn--ghost venue__call" href={`tel:${venue.phone.replace(/\s/g, '')}`}>
                <Icon name="phone" />
                <span>Call Venue</span>
              </a>
            </div>
          </div>
        </div>

        <Reveal className="venue__map">
          {CORNERS.map((pos) => (
            <CornerOrnament key={pos} className={`venue__corner venue__corner--${pos}`} />
          ))}
          <div className="venue__map-clip">
            <iframe
              title={`Map showing ${venue.name}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <span className="venue__radar" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </div>
          <Compass className="venue__compass" />
        </Reveal>
      </div>
    </section>
  );
}
