export type DataTableSortStatus<T> = {
  /**
   * Sort column accessor.
   * You can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`).
   */
  columnAccessor: keyof T | (string & NonNullable<unknown>);

  /**
   * Sort direction - `asc` for ascending, `desc` for descending.
   */
  direction: 'asc' | 'desc';
};
