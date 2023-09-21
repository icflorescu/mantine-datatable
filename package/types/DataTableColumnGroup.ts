import type { CSSProperties, ReactNode } from 'react';
import type { DataTableColumn } from './DataTableColumn';

export type DataTableColumnGroup<T> = {
  /**
   * Used as the `key` prop for the created `<th />`.
   */
  id: string;
  /**
   * Component to render inside the column group header
   */
  title?: ReactNode;
  /**
   * Columns which are part of the group.
   */
  columns: readonly DataTableColumn<T>[];
  className?: string;
  style?: CSSProperties;
};
