import { Lotus } from '../ornaments/LotusDivider.jsx';

// Shows the photo when `src` is set; otherwise an ivory placeholder frame.
export default function ImageSlot({ src, srcSet, sizes, alt = '', label = 'Photo coming soon', className = '' }) {
  return (
    <div className={`image-slot ${src ? '' : 'image-slot--empty'} ${className}`}>
      {src ? (
        <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} loading="lazy" decoding="async" />
      ) : (
        <div className="image-slot__placeholder" role="img" aria-label={alt ? `${alt} (photo coming soon)` : label}>
          <Lotus className="image-slot__icon" />
          <span className="image-slot__label" aria-hidden="true">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
