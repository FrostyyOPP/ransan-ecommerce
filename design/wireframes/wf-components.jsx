// Wireframe building blocks — sketchy, hand-drawn streetwear lo-fi vibe
// Uses Caveat (handwritten) + Kalam for body + bold strokes

const wfColors = {
  ink: '#1a1a1a',
  pencil: '#2a2a2a',
  paper: '#fafaf5',
  muted: '#888',
  highlight: '#ffe94d',
  red: '#e63946',
};

const wfStyles = {
  font: '"Kalam", "Caveat", cursive',
  display: '"Caveat", cursive',
};

// Box with sketchy border
const WBox = ({ children, style = {}, dashed = false, filled = false, ...rest }) => (
  <div style={{
    border: `2px solid ${wfColors.ink}`,
    borderStyle: dashed ? 'dashed' : 'solid',
    background: filled ? wfColors.ink : 'transparent',
    color: filled ? wfColors.paper : wfColors.ink,
    padding: 8,
    borderRadius: 2,
    fontFamily: wfStyles.font,
    ...style,
  }} {...rest}>{children}</div>
);

// Hand-drawn scribble image placeholder (diagonal lines via bg)
const WImg = ({ label = 'IMG', style = {}, aspect = '1 / 1' }) => (
  <div style={{
    aspectRatio: aspect,
    border: `2px solid ${wfColors.ink}`,
    background: `repeating-linear-gradient(135deg, transparent 0, transparent 8px, rgba(0,0,0,0.08) 8px, rgba(0,0,0,0.08) 9px)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: wfStyles.display,
    fontSize: 16,
    color: wfColors.muted,
    position: 'relative',
    ...style,
  }}>
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <line x1="0" y1="0" x2="100%" y2="100%" stroke={wfColors.ink} strokeWidth="1" opacity="0.3" />
      <line x1="100%" y1="0" x2="0" y2="100%" stroke={wfColors.ink} strokeWidth="1" opacity="0.3" />
    </svg>
    <span style={{ position: 'relative', background: wfColors.paper, padding: '2px 8px' }}>{label}</span>
  </div>
);

// Zigzag text line placeholder (lorem lines)
const WLines = ({ count = 3, width = '100%', style = {} }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width, ...style }}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} style={{
        height: 2,
        background: wfColors.ink,
        width: `${100 - i * 10}%`,
        opacity: 0.6,
      }} />
    ))}
  </div>
);

// A single text line (like a heading stroke)
const WLine = ({ w = '60%', h = 4, style = {} }) => (
  <div style={{ height: h, width: w, background: wfColors.ink, ...style }} />
);

// Handwritten label
const WLabel = ({ children, size = 16, style = {} }) => (
  <span style={{ fontFamily: wfStyles.display, fontSize: size, ...style }}>{children}</span>
);

// Button sketch
const WBtn = ({ children, filled = false, style = {} }) => (
  <div style={{
    border: `2px solid ${wfColors.ink}`,
    background: filled ? wfColors.ink : 'transparent',
    color: filled ? wfColors.paper : wfColors.ink,
    padding: '6px 14px',
    fontFamily: wfStyles.display,
    fontSize: 15,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 2,
    ...style,
  }}>{children}</div>
);

// Wireframe frame wrapper — browser-ish chrome
const WFrame = ({ children, label, width = 1100, style = {} }) => (
  <div style={{
    width,
    background: wfColors.paper,
    border: `2.5px solid ${wfColors.ink}`,
    fontFamily: wfStyles.font,
    color: wfColors.ink,
    position: 'relative',
    ...style,
  }}>
    {/* browser bar */}
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 12px',
      borderBottom: `2px solid ${wfColors.ink}`,
      fontSize: 12,
      fontFamily: '"Kalam", cursive',
    }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', border: `1.5px solid ${wfColors.ink}` }} />
      <div style={{ width: 10, height: 10, borderRadius: '50%', border: `1.5px solid ${wfColors.ink}` }} />
      <div style={{ width: 10, height: 10, borderRadius: '50%', border: `1.5px solid ${wfColors.ink}` }} />
      <div style={{
        marginLeft: 16, flex: 1, padding: '3px 10px',
        border: `1.5px solid ${wfColors.ink}`,
        fontFamily: '"Kalam", cursive',
        fontSize: 12,
      }}>ransan.com{label ? ` / ${label}` : ''}</div>
    </div>
    {children}
  </div>
);

// Common navbar wireframe row
const WNav = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 24px',
    borderBottom: `2px solid ${wfColors.ink}`,
  }}>
    <div style={{ fontFamily: wfStyles.display, fontSize: 26, fontWeight: 700 }}>RanSan</div>
    <div style={{ display: 'flex', gap: 18, fontSize: 14 }}>
      <span>SHOP</span><span>NEW</span><span>SALE</span><span>ABOUT</span>
    </div>
    <div style={{ display: 'flex', gap: 12, fontSize: 14 }}>
      <span>🔍</span><span>👤</span><span>🛒 [2]</span>
    </div>
  </div>
);

Object.assign(window, { wfColors, wfStyles, WBox, WImg, WLines, WLine, WLabel, WBtn, WFrame, WNav });
