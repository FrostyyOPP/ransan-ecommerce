export default function BigBtn({ variant = 'primary', className = '', ...rest }) {
  const base = 'font-display uppercase tracking-wider2 text-[12px] px-5 py-3 border border-ink inline-flex items-center justify-center transition';
  const map = {
    primary: 'bg-ink text-bone hover:bg-bleed',
    acid: 'bg-acid text-ink hover:bg-ink hover:text-acid',
    ghost: 'bg-transparent text-ink hover:bg-ink hover:text-bone',
    bleed: 'bg-bleed text-bone hover:bg-ink',
  };
  return <button className={`${base} ${map[variant] || map.primary} ${className}`} {...rest} />;
}
