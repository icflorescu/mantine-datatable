import type { DataTableSortStatus } from './DataTableSortStatus';

export type DataTableSortProps =
  | {
      sortStatus?: never;
      onSortStatusChange?: never;
    }
  | {
      /**
       * Current sort status (sort column accessor & direction)
       */
      sortStatus: DataTableSortStatus;

      /**
       * Callback fired after change of sort status
       */
      onSortStatusChange?: (sortStatus: DataTableSortStatus) => void;
    };
