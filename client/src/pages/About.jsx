import BigBtn from '../components/BigBtn';
import Ticker from '../components/Ticker';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <section className="bg-ink text-bone px-4 md:px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="font-mono text-[10px] md:text-[11px] tracking-wider2 text-acid">01 / THE STORY</div>
          <h1 className="font-display uppercase leading-[0.9] text-5xl md:text-9xl mt-3 md:mt-4">
            Made<br />For The<br /><span className="text-acid">Streets.</span>
          </h1>
        </div>
      </section>

      <Ticker items={['HEAVYWEIGHT', 'MADE IN INDIA', 'DROP 04', 'MUMBAI · MUMBAI · MUMBAI']} />

      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20 space-y-6 md:space-y-8 text-base md:text-lg leading-7 md:leading-8">
        <p>
          RanSan was born in a Bandra garage in 2024. A graphic designer and a pattern-cutter, tired of fast fashion, building the fits they couldn't buy anywhere else.
        </p>
        <p>
          Every piece is cut from 280+ GSM heavyweight cotton, pre-shrunk and garment-washed for a worn-in hand-feel. No synthetics. No shortcuts.
        </p>
        <p>
          Drops are small on purpose. When it's gone, it's gone.
        </p>
      </section>

      <section className="grid md:grid-cols-2 border-y border-ink">
        <div className="p-8 md:p-12 bg-acid">
          <div className="font-mono text-[10px] md:text-[11px] tracking-wider2">02 / HOW</div>
          <h2 className="font-display text-4xl md:text-5xl uppercase mt-3">Heavyweight. Boxy. Built to last.</h2>
          <ul className="mt-6 space-y-3 text-base">
            <li>— 280 GSM premium cotton, pre-shrunk</li>
            <li>— Oversized cuts, drop shoulders</li>
            <li>— Screen-printed graphics, hand-finished</li>
            <li>— Limited drops, never restocked</li>
          </ul>
        </div>
        <div className="min-h-[360px] bg-bone-2">
          <img src="https://loremflickr.com/1200/900/tailor,atelier,sewing?lock=4" alt="" className="w-full h-full object-cover" />
        </div>
      </section>

      <section className="px-4 md:px-6 py-14 md:py-20 text-center">
        <h2 className="font-display uppercase text-4xl md:text-7xl leading-[0.9]">Join The Gang.</h2>
        <Link to="/auth"><BigBtn variant="acid" className="mt-8">SIGN UP →</BigBtn></Link>
      </section>
    </>
  );
}
