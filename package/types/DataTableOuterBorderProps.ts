import type { MantineSize } from '@mantine/core';

export type DataTableOuterBorderProps =
  | {
      withTableBorder?: never;
      borderRadius?: never;
    }
  | {
      /**
       * If true, table will have border.
       */
      withTableBorder: boolean;

      /**
       * Table border radius.
       */
      borderRadius?: MantineSize | (string & NonNullable<unknown>) | number;
    };
