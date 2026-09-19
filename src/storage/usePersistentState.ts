import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then((stored) => stored && setValue(JSON.parse(stored)))
      .finally(() => setReady(true));
  }, [key]);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(key, JSON.stringify(value)).catch(() => undefined);
  }, [key, ready, value]);

  return [value, setValue, ready] as const;
}
