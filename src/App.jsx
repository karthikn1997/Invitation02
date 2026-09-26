import { useState } from 'react';
import Intro from './components/intro/Intro.jsx';
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
  const [showIntro, setShowIntro] = useState(true);

  // The doors always greet the guest; a deep link (e.g. /#rsvp) then
  // continues on to its section once they have opened.
  const finishIntro = () => {
    setShowIntro(false);
    const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (target && window.location.hash !== '#top') target.scrollIntoView();
  };

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
      {showIntro && <Intro onDone={finishIntro} />}
    </>
  );
}
