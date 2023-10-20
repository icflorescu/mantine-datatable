import type { DefaultMantineColor, MantineLoader, MantineSize } from '@mantine/core';

export type DataTableLoaderProps = {
  /**
   * Loader background blur (in pixels).
   */
  loaderBackgroundBlur?: number;
} & (
  | {
      loaderSize?: never;
      loaderVariant?: never;
      loaderColor?: never;

      /**
       * Custom loader component to use instead of default one.
       */
      customLoader?: React.ReactNode;
    }
  | {
      /**
       * Loader size; defaults to `lg`.
       */
      loaderSize?: MantineSize | (string & NonNullable<unknown>) | number;

      /**
       * Loader type.
       */
      loaderType?: MantineLoader;

      /**
       * Loader color.
       */
      loaderColor?: DefaultMantineColor;

      customLoader?: never;
    }
);
