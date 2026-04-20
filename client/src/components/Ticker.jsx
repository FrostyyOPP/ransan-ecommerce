export default function Ticker({ items = ['DROP 04', 'FREE SHIP ₹2999+', 'COD AVAILABLE', '7-DAY RETURNS', 'MADE IN MUMBAI'] }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-ink text-bone py-3 overflow-hidden">
      <div className="flex animate-[scroll_40s_linear_infinite] whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="font-display uppercase tracking-wider2 text-sm px-7 flex items-center gap-7">
            {t}<span className="text-acid">✱</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-25%); } }`}</style>
    </div>
  );
}
