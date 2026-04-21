import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, variant = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, variant }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const api = {
    info: (m) => push(m, 'info'),
    success: (m) => push(m, 'success'),
    error: (m) => push(m, 'error'),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed z-[60] top-4 right-4 flex flex-col gap-2 max-w-[calc(100vw-2rem)]">
        {toasts.map(t => {
          const bg = t.variant === 'error' ? 'bg-bleed text-bone'
                   : t.variant === 'success' ? 'bg-acid text-ink'
                   : 'bg-ink text-bone';
          return (
            <div key={t.id} className={`${bg} border border-ink px-4 py-3 font-mono text-xs tracking-wider max-w-sm shadow-lg`}>
              {t.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
