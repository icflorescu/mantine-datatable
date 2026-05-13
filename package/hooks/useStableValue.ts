import { useRef } from 'react';

export interface ReadonlyRef<T> {
  readonly current: T;
}

export function useStableValue<T>(value: T): ReadonlyRef<T> {
  const ref = useRef<T>(value);
  ref.current = value;
  return ref;
}
