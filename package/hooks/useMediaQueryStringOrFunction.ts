import { useMantineTheme, type MantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function useMediaQueryStringOrFunction(mediaQuery: string | ((theme: MantineTheme) => string) | undefined) {
  const theme = useMantineTheme();
  const mediaQueryValue = typeof mediaQuery === 'function' ? mediaQuery(theme) : mediaQuery;
  return useMediaQuery(mediaQueryValue || '', true);
}
