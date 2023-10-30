import type { DataTableColumn } from './DataTableColumn';
import type { DataTableColumnGroup } from './DataTableColumnGroup';

export type DataTableColumnProps<T = Record<string, unknown>> =
  | {
      /**
       * Grouped columns.
       */
      groups: DataTableColumnGroup<T>[];

      columns?: never;
    }
  | {
      groups?: never;

      /**
       * Visible columns.
       */
      columns: DataTableColumn<T>[];
    };
