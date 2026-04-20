// Static FX (INR base). In production fetch from an FX API.
export const FX = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
};

export const SYMBOLS = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };

export function convert(amountINR, currency = 'INR') {
  const rate = FX[currency] ?? 1;
  return Math.round(amountINR * rate * 100) / 100;
}

export function format(amountINR, currency = 'INR') {
  const v = convert(amountINR, currency);
  const sym = SYMBOLS[currency] || '';
  if (currency === 'INR') return `${sym}${Math.round(v).toLocaleString('en-IN')}`;
  return `${sym}${v.toFixed(2)}`;
}
