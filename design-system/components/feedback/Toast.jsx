import React from 'react';
import { Alert } from './Alert.jsx';

const EXIT_MS = 600;

/* Toast state: push() adds one and returns its id; after `duration` ms it
   closes (exit animation), then it is removed. duration 0 keeps it until
   dismiss(id). */
export function useToasts({ duration = 4000 } = {}) {
  const [toasts, setToasts] = React.useState([]);
  const timers = React.useRef(new Map());
  const nextId = React.useRef(0);

  const dismiss = React.useCallback((id) => {
    clearTimeout(timers.current.get(id));
    setToasts((t) => t.map((x) => (x.id === id ? { ...x, closing: true } : x)));
    timers.current.set(id, setTimeout(() => {
      timers.current.delete(id);
      setToasts((t) => t.filter((x) => x.id !== id));
    }, EXIT_MS));
  }, []);

  const push = React.useCallback((toast) => {
    const id = toast.id ?? ++nextId.current;
    setToasts((t) => [...t, { element: 'fire', ...toast, id, closing: false }]);
    const ms = toast.duration ?? duration;
    if (ms > 0) timers.current.set(id, setTimeout(() => dismiss(id), ms));
    return id;
  }, [duration, dismiss]);

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  return { toasts, push, dismiss };
}

/* Fixed bottom-right stack. Rows animate their height so neighbours glide
   when a toast arrives or leaves. Each toast is an Alert with a close button. */
export function ToastStack({ toasts = [], onDismiss, className = '', ...rest }) {
  return (
    <div className={['toast-stack', className].filter(Boolean).join(' ')} role="region" aria-label="Notifications" {...rest}>
      {toasts.map((t) => (
        <div key={t.id} className="toast-slot" data-state={t.closing ? 'closed' : 'open'}>
          <div className="toast-slot-inner"><div className="toast-pad">
            <Alert className="toast" element={t.element} title={t.title} onDismiss={onDismiss ? () => onDismiss(t.id) : undefined}>{t.message}</Alert>
          </div></div>
        </div>
      ))}
    </div>
  );
}
