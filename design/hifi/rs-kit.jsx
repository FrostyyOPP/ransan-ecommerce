// RanSan hi-fi design tokens + shared primitives
const RS = {
  ink: '#0A0A0A',
  bg: '#F2EFE8',
  bg2: '#E8E4DA',
  paper: '#FFFFFF',
  muted: '#6B6B68',
  line: '#0A0A0A',
  acid: '#E8F249',     // yellow accent
  red: '#D92D1F',      // bleed red
  green: '#2F7D3E',
};

const RSFonts = {
  display: '"Archivo Black", Impact, sans-serif',
  mono: '"Space Mono", ui-monospace, monospace',
  body: '"Inter", system-ui, sans-serif',
};

// Product image placeholder — subtle striped SVG w/ mono label
const ProductImg = ({ label = 'PRODUCT SHOT', tone = 'dark', ratio = '3/4', style = {}, children }) => {
  const bg = tone === 'dark' ? '#1a1a1a' : tone === 'acid' ? RS.acid : tone === 'red' ? '#f6e3e1' : '#d9d6cd';
  const fg = tone === 'dark' ? '#555' : '#888';
  return (
    <div style={{
      aspectRatio: ratio,
      background: bg,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id={`stripe-${tone}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={fg} strokeWidth="1" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#stripe-${tone})`} />
      </svg>
      <div style={{
        position: 'absolute', bottom: 10, left: 10,
        fontFamily: RSFonts.mono, fontSize: 9, letterSpacing: '0.1em',
        color: tone === 'dark' ? '#999' : '#444',
        textTransform: 'uppercase',
      }}>[ {label} ]</div>
      {children}
    </div>
  );
};

// Marquee ticker
const Ticker = ({ items = ['FREE SHIP ₹2999+', 'NEW DROP FRIDAY', 'COD AVAILABLE', 'MADE IN INDIA'], bg = RS.ink, fg = RS.bg, speed = 40 }) => (
  <div style={{ background: bg, color: fg, overflow: 'hidden', borderTop: `1px solid ${RS.ink}`, borderBottom: `1px solid ${RS.ink}` }}>
    <div style={{
      display: 'inline-flex',
      whiteSpace: 'nowrap',
      animation: `ticker-scroll ${speed}s linear infinite`,
      padding: '10px 0',
    }}>
      {[...items, ...items, ...items, ...items].map((it, i) =>
        <span key={i} style={{ fontFamily: RSFonts.display, fontSize: 14, letterSpacing: '0.05em', padding: '0 24px' }}>
          {it} <span style={{ color: RS.acid, margin: '0 8px' }}>✱</span>
        </span>
      )}
    </div>
  </div>
);

// Logo
const Logo = ({ color = RS.ink, size = 28 }) => (
  <div style={{
    fontFamily: RSFonts.display,
    fontSize: size, color, letterSpacing: '-0.02em',
    lineHeight: 1, display: 'inline-flex', alignItems: 'baseline', gap: 2,
  }}>
    RANSAN<span style={{ color: RS.red, fontSize: size * 0.8 }}>®</span>
  </div>
);

// Top nav
const TopNav = ({ current = 'SHOP' }) => (
  <>
    <div style={{ background: RS.ink, color: RS.bg, padding: '6px 0', textAlign: 'center', fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.1em' }}>
      ★ DROP 04 LIVE — FREE SHIPPING ON ORDERS ₹2999+ ★
    </div>
    <header style={{
      display: 'grid', gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      padding: '18px 32px',
      borderBottom: `1px solid ${RS.ink}`,
      background: RS.bg,
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <nav style={{ display: 'flex', gap: 26, fontFamily: RSFonts.mono, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {['SHOP', 'NEW', 'SALE', 'LOOKBOOK', 'ABOUT'].map(n =>
          <a key={n} href="#" style={{
            color: RS.ink, textDecoration: 'none', fontWeight: 700,
            borderBottom: n === current ? `2px solid ${RS.ink}` : '2px solid transparent',
            paddingBottom: 2,
          }}>{n}</a>
        )}
      </nav>
      <Logo size={32} />
      <div style={{ display: 'flex', gap: 20, justifyContent: 'flex-end', fontFamily: RSFonts.mono, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em' }}>
        <span>SEARCH</span>
        <span>ACCOUNT</span>
        <span style={{ background: RS.ink, color: RS.bg, padding: '3px 8px' }}>BAG (3)</span>
      </div>
    </header>
  </>
);

// Footer
const Footer = () => (
  <footer style={{ background: RS.ink, color: RS.bg, padding: '60px 32px 24px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 40 }}>
      <div>
        <Logo color={RS.bg} size={44} />
        <div style={{ fontFamily: RSFonts.mono, fontSize: 11, marginTop: 16, lineHeight: 1.7, color: '#999', maxWidth: 280 }}>
          STREETWEAR FOR THE ONES WHO DON'T BLEND IN.<br/>MADE IN INDIA. SHIPPED WORLDWIDE.
        </div>
      </div>
      {[
        ['SHOP', ['New', 'Tees', 'Hoodies', 'Pants', 'Caps', 'Sale']],
        ['HELP', ['Contact', 'Shipping', 'Returns', 'Size Guide', 'FAQ']],
        ['BRAND', ['About', 'Lookbook', 'Stockists', 'Press', 'Careers']],
        ['SOCIAL', ['Instagram', 'TikTok', 'YouTube', 'Discord']],
      ].map(([h, items]) =>
        <div key={h}>
          <div style={{ fontFamily: RSFonts.display, fontSize: 14, letterSpacing: '0.1em', marginBottom: 14 }}>{h}</div>
          {items.map(i =>
            <div key={i} style={{ fontFamily: RSFonts.body, fontSize: 13, padding: '4px 0', color: '#ccc' }}>{i}</div>
          )}
        </div>
      )}
    </div>
    <div style={{
      borderTop: '1px solid #333', marginTop: 40, paddingTop: 16,
      display: 'flex', justifyContent: 'space-between',
      fontFamily: RSFonts.mono, fontSize: 10, color: '#666', letterSpacing: '0.1em',
    }}>
      <span>© 2026 RANSAN® ALL RIGHTS RESERVED</span>
      <span>PRIVACY · TERMS · COOKIES</span>
    </div>
  </footer>
);

// Swatch
const Swatch = ({ color, active, small }) => (
  <div style={{
    width: small ? 14 : 24, height: small ? 14 : 24,
    borderRadius: '50%',
    background: color,
    border: active ? `2px solid ${RS.ink}` : '1px solid #ccc',
    outline: active ? `1px solid ${RS.ink}` : 'none',
    outlineOffset: 2,
    cursor: 'pointer',
  }} />
);

// Product card
const ProductCard = ({ name = 'Oversized Box Tee', price = '₹1,999', was, tag, tone = 'neutral', colors = ['#0a0a0a', '#fff', '#6b6b68'] }) => (
  <div style={{ cursor: 'pointer' }}>
    <div style={{ position: 'relative' }}>
      <ProductImg label={name} tone={tone} ratio="3/4" />
      {tag && (
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: tag === 'NEW' ? RS.acid : tag === 'SALE' ? RS.red : RS.ink,
          color: tag === 'NEW' ? RS.ink : '#fff',
          fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.1em',
          padding: '3px 8px', fontWeight: 700,
        }}>{tag}</div>
      )}
    </div>
    <div style={{ padding: '10px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 10, color: RS.muted, letterSpacing: '0.1em' }}>RANSAN / TEES</div>
          <div style={{ fontFamily: RSFonts.body, fontSize: 14, fontWeight: 600, marginTop: 2 }}>{name}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: RSFonts.display, fontSize: 15 }}>{price}</div>
          {was && <div style={{ fontFamily: RSFonts.mono, fontSize: 10, color: RS.muted, textDecoration: 'line-through' }}>{was}</div>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        {colors.map((c, i) => <Swatch key={i} color={c} active={i === 0} small />)}
      </div>
    </div>
  </div>
);

// Big button
const BigBtn = ({ children, variant = 'primary', style = {}, ...rest }) => {
  const styles = variant === 'primary'
    ? { background: RS.ink, color: RS.bg }
    : variant === 'acid'
    ? { background: RS.acid, color: RS.ink }
    : { background: 'transparent', color: RS.ink, border: `1px solid ${RS.ink}` };
  return (
    <button {...rest} style={{
      ...styles,
      padding: '16px 24px',
      fontFamily: RSFonts.display,
      fontSize: 13, letterSpacing: '0.12em',
      textTransform: 'uppercase',
      border: variant === 'ghost' ? `1px solid ${RS.ink}` : 'none',
      cursor: 'pointer',
      ...style,
    }}>{children}</button>
  );
};

Object.assign(window, { RS, RSFonts, ProductImg, Ticker, Logo, TopNav, Footer, Swatch, ProductCard, BigBtn });
