import type { DataTableSortStatus } from './DataTableSortStatus';

export type DataTableSortProps<T = Record<string, unknown>> = (
  | {
      sortStatus?: never;
      onSortStatusChange?: never;
    }
  | {
      /**
       * Current sort status (sort column accessor & direction).
       */
      sortStatus: DataTableSortStatus<T>;

      /**
       * Callback fired after change of sort status.
       * Receives the new sort status as argument.
       */
      onSortStatusChange?: (sortStatus: DataTableSortStatus<T>) => void;
    }
) & {
  /**
   * Custom sort icons.
   */
  sortIcons?: {
    /**
     * Icon to display when column is sorted ascending.
     * Will be rotated 180deg for descending sort
     */
    sorted: React.ReactNode;
    /**
     * Icon to display when column is not sorted.
     */
    unsorted: React.ReactNode;
  };
};
