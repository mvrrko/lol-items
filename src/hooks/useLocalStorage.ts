import { useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage } from '../utils/storageUtils';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    return loadFromStorage(key, initialValue);
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      saveToStorage(key, valueToStore);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
