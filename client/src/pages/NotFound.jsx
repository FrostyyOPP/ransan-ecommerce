import { Link } from 'react-router-dom';
import BigBtn from '../components/BigBtn';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">
      <div className="font-display uppercase text-[180px] leading-none text-acid" style={{ WebkitTextStroke: '2px #0A0A0A' }}>404</div>
      <h1 className="font-display text-5xl uppercase mt-4">Lost In The Grid.</h1>
      <p className="text-muted mt-3">This page doesn't exist or has been dropped.</p>
      <Link to="/" className="inline-block mt-8"><BigBtn variant="acid">BACK TO HOME →</BigBtn></Link>
    </div>
  );
}
