import HeroBackground from './HeroBackground.jsx';
import Petals from './Petals.jsx';
import InvitationCard from './InvitationCard.jsx';
import ScrollCue from './ScrollCue.jsx';
import { wedding } from '../../data/wedding.js';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroBackground />
      <Petals />

      <div className="hero__content">
        <InvitationCard />
      </div>

      <ScrollCue href={wedding.cta.href} />
    </section>
  );
}
