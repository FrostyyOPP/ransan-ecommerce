// Home / Landing wireframe
const WireframeHome = () => (
  <WFrame label="home" width={1100}>
    <WNav />

    {/* HERO */}
    <div style={{ borderBottom: `2px solid ${wfColors.ink}`, position: 'relative' }}>
      <WImg label="HERO IMAGE — big model shot" aspect="21/9" style={{ border: 'none' }} />
      <div style={{
        position: 'absolute', left: 30, bottom: 40,
        background: wfColors.paper, padding: '12px 18px',
        border: `2px solid ${wfColors.ink}`,
      }}>
        <WLabel size={38}>DROP 04 — LIVE</WLabel>
        <div style={{ marginTop: 6, fontSize: 13 }}>Big bold headline goes here</div>
        <WBtn filled style={{ marginTop: 8 }}>SHOP NOW →</WBtn>
      </div>
      <div style={{
        position: 'absolute', top: 20, right: 20,
        fontFamily: wfStyles.display, fontSize: 14,
        background: wfColors.highlight, padding: '4px 10px',
        border: `2px solid ${wfColors.ink}`,
      }}>★ NEW DROP</div>
    </div>

    {/* TICKER */}
    <div style={{
      padding: '10px 24px',
      borderBottom: `2px solid ${wfColors.ink}`,
      display: 'flex', gap: 30, fontSize: 14,
      fontFamily: wfStyles.display,
      background: wfColors.ink, color: wfColors.paper,
    }}>
      <span>✱ FREE SHIP OVER ₹2999</span>
      <span>✱ COD AVAILABLE</span>
      <span>✱ NEW DROP EVERY FRIDAY</span>
      <span>✱ 100% COTTON</span>
    </div>

    {/* CATEGORIES */}
    <div style={{ padding: 24, borderBottom: `2px solid ${wfColors.ink}` }}>
      <WLabel size={24}>01 / SHOP BY CATEGORY</WLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 12 }}>
        {['TEES', 'HOODIES', 'PANTS', 'CAPS'].map(c => (
          <div key={c}>
            <WImg label={c} aspect="4/5" />
            <div style={{ marginTop: 6, fontFamily: wfStyles.display, fontSize: 18 }}>{c} →</div>
          </div>
        ))}
      </div>
    </div>

    {/* FEATURED PRODUCTS */}
    <div style={{ padding: 24, borderBottom: `2px solid ${wfColors.ink}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <WLabel size={24}>02 / NEW THIS WEEK</WLabel>
        <span style={{ fontSize: 13 }}>VIEW ALL →</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 12 }}>
        {[1,2,3,4].map(i => (
          <div key={i}>
            <WImg label={`PRODUCT ${i}`} aspect="3/4" />
            <div style={{ marginTop: 6, fontSize: 13 }}>Product Name</div>
            <div style={{ fontFamily: wfStyles.display, fontSize: 16 }}>₹ 1,999</div>
          </div>
        ))}
      </div>
    </div>

    {/* LOOKBOOK / EDITORIAL */}
    <div style={{ padding: 24, borderBottom: `2px solid ${wfColors.ink}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <WImg label="LOOKBOOK BIG" aspect="4/5" />
      <div>
        <WLabel size={28}>03 / THE FIT</WLabel>
        <div style={{ marginTop: 8, fontSize: 13 }}>Editorial story / lookbook copy</div>
        <WLines count={4} style={{ marginTop: 12 }} />
        <WBtn style={{ marginTop: 14 }}>READ THE STORY</WBtn>
      </div>
    </div>

    {/* NEWSLETTER */}
    <div style={{ padding: 24, background: wfColors.highlight, borderBottom: `2px solid ${wfColors.ink}` }}>
      <WLabel size={26}>JOIN THE GANG</WLabel>
      <div style={{ fontSize: 13, marginBottom: 8 }}>Early access, drops, discounts</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <WBox style={{ flex: 1, background: wfColors.paper }}>your@email.com</WBox>
        <WBtn filled>SUBSCRIBE</WBtn>
      </div>
    </div>

    {/* FOOTER */}
    <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, fontSize: 12 }}>
      <div>
        <WLabel size={22}>RanSan</WLabel>
        <WLines count={3} />
      </div>
      <div><b>SHOP</b><WLines count={4} /></div>
      <div><b>HELP</b><WLines count={4} /></div>
      <div><b>SOCIAL</b><WLines count={3} /></div>
    </div>
  </WFrame>
);

window.WireframeHome = WireframeHome;
