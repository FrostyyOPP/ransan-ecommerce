import { useParams, Link, Navigate } from 'react-router-dom';
import BigBtn from '../components/BigBtn';

const CONTENT = {
  shipping: {
    title: 'SHIPPING',
    body: [
      ['Delivery times', 'Orders ship within 24 hours from our Mumbai atelier. Standard delivery across India takes 3–7 business days.'],
      ['Cost', 'Free shipping on orders ₹2999+. A flat ₹99 applies below that.'],
      ['Tracking', 'You\'ll receive an email with a tracking link as soon as your order is dispatched.'],
      ['International', 'Not available yet — coming with Drop 06.'],
    ],
  },
  returns: {
    title: 'RETURNS',
    body: [
      ['7-day returns', 'Return any unworn item within 7 days of delivery for a full refund. Tags must be attached.'],
      ['How to start', 'Email returns@ransan.com with your order number and we\'ll send a prepaid label.'],
      ['Refund timing', 'Refunds hit your original payment method within 5–10 business days of us receiving the return.'],
      ['Sale items', 'Sale items are final. No returns or exchanges on marked-down pieces.'],
    ],
  },
  'size-guide': {
    title: 'SIZE GUIDE',
    body: [
      ['Our fit', 'RanSan runs one size larger than standard for an oversized, boxy silhouette. If you\'re between sizes, size down for a relaxed fit, up for a true oversized look.'],
      ['How to measure', 'Chest: across the widest part under the arms. Length: from the highest point of the shoulder to the hem. Shoulder: across the back between shoulder seams.'],
      ['Detailed chart', 'Open the SIZE GUIDE button on any product page for the full cm chart.'],
    ],
  },
  contact: {
    title: 'CONTACT',
    body: [
      ['Email', 'hello@ransan.com — typical reply within 24 hours, Mon–Fri.'],
      ['Press & collabs', 'press@ransan.com'],
      ['Wholesale', 'We don\'t do wholesale. Drops are direct-to-consumer.'],
      ['Studio', 'Bandra West, Mumbai 400050 — by appointment only.'],
    ],
  },
};

export default function Help() {
  const { slug } = useParams();
  const c = CONTENT[slug];
  if (!c) return <Navigate to="/" />;
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
      <div className="font-mono text-[10px] md:text-[11px] tracking-wider2 text-muted">HELP / {c.title}</div>
      <h1 className="font-display text-5xl md:text-7xl uppercase leading-[0.9] mt-3">{c.title}.</h1>
      <div className="mt-10 space-y-8">
        {c.body.map(([h, p]) => (
          <div key={h}>
            <div className="font-mono text-[10px] tracking-wider2 text-muted">{h.toUpperCase()}</div>
            <p className="text-base md:text-lg leading-7 mt-2">{p}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex gap-3 flex-wrap">
        <Link to="/shop"><BigBtn variant="acid">KEEP SHOPPING</BigBtn></Link>
        <Link to="/"><BigBtn variant="ghost">BACK HOME</BigBtn></Link>
      </div>
    </div>
  );
}
