import { type MantineTheme, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function useMediaQueryStringOrFunction(
  mediaQuery: string | ((theme: MantineTheme) => string) | undefined
): boolean {
  const theme = useMantineTheme();
  const mediaQueryValue = typeof mediaQuery === 'function' ? mediaQuery(theme) : mediaQuery;
  return useMediaQuery(mediaQueryValue || '', true);
}
