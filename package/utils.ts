import { useMantineTheme, type MantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useMediaQueryStringOrFunction(mediaQuery: string | ((theme: MantineTheme) => string) | undefined) {
  const theme = useMantineTheme();
  const mediaQueryValue = typeof mediaQuery === 'function' ? mediaQuery(theme) : mediaQuery;
  return useMediaQuery(mediaQueryValue || '', true);
}

export function humanize(value: string) {
  const str = value
    .replace(/([a-z\d])([A-Z]+)/g, '$1 $2')
    .replace(/\W|_/g, ' ')
    .trim()
    .toLowerCase();
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function differenceBy<T>(arr1: T[], arr2: T[], iteratee: (value: T) => unknown) {
  return arr1.filter((c) => !arr2.map(iteratee).includes(iteratee(c)));
}

export function uniqBy<T>(arr: T[], iteratee: (value: T) => unknown) {
  return arr.filter((x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)));
}

export function getValueAtPath(obj: unknown, path: string) {
  if (!path) return undefined;
  const pathArray = path.match(/([^[.\]])+/g) as string[];
  return pathArray.reduce((prevObj: unknown, key) => prevObj && (prevObj as Record<string, unknown>)[key], obj);
}
