import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
      const message =
        error.name === 'QuotaExceededError'
          ? 'ទំហំផ្ទុកទិន្នន័យពេញហើយ។ សូមលុបទិន្នន័យចាស់ៗចោលខ្លះ។'
          : 'មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យ។';
      window.dispatchEvent(
        new CustomEvent('savegoal:storage-error', { detail: message })
      );
    }
  }, [key, value]);

  return [value, setValue];
}
