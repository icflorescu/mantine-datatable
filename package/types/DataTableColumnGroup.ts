import type { MantineStyleProp } from '@mantine/core';
import type { DataTableColumn } from './DataTableColumn';

export type DataTableColumnGroup<T> = {
  /**
   * Used as the `key` prop for the created `<th />`.
   */
  id: string;
  /**
   * Component to render inside the column group header.
   */
  title?: React.ReactNode;
  /**
   * Columns which are part of the group.
   */
  columns: readonly DataTableColumn<T>[];

  /**
   * Optional className to apply to the column group header.
   */
  className?: string;

  /**
   * Optional style to apply to the column group header.
   * Can be a React.CSSProperties object or a function which receives the current theme and
   * returns a React.CSSProperties object.
   */
  style?: MantineStyleProp;
};
