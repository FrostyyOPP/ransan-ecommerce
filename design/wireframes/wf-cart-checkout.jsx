// Cart + Checkout wireframes
const WireframeCart = () => (
  <WFrame label="cart" width={1100}>
    <WNav />
    <div style={{ padding: 24 }}>
      <WLabel size={38}>YOUR BAG [3]</WLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, marginTop: 16 }}>
        <div>
          {[1,2,3].map(i => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 14, padding: 12, borderTop: `2px solid ${wfColors.ink}`, borderBottom: i===3?`2px solid ${wfColors.ink}`:'none' }}>
              <WImg label={`ITEM ${i}`} aspect="3/4" />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Oversized Box Tee {i}</div>
                <div style={{ fontSize: 12, color: wfColors.muted }}>Black / M</div>
                <div style={{ display: 'flex', border: `1.5px solid ${wfColors.ink}`, width: 'fit-content', marginTop: 8 }}>
                  <span style={{ padding: '4px 8px' }}>−</span>
                  <span style={{ padding: '4px 10px', borderLeft: `1px solid ${wfColors.ink}`, borderRight: `1px solid ${wfColors.ink}` }}>1</span>
                  <span style={{ padding: '4px 8px' }}>+</span>
                </div>
                <div style={{ fontSize: 12, marginTop: 6, textDecoration: 'underline' }}>remove</div>
              </div>
              <div style={{ fontFamily: wfStyles.display, fontSize: 20 }}>₹1,999</div>
            </div>
          ))}
        </div>
        <div style={{ border: `2px solid ${wfColors.ink}`, padding: 16, alignSelf: 'start' }}>
          <WLabel size={20}>SUMMARY</WLabel>
          {['Subtotal ₹5,997','Shipping FREE','Tax ₹299','PROMO CODE [____] APPLY'].map(l =>
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 8, borderBottom: `1px dashed ${wfColors.ink}`, paddingBottom: 6 }}>
              <span>{l}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontFamily: wfStyles.display, fontSize: 22 }}>
            <span>TOTAL</span><span>₹6,296</span>
          </div>
          <WBtn filled style={{ justifyContent: 'center', marginTop: 12, width: '100%' }}>CHECKOUT →</WBtn>
        </div>
      </div>
    </div>
  </WFrame>
);

const WireframeCheckout = () => (
  <WFrame label="checkout" width={1100}>
    <WNav />
    {/* stepper */}
    <div style={{ display: 'flex', padding: '14px 24px', gap: 12, borderBottom: `2px solid ${wfColors.ink}`, fontFamily: wfStyles.display, fontSize: 15 }}>
      {['01 SHIPPING','02 PAYMENT','03 REVIEW'].map((s, i) =>
        <span key={s} style={{ padding: '4px 10px', background: i===0?wfColors.ink:'transparent', color: i===0?wfColors.paper:wfColors.ink, border: `2px solid ${wfColors.ink}` }}>{s}</span>
      )}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 0 }}>
      <div style={{ padding: 24, borderRight: `2px solid ${wfColors.ink}` }}>
        <WLabel size={24}>SHIPPING INFO</WLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
          {['First name','Last name','Email','Phone','Address line 1','Address line 2','City','Pincode','State','Country'].map((f, i) =>
            <div key={f} style={{ gridColumn: (i===4||i===5)?'span 2':'auto' }}>
              <div style={{ fontSize: 11 }}>{f.toUpperCase()}</div>
              <div style={{ border: `1.5px solid ${wfColors.ink}`, padding: 8, height: 18, background: wfColors.paper }} />
            </div>
          )}
        </div>
        <div style={{ marginTop: 16, fontSize: 12 }}><input type="checkbox" defaultChecked /> Save this address for future orders</div>
        <div style={{ marginTop: 14 }}>
          <WLabel size={20}>SHIPPING METHOD</WLabel>
          {[['STANDARD — FREE','3–5 days'],['EXPRESS — ₹199','1–2 days']].map(([t,d], i) =>
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, border: `2px solid ${wfColors.ink}`, marginTop: 8 }}>
              <div style={{ width: 14, height: 14, border: `2px solid ${wfColors.ink}`, borderRadius: '50%', background: i===0?wfColors.ink:'transparent' }} />
              <div style={{ flex: 1, fontSize: 13 }}><b>{t}</b><div style={{ fontSize: 11, color: wfColors.muted }}>{d}</div></div>
            </div>
          )}
        </div>
        <WBtn filled style={{ marginTop: 16 }}>CONTINUE TO PAYMENT →</WBtn>
      </div>
      <div style={{ padding: 16 }}>
        <WLabel size={18}>ORDER SUMMARY</WLabel>
        {[1,2,3].map(i => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr auto', gap: 8, marginTop: 10, fontSize: 12 }}>
            <WImg label={`${i}`} aspect="1/1" />
            <div>Product {i}<div style={{ color: wfColors.muted }}>Black / M × 1</div></div>
            <div>₹1,999</div>
          </div>
        ))}
        <div style={{ marginTop: 12, borderTop: `1px dashed ${wfColors.ink}`, paddingTop: 10, fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹5,997</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shipping</span><span>FREE</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: wfStyles.display, fontSize: 18, marginTop: 6 }}><span>TOTAL</span><span>₹6,296</span></div>
        </div>
      </div>
    </div>
  </WFrame>
);

window.WireframeCart = WireframeCart;
window.WireframeCheckout = WireframeCheckout;
