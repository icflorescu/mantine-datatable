import type { MantineStyleProp } from '@mantine/core';
import type { DataTableColumn } from './DataTableColumn';
import type { DataTableColumnTextAlign } from './DataTableColumnTextAlign';

export type DataTableColumnGroup<T = Record<string, unknown>> = {
  /**
   * Used as the `key` prop for the created `<th />`.
   */
  id: string;

  /**
   * Component to render inside the column group header.
   */
  title?: React.ReactNode;

  /**
   * Text alignment of the column group header.
   * @default `left`
   */
  textAlign?: DataTableColumnTextAlign;

  /**
   * Columns which are part of the group.
   */
  columns: DataTableColumn<T>[];

  /**
   * Optional className to apply to the column group header.
   */
  className?: string;

  /**
   * Optional style to apply to the column group header.
   * Can be a style object or a function which receives the current theme and
   * returns a style object.
   */
  style?: MantineStyleProp;
};
