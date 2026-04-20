// Auth, Search, About, Admin wireframes
const WireframeAuth = () => (
  <WFrame label="login" width={1100}>
    <WNav />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 500 }}>
      <div style={{ background: wfColors.ink, position: 'relative' }}>
        <WImg label="BRAND IMAGERY" aspect="auto" style={{ height: '100%', background: 'transparent' }} />
        <div style={{ position: 'absolute', bottom: 30, left: 30, color: wfColors.paper, fontFamily: wfStyles.display, fontSize: 36 }}>JOIN THE GANG.</div>
      </div>
      <div style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 16, fontFamily: wfStyles.display, fontSize: 22, borderBottom: `2px solid ${wfColors.ink}`, paddingBottom: 6 }}>
          <span style={{ borderBottom: `4px solid ${wfColors.ink}`, paddingBottom: 6, marginBottom: -8 }}>LOG IN</span>
          <span style={{ color: wfColors.muted }}>SIGN UP</span>
        </div>
        {['EMAIL','PASSWORD'].map(f =>
          <div key={f}>
            <div style={{ fontSize: 11 }}>{f}</div>
            <div style={{ border: `1.5px solid ${wfColors.ink}`, padding: 10, background: wfColors.paper }} />
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
          <span><input type="checkbox" /> Remember me</span>
          <span style={{ textDecoration: 'underline' }}>Forgot password?</span>
        </div>
        <WBtn filled style={{ justifyContent: 'center' }}>LOG IN →</WBtn>
        <div style={{ textAlign: 'center', fontSize: 12 }}>— OR —</div>
        <WBtn style={{ justifyContent: 'center' }}>G  CONTINUE WITH GOOGLE</WBtn>
        <div style={{ fontSize: 12, textAlign: 'center', marginTop: 6 }}>New here? <b style={{ textDecoration: 'underline' }}>Sign up</b></div>
      </div>
    </div>
  </WFrame>
);

const WireframeSearch = () => (
  <WFrame label="search?q=hoodie" width={1100}>
    <WNav />
    <div style={{ padding: 18, borderBottom: `2px solid ${wfColors.ink}` }}>
      <div style={{ border: `2px solid ${wfColors.ink}`, padding: '10px 14px', fontSize: 18 }}>🔍 <b>hoodie</b> <span style={{ float: 'right' }}>×</span></div>
      <div style={{ marginTop: 8, fontSize: 12 }}>24 results · <span style={{ textDecoration: 'underline' }}>did you mean: hoodies?</span></div>
    </div>
    <div style={{ padding: 20 }}>
      <WLabel size={18}>TOP CATEGORIES</WLabel>
      <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
        {['Hoodies (18)','Zip-ups (4)','Crewnecks (2)'].map(c =>
          <div key={c} style={{ border: `1.5px solid ${wfColors.ink}`, padding: '4px 10px', fontSize: 12 }}>{c}</div>
        )}
      </div>
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {Array.from({length: 8}).map((_, i) => (
          <div key={i}>
            <WImg label={`RES ${i+1}`} aspect="3/4" />
            <div style={{ fontSize: 13, marginTop: 4 }}>Hoodie Result {i+1}</div>
            <div style={{ fontFamily: wfStyles.display, fontSize: 16 }}>₹ 2,499</div>
          </div>
        ))}
      </div>
    </div>
  </WFrame>
);

const WireframeAbout = () => (
  <WFrame label="about" width={1100}>
    <WNav />
    <div style={{ position: 'relative' }}>
      <WImg label="FOUNDER / CREW SHOT" aspect="21/9" />
      <div style={{ position: 'absolute', top: 30, left: 30 }}>
        <WLabel size={56}>WE'RE</WLabel><br/>
        <WLabel size={56}>RanSan.</WLabel>
      </div>
    </div>
    <div style={{ padding: 32, display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24, borderBottom: `2px solid ${wfColors.ink}` }}>
      <WLabel size={28}>THE STORY</WLabel>
      <div><WLines count={6} /></div>
    </div>
    <div style={{ padding: 32, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, borderBottom: `2px solid ${wfColors.ink}` }}>
      {['MADE IN INDIA','HEAVYWEIGHT FABRICS','LIMITED DROPS'].map(v =>
        <div key={v}>
          <div style={{ fontFamily: wfStyles.display, fontSize: 46 }}>✱</div>
          <WLabel size={20}>{v}</WLabel>
          <WLines count={3} />
        </div>
      )}
    </div>
    <div style={{ padding: 32 }}>
      <WLabel size={24}>THE CREW</WLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 12 }}>
        {[1,2,3,4].map(i => (
          <div key={i}><WImg label={`CREW ${i}`} aspect="1/1" /><div style={{ fontSize: 13, marginTop: 4 }}>Name</div><div style={{ fontSize: 11, color: wfColors.muted }}>Role</div></div>
        ))}
      </div>
    </div>
  </WFrame>
);

const WireframeAdmin = () => (
  <WFrame label="admin/dashboard" width={1100}>
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', minHeight: 560 }}>
      <div style={{ background: wfColors.ink, color: wfColors.paper, padding: 16 }}>
        <div style={{ fontFamily: wfStyles.display, fontSize: 24 }}>RanSan<span style={{ color: wfColors.highlight }}>/admin</span></div>
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
          {['📊 Dashboard','📦 Orders','👕 Products','🎨 Collections','👤 Customers','💰 Discounts','📈 Analytics','⚙ Settings'].map((i, idx) =>
            <div key={i} style={{ padding: 8, background: idx===0?wfColors.highlight:'transparent', color: idx===0?wfColors.ink:wfColors.paper }}>{i}</div>
          )}
        </div>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <WLabel size={30}>DASHBOARD</WLabel>
          <div style={{ fontSize: 12 }}>Last 30 days ▾</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 14 }}>
          {[['REVENUE','₹4.8L','+12%'],['ORDERS','342','+8%'],['VISITORS','14.2K','+24%'],['CONV.','2.4%','-0.3%']].map(([l,v,d]) =>
            <WBox key={l} style={{ padding: 12 }}>
              <div style={{ fontSize: 11, color: wfColors.muted }}>{l}</div>
              <div style={{ fontFamily: wfStyles.display, fontSize: 26 }}>{v}</div>
              <div style={{ fontSize: 11, color: d.startsWith('-')?wfColors.red:'#2a8a5e' }}>{d}</div>
            </WBox>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginTop: 16 }}>
          <WBox style={{ padding: 14, height: 200 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>REVENUE</div>
            <svg viewBox="0 0 400 120" style={{ width: '100%', marginTop: 10 }}>
              <polyline points="0,80 40,70 80,60 120,65 160,50 200,40 240,55 280,30 320,45 360,25 400,35" fill="none" stroke={wfColors.ink} strokeWidth="2" />
            </svg>
          </WBox>
          <WBox style={{ padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>TOP PRODUCTS</div>
            {[1,2,3,4].map(i =>
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 6, borderBottom: `1px dashed ${wfColors.ink}`, paddingBottom: 3 }}>
                <span>Product {i}</span><span>{100-i*15}</span>
              </div>
            )}
          </WBox>
        </div>
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>RECENT ORDERS</div>
          <table style={{ width: '100%', fontSize: 12, borderCollapse: 'collapse' }}>
            <thead><tr style={{ borderBottom: `2px solid ${wfColors.ink}` }}>{['ORDER','CUSTOMER','DATE','STATUS','TOTAL'].map(h => <th key={h} style={{ textAlign: 'left', padding: 6 }}>{h}</th>)}</tr></thead>
            <tbody>{[1,2,3,4,5].map(i =>
              <tr key={i} style={{ borderBottom: `1px dashed ${wfColors.ink}` }}>
                <td style={{ padding: 6 }}>#RS-10{i}24</td>
                <td style={{ padding: 6 }}>Customer {i}</td>
                <td style={{ padding: 6 }}>Apr {20-i}, 2026</td>
                <td style={{ padding: 6 }}><span style={{ border: `1.5px solid ${wfColors.ink}`, padding: '2px 6px' }}>{['PAID','SHIPPED','DELIVERED','PENDING','PAID'][i-1]}</span></td>
                <td style={{ padding: 6 }}>₹{2000+i*300}</td>
              </tr>
            )}</tbody>
          </table>
        </div>
      </div>
    </div>
  </WFrame>
);

window.WireframeAuth = WireframeAuth;
window.WireframeSearch = WireframeSearch;
window.WireframeAbout = WireframeAbout;
window.WireframeAdmin = WireframeAdmin;
