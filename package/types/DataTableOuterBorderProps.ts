import type { MantineNumberSize } from '@mantine/core';

export type DataTableOuterBorderProps =
  | {
      withBorder?: never;
      borderRadius?: never;
    }
  | {
      /**
       * If true, table will have border
       */
      withBorder: boolean;

      /**
       * Table border radius
       */
      borderRadius?: MantineNumberSize;
    };
