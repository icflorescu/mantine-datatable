export type DataTableRowClickHandler<T> = (params: {
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
