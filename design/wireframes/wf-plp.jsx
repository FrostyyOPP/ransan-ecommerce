// Product Listing Page (PLP) wireframe
const WireframePLP = () => (
  <WFrame label="shop/tees" width={1100}>
    <WNav />

    {/* BREADCRUMB + TITLE */}
    <div style={{ padding: '16px 24px', borderBottom: `2px solid ${wfColors.ink}` }}>
      <div style={{ fontSize: 12 }}>HOME / SHOP / <b>TEES</b></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
        <WLabel size={42}>TEES [48]</WLabel>
        <div style={{ fontSize: 13 }}>SORT: NEWEST ▾</div>
      </div>
    </div>

    {/* BODY: filters + grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr' }}>
      {/* FILTER SIDEBAR */}
      <div style={{ padding: 20, borderRight: `2px solid ${wfColors.ink}` }}>
        <WLabel size={18}>FILTERS</WLabel>
        {['CATEGORY', 'SIZE', 'COLOR', 'PRICE'].map((f, i) => (
          <div key={f} style={{ marginTop: 16, borderTop: i>0 ? `1px dashed ${wfColors.ink}`: 'none', paddingTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600 }}>
              <span>{f}</span><span>−</span>
            </div>
            <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
              {f === 'SIZE' ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['XS','S','M','L','XL'].map(s =>
                    <div key={s} style={{ border: `1.5px solid ${wfColors.ink}`, padding: '4px 8px', fontSize: 11 }}>{s}</div>
                  )}
                </div>
              ) : f === 'COLOR' ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['#000','#fff','#ffe94d','#e63946','#2a5e8b'].map(c =>
                    <div key={c} style={{ width: 20, height: 20, border: `1.5px solid ${wfColors.ink}`, background: c }} />
                  )}
                </div>
              ) : f === 'PRICE' ? (
                <div>
                  <div style={{ height: 4, background: wfColors.ink, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 10, top: -5, width: 14, height: 14, border: `2px solid ${wfColors.ink}`, background: wfColors.paper, borderRadius: '50%' }} />
                    <div style={{ position: 'absolute', right: 20, top: -5, width: 14, height: 14, border: `2px solid ${wfColors.ink}`, background: wfColors.paper, borderRadius: '50%' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11 }}>
                    <span>₹499</span><span>₹4999</span>
                  </div>
                </div>
              ) : (
                ['Tees','Hoodies','Pants','Caps'].map(o =>
                  <div key={o}><input type="checkbox" /> {o}</div>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div style={{ padding: 20 }}>
        {/* chip row */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {['Black ×','Size M ×','Under ₹2000 ×'].map(c =>
            <div key={c} style={{ border: `1.5px solid ${wfColors.ink}`, padding: '4px 10px', fontSize: 12 }}>{c}</div>
          )}
          <span style={{ fontSize: 12, alignSelf: 'center', marginLeft: 8 }}>clear all</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {Array.from({length: 9}).map((_, i) => (
            <div key={i}>
              <div style={{ position: 'relative' }}>
                <WImg label={`PROD ${i+1}`} aspect="3/4" />
                {i % 3 === 0 && <div style={{ position: 'absolute', top: 8, left: 8, background: wfColors.highlight, border: `1.5px solid ${wfColors.ink}`, padding: '2px 6px', fontSize: 11 }}>NEW</div>}
                {i % 5 === 0 && <div style={{ position: 'absolute', top: 8, right: 8, background: wfColors.red, color: wfColors.paper, border: `1.5px solid ${wfColors.ink}`, padding: '2px 6px', fontSize: 11 }}>-20%</div>}
              </div>
              <div style={{ marginTop: 6, fontSize: 13 }}>Product Name</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                {['#000','#fff','#888'].map(c => <div key={c} style={{ width: 10, height: 10, border: `1px solid ${wfColors.ink}`, background: c }} />)}
              </div>
              <div style={{ fontFamily: wfStyles.display, fontSize: 16, marginTop: 4 }}>₹ 1,999</div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
          {['<','1','2','3','...','8','>'].map((p, i) =>
            <div key={i} style={{ border: `1.5px solid ${wfColors.ink}`, padding: '4px 10px', background: p==='1'?wfColors.ink:'transparent', color: p==='1'?wfColors.paper:wfColors.ink }}>{p}</div>
          )}
        </div>
      </div>
    </div>
  </WFrame>
);

window.WireframePLP = WireframePLP;
