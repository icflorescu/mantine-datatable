import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect: typeof useEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
