import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api';

const CurrencyContext = createContext(null);

const FALLBACK = {
  rates: { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 },
  symbols: { INR: '₹', USD: '$', EUR: '€', GBP: '£' },
};

export function CurrencyProvider({ children }) {
  const [data, setData] = useState(FALLBACK);
  const [currency, setCurrency] = useState(localStorage.getItem('ransan_currency') || 'INR');

  useEffect(() => {
    api.get('/currency').then((r) => setData(r.data)).catch(() => {});
  }, []);

  useEffect(() => { localStorage.setItem('ransan_currency', currency); }, [currency]);

  function format(amountINR) {
    const rate = data.rates[currency] ?? 1;
    const v = amountINR * rate;
    const sym = data.symbols[currency] || '';
    if (currency === 'INR') return `${sym}${Math.round(v).toLocaleString('en-IN')}`;
    return `${sym}${v.toFixed(2)}`;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, supported: Object.keys(data.rates), format }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
