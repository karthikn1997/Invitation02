import LotusDivider from '../ornaments/LotusDivider.jsx';
import Reveal from './Reveal.jsx';

// Eyebrow → lotus divider → title (optionally two lines, the second in
// italics) → intro. `tone="dark"` for maroon sections.
export default function SectionHeading({ id, eyebrow, title, intro, tone = 'light' }) {
  const [first, second] = Array.isArray(title) ? title : [title];
  return (
    <header className={`section-head section-head--${tone}`}>
      <Reveal as="p" className="section-head__eyebrow">
        <span className="section-head__eyebrow-line" aria-hidden="true" />
        {eyebrow}
        <span className="section-head__eyebrow-line section-head__eyebrow-line--end" aria-hidden="true" />
      </Reveal>
      <Reveal delay={0.12}>
        <LotusDivider className="section-head__divider" />
      </Reveal>
      <Reveal as="h2" id={id} delay={0.24} className="section-head__title">
        {second ? (
          <>
            <span>{first}</span> <em>{second}</em>
          </>
        ) : (
          <span>{first}</span>
        )}
      </Reveal>
      {intro && (
        <Reveal as="p" delay={0.36} className="section-head__intro">
          {intro}
        </Reveal>
      )}
    </header>
  );
}
