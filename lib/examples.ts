export type DelayOptions = { min: number; max: number };
import { useCallback, useEffect, useRef } from 'react';

export function delay({ min, max }: DelayOptions) {
  return new Promise((resolve) => {
    setTimeout(resolve, min + Math.round(Math.random() * (max - min)));
  });
}

export function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
