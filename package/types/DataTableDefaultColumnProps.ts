import type { DataTableColumn } from './DataTableColumn';

export type DataTableDefaultColumnProps<T = Record<string, unknown>> = Omit<
  DataTableColumn<T>,
  'accessor' | 'hidden' | 'visibleMediaQuery' | 'render'
>;
