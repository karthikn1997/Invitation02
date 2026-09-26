import CornerOrnament from '../ornaments/CornerOrnament.jsx';
import { ArrowIcon } from '../ornaments/icons.jsx';
import { wedding } from '../../data/wedding.js';

const CORNERS = ['tl', 'tr', 'bl', 'br'];

export default function InvitationCard() {
  return (
    <article className="invite">
      {CORNERS.map((pos) => (
        <CornerOrnament key={pos} className={`invite__corner invite__corner--${pos}`} />
      ))}

      <p className="invite__eyebrow" lang="ta">
        {wedding.invitationTa}
      </p>

      <h1 id="hero-title" className="invite__names">
        <span className="invite__name invite__name--bride">{wedding.bride}</span>
        <span className="invite__amp">&amp;</span>
        <span className="invite__name invite__name--groom">{wedding.groom}</span>
      </h1>

      <p className="invite__date">
        <time dateTime={wedding.date.iso}>{wedding.date.display}</time>
      </p>

      <a className="invite__cta" href={wedding.cta.href}>
        <ArrowIcon className="invite__cta-icon" />
        <span>{wedding.cta.label}</span>
      </a>
    </article>
  );
}
