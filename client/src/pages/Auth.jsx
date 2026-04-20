import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import BigBtn from '../components/BigBtn';

export default function Auth() {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const { login, register } = useAuth();
  const nav = useNavigate();
  const [sp] = useSearchParams();
  const next = sp.get('next') || '/';
  const up = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault(); setErr(''); setBusy(true);
    try {
      if (tab === 'login') await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      nav(next);
    } catch (e) {
      setErr(e.response?.data?.error || e.message);
    } finally { setBusy(false); }
  }

  return (
    <div className="grid md:grid-cols-2 min-h-[calc(100vh-64px)]">
      <div className="bg-ink text-bone relative overflow-hidden">
        <img src="https://picsum.photos/seed/ransan-auth/1000/1400" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative p-12 h-full flex flex-col justify-between min-h-[500px]">
          <Logo className="text-bone" size={28} />
          <div>
            <div className="font-mono text-[11px] tracking-wider2 text-acid">MEMBER ACCESS</div>
            <h1 className="font-display uppercase leading-[0.9] text-6xl md:text-8xl mt-4">
              JOIN<br />THE<br /><span className="text-acid">GANG.</span>
            </h1>
            <p className="max-w-[360px] text-sm leading-7 mt-6 text-bone/80">
              Early drops. Member-only sales. Exclusive fits. No spam, ever.
            </p>
          </div>
          <div className="font-mono text-[10px] tracking-wider2 text-muted">RANSAN® · DROP 04 · S/S 26</div>
        </div>
      </div>

      <div className="p-8 md:p-16 flex items-center">
        <form onSubmit={submit} className="w-full max-w-md mx-auto">
          <div className="flex border-b border-ink font-display text-xl uppercase">
            {['login', 'signup'].map(k => (
              <button type="button" key={k} onClick={() => setTab(k)}
                className={`flex-1 py-4 ${tab === k ? 'border-b-[3px] border-ink -mb-px' : 'text-muted'}`}>
                {k === 'login' ? 'LOG IN' : 'SIGN UP'}
              </button>
            ))}
          </div>
          <div className="mt-8 space-y-4">
            {tab === 'signup' && <Input label="NAME" value={form.name} onChange={up('name')} required />}
            <Input label="EMAIL" type="email" value={form.email} onChange={up('email')} required />
            <Input label="PASSWORD" type="password" value={form.password} onChange={up('password')} required />
            {err && <div className="font-mono text-xs text-bleed">{err}</div>}
            <BigBtn type="submit" variant="primary" disabled={busy} className="w-full !py-4">
              {busy ? '…' : tab === 'login' ? 'LOG IN →' : 'CREATE ACCOUNT →'}
            </BigBtn>
            <p className="font-mono text-[10px] text-muted mt-4">
              Try: <b>admin@ransan.com / admin123</b> or <b>demo@ransan.com / demo123</b>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...rest }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-wider2 mb-1">{label}</div>
      <input {...rest} className="w-full border border-ink bg-transparent px-4 py-3 outline-none text-sm" />
    </div>
  );
}
