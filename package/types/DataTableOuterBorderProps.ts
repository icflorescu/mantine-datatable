import type { MantineSize } from '@mantine/core';

export type DataTableOuterBorderProps =
  | {
      withBorder?: never;
      borderRadius?: never;
    }
  | {
      /**
       * If true, table will have border.
       */
      withBorder: boolean;

      /**
       * Table border radius.
       */
      borderRadius?: MantineSize | (string & NonNullable<unknown>) | number;
    };
