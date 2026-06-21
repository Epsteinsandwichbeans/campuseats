import { useState, useRef, useCallback } from 'react';

export function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    clearTimeout(timerRef.current);
    setToast({ msg: message, type, key: Date.now() });
    timerRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

  return [toast, showToast];
}