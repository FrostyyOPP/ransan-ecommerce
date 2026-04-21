import { useEffect } from 'react';

const ROWS = [
  { size: 'XS', chest: 96, length: 66, shoulder: 46 },
  { size: 'S', chest: 102, length: 69, shoulder: 48 },
  { size: 'M', chest: 108, length: 71, shoulder: 50 },
  { size: 'L', chest: 114, length: 73, shoulder: 52 },
  { size: 'XL', chest: 120, length: 75, shoulder: 54 },
  { size: 'XXL', chest: 126, length: 77, shoulder: 56 },
];

export default function SizeGuide({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-ink/70 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-bone text-ink w-full max-w-2xl max-h-[90vh] overflow-auto border border-ink" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start p-6 border-b border-ink">
          <div>
            <div className="font-mono text-[10px] tracking-wider2 text-muted">GUIDE</div>
            <h2 className="font-display text-3xl md:text-4xl uppercase mt-1">Size & Fit.</h2>
          </div>
          <button onClick={onClose} className="font-display text-2xl leading-none w-10 h-10 border border-ink">×</button>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-sm leading-6">
            All measurements in cm. RanSan runs <b>one size larger</b> than standard for oversized fit.
            Unsure? Size down for a relaxed fit, up for oversized.
          </p>
          <table className="w-full text-sm">
            <thead className="border-b border-ink">
              <tr className="font-mono text-[10px] tracking-wider2 text-muted">
                {['SIZE','CHEST','LENGTH','SHOULDER'].map(h => <th key={h} className="text-left py-2">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(r => (
                <tr key={r.size} className="border-b border-ink/10">
                  <td className="py-3 font-display">{r.size}</td>
                  <td className="py-3">{r.chest} cm</td>
                  <td className="py-3">{r.length} cm</td>
                  <td className="py-3">{r.shoulder} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-acid p-4">
            <div className="font-mono text-[10px] tracking-wider2 mb-1">HOW TO MEASURE</div>
            <ul className="text-sm leading-6 list-disc pl-5">
              <li><b>Chest:</b> across the widest part, under the arms.</li>
              <li><b>Length:</b> from the highest point of the shoulder to the hem.</li>
              <li><b>Shoulder:</b> across the back between the shoulder seams.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
