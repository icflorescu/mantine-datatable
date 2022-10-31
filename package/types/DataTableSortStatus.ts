export type DataTableSortStatus = {
  /**
   * Sort column accessor; you can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`)
   */
  columnAccessor: string;

  /**
   * Sort direction; `asc` for ascending or `desc` for descending
   */
  direction: 'asc' | 'desc';
};
