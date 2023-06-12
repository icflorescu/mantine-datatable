import { useMantineTheme, type MantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Key, useEffect, useLayoutEffect, useMemo } from 'react';
import { useMediaQueries } from './useMediaQueries';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function useMediaQueryStringOrFunction(mediaQuery: string | ((theme: MantineTheme) => string) | undefined) {
  const theme = useMantineTheme();
  const mediaQueryValue = typeof mediaQuery === 'function' ? mediaQuery(theme) : mediaQuery;
  return useMediaQuery(mediaQueryValue || '', true);
}

export function useMediaQueriesStringOrFunction(queries: (string | ((theme: MantineTheme) => string) | undefined)[]) {
  const theme = useMantineTheme();
  const values = useMemo(
    () => queries.map((query) => (typeof query === 'function' ? query(theme) : query) ?? ''),
    [queries, theme]
  );
  const defaults = useMemo(() => queries.map(() => true), [queries]);
  return useMediaQueries(values, defaults);
}

/**
 * Utility function that returns a humanized version of a string, e.g. "camelCase" -> "Camel Case"
 */
export function humanize(value: string) {
  const str = value
    .replace(/([a-z\d])([A-Z]+)/g, '$1 $2')
    .replace(/\W|_/g, ' ')
    .trim()
    .toLowerCase();
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * Utility function that returns an array of values that are present in the first array but not in the second
 */
export function differenceBy<T>(arr1: T[], arr2: T[], iteratee: (value: T) => unknown) {
  return arr1.filter((c) => !arr2.map(iteratee).includes(iteratee(c)));
}

/**
 * Utility function that returns an array of unique values from a given array
 */
export function uniqBy<T>(arr: T[], iteratee: (value: T) => unknown) {
  return arr.filter((x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)));
}

/**
 * Utility function that returns the value at a given path in an object
 */
export function getValueAtPath(obj: unknown, path: string) {
  if (!path) return undefined;
  const pathArray = path.match(/([^[.\]])+/g) as string[];
  return pathArray.reduce((prevObj: unknown, key) => prevObj && (prevObj as Record<string, unknown>)[key], obj);
}

/**
 * Utility function that returns the record id using idAccessor
 */
export function getRecordId<T>(record: T, idAccessor: string | ((record: T) => Key)) {
  return typeof idAccessor === 'string' ? getValueAtPath(record, idAccessor) : idAccessor(record);
}
