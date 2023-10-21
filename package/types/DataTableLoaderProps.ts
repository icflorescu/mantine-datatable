import type { MantineColor, MantineLoader, MantineSize } from '@mantine/core';

export type DataTableLoaderProps = {
  /**
   * Loader background blur (in pixels).
   */
  loaderBackgroundBlur?: number;
} & (
  | {
      loaderSize?: never;
      loaderType?: never;
      loaderColor?: never;

      /**
       * Custom loader component to use instead of default one.
       */
      customLoader?: React.ReactNode;
    }
  | {
      /**
       * Loader size.
       * @default `lg`.
       */
      loaderSize?: MantineSize | (string & NonNullable<unknown>) | number;

      /**
       * Loader type.
       */
      loaderType?: MantineLoader;

      /**
       * Loader color.
       */
      loaderColor?: MantineColor;

      customLoader?: never;
    }
);
