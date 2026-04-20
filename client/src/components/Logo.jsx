export default function Logo({ className = '', size = 22 }) {
  return (
    <span
      className={`font-display uppercase tracking-tightish ${className}`}
      style={{ fontSize: size, lineHeight: 1 }}
    >
      RANSAN<sup style={{ fontSize: '0.5em', verticalAlign: 'super' }}>®</sup>
    </span>
  );
}
