import type {
  MantineColor,
  MantineShadow,
  MantineStyleProp,
  ScrollAreaProps,
  StyleProp,
  TableProps,
} from '@mantine/core';
import type { DataTableVerticalAlignment } from './';
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

export type DataTableProps<T> = {
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
   * Table border color.
   * Applied to the outer border, the header bottom border, and the pagination footer top border.
   */
  borderColor?: StyleProp<MantineColor>;

  /**
   * Row border color.
   */
  rowBorderColor?: StyleProp<MantineColor>;

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
   * Accepts an object with current record, its index in `records` and the column accessor as
   * properties and returns a React node (remember that a string is a valid React node too).
   */
  defaultColumnRender?: (params: { record: T; index: number; accesor: string }) => React.ReactNode;

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
   * Receives an object with the current record, its index in `records` and the click event
   * as properties.
   */
  onRowClick?: (params: { record: T; index: number; event: MouseEvent }) => void;

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
   * Can be a string or a function receiving an object with the current record and its index
   * as properties and returning a string.
   */
  rowClassName?: string | ((params: { record: T; index: number }) => string | undefined);

  /**
   * Optional style passed to each row.
   * Can be a CSS properties object or a function receiving an object with the current record and
   * its index as properties and returning a CSS properties object.
   */
  rowStyle?: MantineStyleProp | ((params: { record: T; index: number }) => MantineStyleProp | undefined);

  /**
   * Optional function returning an object of custom attributes to be applied to each row in the table.
   * Receives an object with current record and its index as properties.
   * Useful for adding data attributes, handling middle-clicks, etc.
   */
  customRowAttributes?: (params: { record: T; index: number }) => Record<string, unknown>;

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
