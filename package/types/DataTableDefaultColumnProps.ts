import type { DataTableColumn } from './DataTableColumn';

export type DataTableDefaultColumnProps<T> = Omit<
  DataTableColumn<T>,
  'accessor' | 'hidden' | 'visibleMediaQuery' | 'render'
>;
