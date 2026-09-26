// Art-directed photography followed by colour-grade layers. The portrait
// crop is used only on phone-shaped screens; everything wider uses the
// landscape crop so the couple always stays full-length below the card.
const LANDSCAPE = '(min-aspect-ratio: 2/3)';
const img = (name, widths, ext) => widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ');

export default function HeroBackground() {
  return (
    <div className="hero-bg">
      <div className="hero-bg__frame">
        <picture>
          <source media={LANDSCAPE} type="image/webp" srcSet={img('hero-desktop', [1200, 1672], 'webp')} sizes="100vw" />
          <source media={LANDSCAPE} type="image/jpeg" srcSet={img('hero-desktop', [1200, 1672], 'jpg')} sizes="100vw" />
          <source type="image/webp" srcSet={img('hero-mobile', [480, 800], 'webp')} sizes="100vw" />
          <img
            className="hero-bg__img"
            src="/images/hero-mobile-800.jpg"
            srcSet={img('hero-mobile', [480, 800], 'jpg')}
            sizes="100vw"
            alt="A bride in a red silk saree and a groom in a white veshti walk hand in hand up lamp-lit steps toward a temple gopuram at sunrise."
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div className="hero-bg__wash" aria-hidden="true" />
      <div className="hero-bg__sun" aria-hidden="true" />
      <div className="hero-bg__lamps" aria-hidden="true" />
      <div className="hero-bg__vignette" aria-hidden="true" />
    </div>
  );
}
