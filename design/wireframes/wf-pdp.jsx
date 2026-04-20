// PDP wireframe
const WireframePDP = () => (
  <WFrame label="product/oversized-tee" width={1100}>
    <WNav />

    <div style={{ padding: '10px 24px', fontSize: 12, borderBottom: `1px dashed ${wfColors.ink}` }}>
      HOME / SHOP / TEES / <b>OVERSIZED BOX TEE</b>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
      {/* GALLERY */}
      <div style={{ padding: 20, borderRight: `2px solid ${wfColors.ink}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr', gap: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[1,2,3,4].map(i => <WImg key={i} label={`${i}`} aspect="1/1" />)}
          </div>
          <WImg label="MAIN IMAGE — zoomable" aspect="3/4" />
        </div>
      </div>

      {/* INFO */}
      <div style={{ padding: 24 }}>
        <div style={{ fontSize: 12, marginBottom: 6 }}>RanSan / TEES</div>
        <WLabel size={36}>OVERSIZED BOX TEE</WLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <span>★★★★☆</span><span style={{ fontSize: 12 }}>4.6 (234 reviews)</span>
        </div>
        <div style={{ fontFamily: wfStyles.display, fontSize: 28, marginTop: 10 }}>₹ 1,999 <span style={{ fontSize: 16, textDecoration: 'line-through', color: wfColors.muted }}>₹2,499</span></div>

        {/* COLOR */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 12, marginBottom: 6 }}>COLOR: BLACK</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['#000','#fafaf5','#ffe94d','#2a5e8b'].map((c, i) =>
              <div key={c} style={{ width: 36, height: 36, border: i===0?`3px solid ${wfColors.ink}`:`1.5px solid ${wfColors.ink}`, background: c }} />
            )}
          </div>
        </div>

        {/* SIZE */}
        <div style={{ marginTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
            <span>SIZE</span><span style={{ textDecoration: 'underline' }}>size guide ↗</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['XS','S','M','L','XL','XXL'].map((s, i) =>
              <div key={s} style={{
                width: 46, height: 46, border: `1.5px solid ${wfColors.ink}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: wfStyles.display, fontSize: 15,
                background: s==='M'?wfColors.ink:'transparent',
                color: s==='M'?wfColors.paper:wfColors.ink,
                opacity: s==='XS'?0.4:1,
                textDecoration: s==='XS'?'line-through':'none',
              }}>{s}</div>
            )}
          </div>
        </div>

        {/* QTY + ADD */}
        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <div style={{ display: 'flex', border: `2px solid ${wfColors.ink}` }}>
            <div style={{ padding: '8px 12px' }}>−</div>
            <div style={{ padding: '8px 16px', borderLeft: `1px solid ${wfColors.ink}`, borderRight: `1px solid ${wfColors.ink}` }}>1</div>
            <div style={{ padding: '8px 12px' }}>+</div>
          </div>
          <WBtn filled style={{ flex: 1, justifyContent: 'center' }}>ADD TO CART — ₹1,999</WBtn>
          <WBtn style={{ padding: '6px 10px' }}>♡</WBtn>
        </div>

        {/* SHIPPING BLURB */}
        <div style={{ marginTop: 14, border: `1px dashed ${wfColors.ink}`, padding: 10, fontSize: 12 }}>
          🚚 Free shipping over ₹2999 · 🔄 7-day returns · 💸 COD available
        </div>

        {/* ACCORDION */}
        {['DESCRIPTION','DETAILS & CARE','SHIPPING & RETURNS'].map((a, i) => (
          <div key={a} style={{ borderTop: `1px solid ${wfColors.ink}`, padding: '10px 0', fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
            <span>{a}</span><span>{i===0?'−':'+'}</span>
          </div>
        ))}
        {/* opened description */}
        <WLines count={3} style={{ marginTop: 4 }} />
      </div>
    </div>

    {/* REVIEWS */}
    <div style={{ padding: 24, borderTop: `2px solid ${wfColors.ink}` }}>
      <WLabel size={24}>REVIEWS (234)</WLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 14 }}>
        {[1,2,3].map(i => (
          <WBox key={i} style={{ padding: 12 }}>
            <div style={{ fontSize: 12 }}>★★★★★</div>
            <div style={{ fontWeight: 600, fontSize: 13, margin: '4px 0' }}>Great fit, heavyweight</div>
            <WLines count={2} />
            <div style={{ fontSize: 11, marginTop: 6, color: wfColors.muted }}>— Rahul, Mumbai</div>
          </WBox>
        ))}
      </div>
    </div>

    {/* RELATED */}
    <div style={{ padding: 24, borderTop: `2px solid ${wfColors.ink}` }}>
      <WLabel size={24}>YOU MIGHT ALSO LIKE</WLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 12 }}>
        {[1,2,3,4].map(i => (
          <div key={i}>
            <WImg label={`REL ${i}`} aspect="3/4" />
            <div style={{ fontSize: 13, marginTop: 4 }}>Related Product</div>
            <div style={{ fontFamily: wfStyles.display, fontSize: 16 }}>₹ 1,799</div>
          </div>
        ))}
      </div>
    </div>
  </WFrame>
);

window.WireframePDP = WireframePDP;
