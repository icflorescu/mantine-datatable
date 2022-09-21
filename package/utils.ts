import { MantineTheme, useMantineTheme } from '@mantine/core';
import { useDebouncedState, useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

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
  if (typeof iteratee === 'string') {
    const prop = iteratee;
    iteratee = (item) => item[prop];
  }
  return arr1.filter((c) => !arr2.map(iteratee).includes(iteratee(c)));
}

export function uniqBy<T>(arr: T[], iteratee: (value: T) => unknown) {
  if (typeof iteratee === 'string') {
    const prop = iteratee;
    iteratee = (item) => item[prop];
  }
  return arr.filter((x, i, self) => i === self.findIndex((y) => iteratee(x) === iteratee(y)));
}

export function getValueAtPath(obj: unknown, path: string) {
  if (!path) return undefined;
  const pathArray = path.match(/([^[.\]])+/g) as string[];
  return pathArray.reduce((prevObj: unknown, key) => prevObj && (prevObj as Record<string, unknown>)[key], obj);
}

export function useDataTableScrollState() {
  const debouncedStateArgs: [boolean, number, { leading: true }] = [true, 200, { leading: true }];

  const [scrolledToTop, setScrolledToTop] = useDebouncedState(...debouncedStateArgs);
  const [scrolledToBottom, setScrolledToBottom] = useDebouncedState(...debouncedStateArgs);
  const [scrolledToLeft, setScrolledToLeft] = useDebouncedState(...debouncedStateArgs);
  const [scrolledToRight, setScrolledToRight] = useDebouncedState(...debouncedStateArgs);

  return {
    scrolledToTop,
    setScrolledToTop,
    scrolledToBottom,
    setScrolledToBottom,
    scrolledToLeft,
    setScrolledToLeft,
    scrolledToRight,
    setScrolledToRight,
  };
}

export function useDataTableLastSelectionChangeIndexState(recordIds: unknown[] | undefined) {
  const [lastSelectionChangeIndex, setLastSelectionChangeIndex] = useState<number | null>(null);
  const recordIdsString = recordIds?.join(':') || '';
  useEffect(() => {
    setLastSelectionChangeIndex(null);
  }, [recordIdsString]);

  return { lastSelectionChangeIndex, setLastSelectionChangeIndex };
}
