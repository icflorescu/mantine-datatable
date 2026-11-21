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
     * Will be flipped vertically for descending sort
     */
    sorted: React.ReactNode;
    /**
     * Icon to display when column is not sorted.
     */
    unsorted: React.ReactNode;
  };

  /**
   * Custom accessible labels announced by screen readers for the sort state of a column header.
   * Use it to localize the default English labels; omitted keys fall back to the defaults.
   */
  sortLabels?: {
    /**
     * Label for a column that is not sorted. Defaults to `Not sorted`.
     */
    unsorted?: string;
    /**
     * Label for a column sorted ascending. Defaults to `Sorted ascending`.
     */
    ascending?: string;
    /**
     * Label for a column sorted descending. Defaults to `Sorted descending`.
     */
    descending?: string;
  };
};
