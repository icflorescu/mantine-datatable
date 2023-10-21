import type { MantineShadow, MantineStyleProp, ScrollAreaProps, StylesRecord, TableProps } from '@mantine/core';
import type { DataTableCellClickHandler } from './DataTableCellClickHandler';
import type { DataTableColumnProps } from './DataTableColumnProps';
import type { DataTableContextMenuProps } from './DataTableContextMenuProps';
import type { DataTableDefaultColumnProps } from './DataTableDefaultColumnProps';
import type { DataTableEmptyStateProps } from './DataTableEmptyStateProps';
import type { DataTableLoaderProps } from './DataTableLoaderProps';
import type { DataTableOuterBorderProps } from './DataTableOuterBorderProps';
import type { DataTablePaginationProps } from './DataTablePaginationProps';
import type { DataTableRowExpansionProps } from './DataTableRowExpansionProps';
import type { DataTableSelectionProps } from './DataTableSelectionProps';
import type { DataTableSortProps } from './DataTableSortProps';
import type { DataTableVerticalAlignment } from './DataTableVerticalAlignment';

export type DataTableProps<T> = {
  /**
   * Data table container class name.
   */
  className?: string;

  /**
   * Data table container style.
   */
  style?: MantineStyleProp;

  /**
   * Data table elements class names.
   * An object with `root`, `table`, `header`, `footer` and `pagination` keys and class names
   * as values.
   */
  classNames?: Partial<Record<'root' | 'table' | 'header' | 'footer' | 'pagination', string>>;

  /**
   * Data table elements styles.
   * Can be an object with `root`, `table`, `header`, `footer` and `pagination` keys and
   * style objects as values, or a function that accepts the current theme and returns a
   * similarly structured object.
   */
  styles?: StylesRecord<'root' | 'table' | 'header' | 'footer' | 'pagination', MantineStyleProp>;

  /**
   * Table height.
   * @default '100%'
   */
  height?: string | number;

  /**
   * Minimum table height.
   */
  minHeight?: string | number;

  /**
   * DataTable component shadow.
   */
  shadow?: MantineShadow;

  /**
   * If true, the user will not be able to select text.
   */
  textSelectionDisabled?: boolean;

  /**
   * Vertical alignment for row cells.
   * @default `center`
   */
  verticalAlignment?: DataTableVerticalAlignment;

  /**
   * If true, will show a loader with semi-transparent background, centered over the table.
   */
  fetching?: boolean;

  /**
   * Default column props; will be merged with column props provided to each column
   */
  defaultColumnProps?: DataTableDefaultColumnProps<T>;

  /**
   * A default render function for all columns.
   * Accepts the current record, its index in `records` and the column `accessor` as
   * arguments and returns a React node (remember that a string is a valid React node too).
   */
  defaultColumnRender?: (record: T, index: number, accessor: string) => React.ReactNode;

  /**
   * Accessor to use as unique record key.
   * Can be a string representing a property name or a function receiving the current record
   * and returning a unique value.
   * If you're providing a string, you can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`).
   * @default `id`
   */
  idAccessor?: string | ((record: T) => React.Key);

  /**
   * Visible records.
   * The component will try to infer its row type from here.
   */
  records?: T[];

  /**
   * Text to show on empty state and pagination footer when no records are available.
   */
  noRecordsText?: string;

  /**
   * If true, the table will not show the header with column titles.
   */
  noHeader?: boolean;

  /**
   * Function to call when a row cell is clicked.
   */
  onCellClick?: DataTableCellClickHandler<T>;

  /**
   * Function to call when a row is clicked.
   * Receives the current record, its index in `records` and the click event
   * as parameters.
   */
  onRowClick?: (record: T, index: number, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;

  /**
   * Function to call when the DataTable is scrolled to top.
   */
  onScrollToTop?: () => void;

  /**
   * Function to call when the DataTable is scrolled to bottom.
   */
  onScrollToBottom?: () => void;

  /**
   * Function to call when the DataTable is scrolled to left.
   */
  onScrollToLeft?: () => void;

  /**
   * Function to call when the DataTable is scrolled to right.
   */
  onScrollToRight?: () => void;

  /**
   * Defines a context-menu to show when user right-clicks or clicks on a row.
   */
  rowContextMenu?: DataTableContextMenuProps<T>;

  /**
   * Defines the row expansion behavior.
   */
  rowExpansion?: DataTableRowExpansionProps<T>;

  /**
   * Optional class name passed to each row.
   * Can be a string or a function receiving the current record and its index as arguments and returning a string.
   */
  rowClassName?: string | ((record: T, index: number) => string | undefined);

  /**
   * Optional style passed to each row.
   * A function receiving the current record and its index as arguments and returning a style object.
   */
  rowStyle?: (record: T, index: number) => MantineStyleProp | undefined;

  /**
   * Optional function returning an object of custom attributes to be applied to each row in the table.
   * Receives the current record and its index as arguments.
   * Useful for adding data attributes, handling middle-clicks, etc.
   */
  customRowAttributes?: (record: T, index: number) => Record<string, unknown>;

  /**
   * Ref pointing to the scrollable viewport element.
   * Useful for imperative scrolling.
   */
  scrollViewportRef?: React.RefObject<HTMLDivElement>;

  /**
   * Additional props passed to the underlying `ScrollArea` element.
   */
  scrollAreaProps?: Omit<ScrollAreaProps, 'classNames' | 'styles' | 'onScrollPositionChange'>;
  /**
   * Ref pointing to the table body element.
   */
  bodyRef?: ((instance: HTMLTableSectionElement | null) => void) | React.RefObject<HTMLTableSectionElement>;
} & TableProps &
  DataTableColumnProps<T> &
  DataTableOuterBorderProps &
  DataTableLoaderProps &
  DataTableEmptyStateProps &
  DataTablePaginationProps &
  DataTableSortProps &
  DataTableSelectionProps<T>;
