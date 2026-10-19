import { useEffect, useState } from 'react';
import { STORAGE_PREFIX } from '../config';

export function useLocalStorage(key, initial, validate = () => true) {
  const k = STORAGE_PREFIX + key;
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(k);
      if (raw === null) return initial;
      const parsed = JSON.parse(raw);
      return validate(parsed) ? parsed : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(k, JSON.stringify(value)); } catch { /* storage full or blocked */ }
  }, [k, value]);
  return [value, setValue];
}
export const isArray = Array.isArray;
