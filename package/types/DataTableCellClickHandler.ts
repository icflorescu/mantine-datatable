import type { DataTableColumn } from './DataTableColumn';

export type DataTableCellClickHandler<T = Record<string, unknown>> = (params: {
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
  /**
   * Clicked column information.
   */
  column: DataTableColumn<T>;
  /**
   * Clicked column index.
   */
  columnIndex: number;
}) => void;
