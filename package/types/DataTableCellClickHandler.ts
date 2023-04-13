import type { MouseEvent } from 'react';
import type { DataTableColumn } from './DataTableColumn';

export type DataTableCellClickHandler<T> = (params: {
  /**
   * Click event
   */
  event: MouseEvent;

  /**
   * Clicked record
   */
  record: T;
  /**
   * Clicked record index
   */
  recordIndex: number;
  /**
   * Clicked column information
   */
  column: DataTableColumn<T>;
  /**
   * Clicked column index
   */
  columnIndex: number;
}) => void;
