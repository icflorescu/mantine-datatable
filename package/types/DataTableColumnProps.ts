import { DataTableColumn } from './DataTableColumn';
import { DataTableColumnGroup } from './DataTableColumnGroup';

export type DataTableColumnProps<T> =
  | {
      /**
       * Grouped columns
       */
      groups: readonly DataTableColumnGroup<T>[];
      columns?: never;
    }
  | {
      /**
       * Visible columns
       */
      columns: DataTableColumn<T>[];
      groups?: never;
    };
