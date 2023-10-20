export type DataTableSortStatus = {
  /**
   * Sort column accessor.
   * You can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`).
   */
  columnAccessor: string;

  /**
   * Sort direction - `asc` for ascending, `desc` for descending.
   */
  direction: 'asc' | 'desc';
};
