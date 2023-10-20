import { useMantineTheme, type MantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useMediaQueries } from './useMediaQueries';

export function useMediaQueriesStringOrFunction(queries: (string | ((theme: MantineTheme) => string) | undefined)[]) {
  const theme = useMantineTheme();
  const values = useMemo(
    () => queries.map((query) => (typeof query === 'function' ? query(theme) : query) ?? ''),
    [queries, theme]
  );
  const defaults = useMemo(() => queries.map(() => true), [queries]);
  return useMediaQueries(values, defaults);
}
