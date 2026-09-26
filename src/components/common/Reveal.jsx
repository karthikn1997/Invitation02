import { useInView } from '../../hooks/useInView.js';

// Fades its content upward once it scrolls into view.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-inview={inView}
      style={{ '--d': `${delay}s`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
