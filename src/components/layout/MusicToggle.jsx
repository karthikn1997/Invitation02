import { useEffect, useRef, useState } from 'react';
import { MusicNoteIcon } from '../ornaments/icons.jsx';
import './MusicToggle.css';

// Fired by the intro screen from inside the "Open Invitation" click, which
// counts as a user gesture, so browsers allow playback to start.
export const OPEN_EVENT = 'invitation:open';

export default function MusicToggle({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      audio.volume = 0.6;
      await audio.play();
      setPlaying(true);
    } catch {
      // Missing file or playback blocked: stay paused.
      setPlaying(false);
    }
  };

  useEffect(() => {
    window.addEventListener(OPEN_EVENT, play);
    return () => window.removeEventListener(OPEN_EVENT, play);
  }, []);

  const toggle = () => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      play();
    }
  };

  return (
    <div className="music">
      <audio ref={audioRef} src={src} preload="none" loop />
      <button
        type="button"
        className="music__button"
        data-playing={playing}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
        onClick={toggle}
      >
        {playing ? (
          <span className="music__bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        ) : (
          <MusicNoteIcon className="music__icon" />
        )}
      </button>
    </div>
  );
}
