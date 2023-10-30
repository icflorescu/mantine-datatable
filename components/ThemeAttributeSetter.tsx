'use client';

import { useComputedColorScheme } from '@mantine/core';
import { useEffect } from 'react';

/**
 * We need this component to set the `data-theme` attribute on the `<html>` element because
 * some libraries, such as Algolia DocSearch, rely on it to determine the current color scheme.
 */
export function ThemeAttributeSetter() {
  const colorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorScheme);
  }, [colorScheme]);

  return null;
}
