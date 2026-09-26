import SiteHeader from './components/layout/SiteHeader.jsx';
import MusicToggle from './components/layout/MusicToggle.jsx';
import Hero from './components/hero/Hero.jsx';
import Welcome from './components/welcome/Welcome.jsx';
import OurStory from './components/story/OurStory.jsx';
import Events from './components/events/Events.jsx';
import Family from './components/family/Family.jsx';
import Venue from './components/venue/Venue.jsx';
import Rsvp from './components/rsvp/Rsvp.jsx';
import Footer from './components/footer/Footer.jsx';
import { wedding } from './data/wedding.js';

export default function App() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <OurStory />
        <Welcome />
        <Events />
        <Family />
        <Venue />
        <Rsvp />
      </main>
      <Footer />
      <MusicToggle src={wedding.music.src} />
    </>
  );
}
