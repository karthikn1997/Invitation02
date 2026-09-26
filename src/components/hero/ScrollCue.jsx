export default function ScrollCue({ href }) {
  return (
    <a className="scroll-cue" href={href} aria-label="Scroll to the celebration details">
      <span className="scroll-cue__label" aria-hidden="true">Scroll</span>
      <span className="scroll-cue__line" aria-hidden="true" />
    </a>
  );
}
