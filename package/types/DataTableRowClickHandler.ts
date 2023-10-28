export type DataTableRowClickHandler<T = Record<string, unknown>> = (params: {
  /**
   * Click event.
   */
  event: React.MouseEvent;

  /**
   * Clicked record.
   */
  record: T;

  /**
   * Clicked record index.
   */
  index: number;
}) => void;
