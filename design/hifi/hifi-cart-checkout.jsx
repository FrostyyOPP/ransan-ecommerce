// Cart + Checkout hi-fi
const HifiCart = () => (
  <div style={{ background: RS.bg, color: RS.ink, fontFamily: RSFonts.body }} data-screen-label="Cart">
    <TopNav current="" />
    <section style={{ padding: '40px 32px', borderBottom: `1px solid ${RS.ink}` }}>
      <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.2em', color: RS.muted }}>YOUR BAG</div>
      <h1 style={{ fontFamily: RSFonts.display, fontSize: 96, lineHeight: 0.9, margin: '8px 0 0', textTransform: 'uppercase' }}>3 Items<span style={{ color: RS.muted, fontSize: 24, marginLeft: 14 }}>/ ₹6,296</span></h1>
    </section>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px' }}>
      <div style={{ borderRight: `1px solid ${RS.ink}` }}>
        {[
          { n: 'Oversized Box Tee', v: 'Black / M', p: 1999, q: 1, tone: 'dark' },
          { n: 'Heavyweight Hoodie', v: 'Bone / L', p: 3499, q: 1, tone: 'neutral' },
          { n: 'Trucker Cap', v: 'Acid / One Size', p: 899, q: 1, tone: 'acid' },
        ].map((it, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: 24, padding: 28, borderBottom: `1px solid ${RS.ink}`, alignItems: 'start' }}>
            <ProductImg label={it.n} tone={it.tone} ratio="3/4" />
            <div>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.2em', color: RS.muted }}>RANSAN® / TEE-{String(i+1).padStart(3,'0')}</div>
              <div style={{ fontFamily: RSFonts.display, fontSize: 24, textTransform: 'uppercase', marginTop: 4 }}>{it.n}</div>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 12, color: RS.muted, marginTop: 4 }}>{it.v}</div>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 16 }}>
                <div style={{ display: 'flex', border: `1px solid ${RS.ink}` }}>
                  <div style={{ padding: '6px 12px', cursor: 'pointer' }}>−</div>
                  <div style={{ padding: '6px 14px', borderLeft: `1px solid ${RS.ink}`, borderRight: `1px solid ${RS.ink}`, fontFamily: RSFonts.display }}>{it.q}</div>
                  <div style={{ padding: '6px 12px', cursor: 'pointer' }}>+</div>
                </div>
                <span style={{ fontFamily: RSFonts.mono, fontSize: 11, textDecoration: 'underline', cursor: 'pointer' }}>MOVE TO WISHLIST</span>
                <span style={{ fontFamily: RSFonts.mono, fontSize: 11, textDecoration: 'underline', color: RS.red, cursor: 'pointer' }}>REMOVE</span>
              </div>
            </div>
            <div style={{ fontFamily: RSFonts.display, fontSize: 24 }}>₹{it.p.toLocaleString('en-IN')}</div>
          </div>
        ))}
      </div>
      <aside style={{ padding: 32 }}>
        <div style={{ fontFamily: RSFonts.display, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>Summary</div>
        {[['Subtotal', '₹6,397'], ['Shipping', 'FREE'], ['Tax (GST)', '₹320']].map(([l, v]) =>
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '10px 0', borderBottom: `1px dashed ${RS.ink}` }}>
            <span>{l}</span><span style={{ fontFamily: RSFonts.mono }}>{v}</span>
          </div>
        )}
        <div style={{ display: 'flex', gap: 6, marginTop: 18 }}>
          <input placeholder="PROMO CODE" style={{ flex: 1, border: `1px solid ${RS.ink}`, background: 'transparent', padding: '10px 12px', fontFamily: RSFonts.mono, fontSize: 12, letterSpacing: '0.1em', outline: 'none' }} />
          <BigBtn variant="ghost" style={{ padding: '10px 16px' }}>APPLY</BigBtn>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, padding: '16px 0', borderTop: `2px solid ${RS.ink}`, borderBottom: `2px solid ${RS.ink}` }}>
          <span style={{ fontFamily: RSFonts.display, fontSize: 24, textTransform: 'uppercase' }}>Total</span>
          <span style={{ fontFamily: RSFonts.display, fontSize: 28 }}>₹6,717</span>
        </div>
        <BigBtn variant="primary" style={{ width: '100%', marginTop: 16, padding: '18px' }}>CHECKOUT →</BigBtn>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 16, fontFamily: RSFonts.mono, fontSize: 10, color: RS.muted, letterSpacing: '0.1em' }}>
          <span>VISA</span>·<span>MC</span>·<span>UPI</span>·<span>GPay</span>·<span>COD</span>
        </div>
      </aside>
    </div>
    <Footer />
  </div>
);

const HifiCheckout = () => (
  <div style={{ background: RS.bg, color: RS.ink, fontFamily: RSFonts.body, minHeight: '100vh' }} data-screen-label="Checkout">
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px', borderBottom: `1px solid ${RS.ink}` }}>
      <Logo size={28} />
      <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.15em' }}>🔒 SECURE CHECKOUT</div>
      <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.1em' }}>← BACK TO BAG</div>
    </header>

    {/* STEPPER */}
    <div style={{ display: 'flex', borderBottom: `1px solid ${RS.ink}` }}>
      {[['01', 'SHIPPING', true], ['02', 'PAYMENT'], ['03', 'REVIEW']].map(([n, l, a], i) => (
        <div key={l} style={{
          flex: 1, padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 16,
          borderRight: i < 2 ? `1px solid ${RS.ink}` : 'none',
          background: a ? RS.ink : 'transparent', color: a ? RS.bg : RS.ink,
        }}>
          <div style={{ fontFamily: RSFonts.display, fontSize: 40, lineHeight: 1 }}>{n}</div>
          <div>
            <div style={{ fontFamily: RSFonts.mono, fontSize: 10, letterSpacing: '0.15em', opacity: 0.6 }}>STEP</div>
            <div style={{ fontFamily: RSFonts.display, fontSize: 16, letterSpacing: '0.05em' }}>{l}</div>
          </div>
        </div>
      ))}
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px' }}>
      <main style={{ padding: 40, borderRight: `1px solid ${RS.ink}` }}>
        <h2 style={{ fontFamily: RSFonts.display, fontSize: 40, lineHeight: 1, margin: 0, textTransform: 'uppercase' }}>Ship To.</h2>

        {/* CONTACT */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.15em', marginBottom: 10 }}>CONTACT</div>
          <input placeholder="Email address" style={{ width: '100%', border: `1px solid ${RS.ink}`, padding: '14px 16px', fontFamily: RSFonts.body, fontSize: 14, background: 'transparent', outline: 'none', boxSizing: 'border-box' }} />
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 12 }}>
            <input type="checkbox" defaultChecked /> Send me drop updates &amp; exclusive codes
          </label>
        </div>

        {/* ADDRESS */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.15em', marginBottom: 10 }}>ADDRESS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {['First name', 'Last name'].map(p =>
              <input key={p} placeholder={p} style={{ border: `1px solid ${RS.ink}`, padding: '14px 16px', fontFamily: RSFonts.body, fontSize: 14, background: 'transparent', outline: 'none' }} />
            )}
          </div>
          <input placeholder="Street address" style={{ width: '100%', border: `1px solid ${RS.ink}`, padding: '14px 16px', fontFamily: RSFonts.body, fontSize: 14, background: 'transparent', outline: 'none', boxSizing: 'border-box', marginTop: 10 }} />
          <input placeholder="Apartment, suite (optional)" style={{ width: '100%', border: `1px solid ${RS.ink}`, padding: '14px 16px', fontFamily: RSFonts.body, fontSize: 14, background: 'transparent', outline: 'none', boxSizing: 'border-box', marginTop: 10 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 10, marginTop: 10 }}>
            <input placeholder="City" style={{ border: `1px solid ${RS.ink}`, padding: '14px 16px', fontFamily: RSFonts.body, fontSize: 14, background: 'transparent', outline: 'none' }} />
            <input placeholder="State" style={{ border: `1px solid ${RS.ink}`, padding: '14px 16px', fontFamily: RSFonts.body, fontSize: 14, background: 'transparent', outline: 'none' }} />
            <input placeholder="PIN" style={{ border: `1px solid ${RS.ink}`, padding: '14px 16px', fontFamily: RSFonts.body, fontSize: 14, background: 'transparent', outline: 'none' }} />
          </div>
        </div>

        {/* METHOD */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontFamily: RSFonts.mono, fontSize: 11, letterSpacing: '0.15em', marginBottom: 10 }}>SHIPPING METHOD</div>
          {[
            ['STANDARD', '3–5 business days', 'FREE', true],
            ['EXPRESS', '1–2 business days', '₹199', false],
            ['SAME DAY (Metro only)', 'Order before 2PM', '₹399', false],
          ].map(([t, d, p, a]) => (
            <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, border: `1px solid ${RS.ink}`, marginTop: 8, cursor: 'pointer', background: a ? RS.bg2 : 'transparent' }}>
              <div style={{ width: 16, height: 16, border: `1.5px solid ${RS.ink}`, borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
                {a && <div style={{ width: 8, height: 8, background: RS.ink, borderRadius: '50%' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: RSFonts.display, fontSize: 14, letterSpacing: '0.05em' }}>{t}</div>
                <div style={{ fontFamily: RSFonts.mono, fontSize: 11, color: RS.muted }}>{d}</div>
              </div>
              <div style={{ fontFamily: RSFonts.display, fontSize: 16 }}>{p}</div>
            </label>
          ))}
        </div>

        <BigBtn variant="primary" style={{ marginTop: 32, width: '100%', padding: '20px' }}>CONTINUE TO PAYMENT →</BigBtn>
      </main>

      <aside style={{ padding: 32, background: RS.bg2 }}>
        <div style={{ fontFamily: RSFonts.display, fontSize: 20, textTransform: 'uppercase', marginBottom: 16 }}>Order</div>
        {[
          { n: 'Oversized Box Tee', v: 'Black · M', q: 1, p: 1999, tone: 'dark' },
          { n: 'Heavyweight Hoodie', v: 'Bone · L', q: 1, p: 3499, tone: 'neutral' },
          { n: 'Trucker Cap', v: 'Acid · OS', q: 1, p: 899, tone: 'acid' },
        ].map((it, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto', gap: 12, alignItems: 'center', padding: '10px 0', borderBottom: `1px dashed ${RS.ink}` }}>
            <div style={{ position: 'relative' }}>
              <ProductImg label="" tone={it.tone} ratio="1/1" />
              <div style={{ position: 'absolute', top: -6, right: -6, background: RS.ink, color: RS.bg, width: 20, height: 20, borderRadius: '50%', fontSize: 11, display: 'grid', placeItems: 'center', fontFamily: RSFonts.mono }}>{it.q}</div>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{it.n}</div>
              <div style={{ fontFamily: RSFonts.mono, fontSize: 10, color: RS.muted, letterSpacing: '0.1em' }}>{it.v}</div>
            </div>
            <div style={{ fontFamily: RSFonts.display, fontSize: 14 }}>₹{it.p.toLocaleString('en-IN')}</div>
          </div>
        ))}
        <div style={{ marginTop: 20, fontFamily: RSFonts.mono, fontSize: 12 }}>
          {[['SUBTOTAL', '₹6,397'], ['SHIPPING', 'FREE'], ['TAX', '₹320']].map(([l, v]) =>
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span style={{ letterSpacing: '0.1em' }}>{l}</span><span>{v}</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: `2px solid ${RS.ink}`, marginTop: 10, fontFamily: RSFonts.display, fontSize: 26, textTransform: 'uppercase' }}>
          <span>Total</span><span>₹6,717</span>
        </div>
      </aside>
    </div>
  </div>
);

window.HifiCart = HifiCart;
window.HifiCheckout = HifiCheckout;
