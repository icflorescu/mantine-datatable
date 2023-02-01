import type { DefaultMantineColor, MantineNumberSize, MantineTheme } from '@mantine/core';
import type { ReactNode } from 'react';

export type DataTableLoaderProps = {
  /**
   * Loader background blur (in pixels)
   */
  loaderBackgroundBlur?: number;
} & (
  | {
      loaderSize?: never;
      loaderVariant?: never;
      loaderColor?: never;

      /**
       * Custom loader component to use instead of default one
       */
      customLoader?: ReactNode;
    }
  | {
      /**
       * Loader size; defaults to `lg`
       */
      loaderSize?: MantineNumberSize;

      /**
       * Loader variant
       */
      loaderVariant?: MantineTheme['loader'];

      /**
       * Loader color
       */
      loaderColor?: DefaultMantineColor;

      customLoader?: never;
    }
);
