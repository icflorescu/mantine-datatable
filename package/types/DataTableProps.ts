import type { MantineColorScheme, MantineShadow, ScrollAreaProps, TableProps } from '@mantine/core';
import type { CSSProperties, Key, MouseEvent, ReactNode, RefObject } from 'react';
import type {
  DataTableCellClickHandler,
  DataTableContextMenuProps,
  DataTableDefaultColumnProps,
  DataTableEmptyStateProps,
  DataTableOuterBorderProps,
  DataTablePaginationProps,
  DataTableRowExpansionProps,
  DataTableSelectionProps,
  DataTableSortProps,
  DataTableVerticalAlignment,
} from './';
import type { DataTableColumnProps } from './DataTableColumnProps';
import type { DataTableLoaderProps } from './DataTableLoaderProps';

export type DataTableProps<T> = {
  /**
   * Table height; defaults to `100%`
   */
  height?: string | number;

  /**
   * Minimum table height
   */
  minHeight?: string | number;

  /**
   * `DataTable` component shadow
   */
  shadow?: MantineShadow;

  /**
   * If true, columns will have vertical borders
   */
  withColumnBorders?: boolean;

  /**
   * Table border color, applied to the outer border, the header bottom border, and the pagination
   * footer top border; defaults to
   * `(theme) => (theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3])`
   */
  borderColor?: string | ((theme: MantineColorScheme) => string);

  /**
   * Row border color; defaults to
   * `(theme) => (theme.fn.rgba(theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3], 0.65))`
   */
  rowBorderColor?: string | ((theme: MantineColorScheme) => string);

  /**
   * If true, the user will not be able to select text
   */
  textSelectionDisabled?: boolean;

  /**
   * Vertical alignment for row cells; defaults to `center`
   */
  verticalAlignment?: DataTableVerticalAlignment;

  /**
   * If true, will show a loader with semi-transparent background, centered over the table
   */
  fetching?: boolean;

  /**
   * Default column props; will be merged with column props provided to each column
   */
  defaultColumnProps?: DataTableDefaultColumnProps<T>;

  /**
   * A default render function for all columns; accepts the current record, its index in `records`
   * and the column accessor
   */
  defaultColumnRender?: (record: T, index: number, accesor: string) => ReactNode;

  /**
   * Accessor to use as unique record key; can be a string representing a property name
   * or a function receiving the current record and returning a unique value.
   * If you're providing a string, you can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`);
   * defaults to `id`
   */
  idAccessor?: string | ((record: T) => Key);

  /**
   * Visible records; the `DataTable` component will try to infer its row type from here
   */
  records?: T[];

  /**
   * Text to show on empty state and pagination footer when no records are available
   */
  noRecordsText?: string;

  /**
   * If true, the table will not show the header with column titles
   */
  noHeader?: boolean;

  /**
   * Function to call when a row cell is clicked
   */
  onCellClick?: DataTableCellClickHandler<T>;

  /**
   * Function to call when a row is clicked, receiving the current record, its index in `records` and the click event
   */
  onRowClick?: (record: T, recordIndex: number, event: MouseEvent) => void;

  /**
   * Function to call when the DataTable is scrolled to top
   */
  onScrollToTop?: () => void;

  /**
   * Function to call when the DataTable is scrolled to bottom
   */
  onScrollToBottom?: () => void;

  /**
   * Function to call when the DataTable is scrolled to left
   */
  onScrollToLeft?: () => void;

  /**
   * Function to call when the DataTable is scrolled to right
   */
  onScrollToRight?: () => void;

  /**
   * Defines a context-menu to show when user right-clicks or clicks on a row
   */
  rowContextMenu?: DataTableContextMenuProps<T>;

  /**
   * Defines the row expansion behavior
   */
  rowExpansion?: DataTableRowExpansionProps<T>;

  /**
   * Optional class name passed to each row; can be a string or a function
   * receiving the current record and its index as arguments and returning a string
   */
  rowClassName?: string | ((record: T, recordIndex: number) => string | undefined);

  /**
   * Optional style passed to each row; can be a CSS properties object or
   * a function receiving the current record and its index as arguments and returning a CSS properties object
   */
  rowStyle?: CSSProperties | ((record: T, recordIndex: number) => CSSProperties | undefined);

  /**
   * Optional function returning an object of custom attributes to be applied to each row in the table.
   * Receives the current record and its index as arguments.
   * Useful for adding data attributes, handling middle-clicks, etc.
   */
  customRowAttributes?: (record: T, recordIndex: number) => Record<string, unknown>;

  /**
   * Ref pointing to the scrollable viewport element; useful for imperative scrolling
   */
  scrollViewportRef?: RefObject<HTMLDivElement>;

  /**
   * Additional props passed to the underlying `ScrollArea` element
   */
  scrollAreaProps?: Omit<ScrollAreaProps, 'classNames' | 'styles' | 'onScrollPositionChange'>;
  /**
   * Ref pointing to the table body element
   */
  bodyRef?: ((instance: HTMLTableSectionElement | null) => void) | RefObject<HTMLTableSectionElement>;
} & Pick<TableProps, 'striped' | 'highlightOnHover' | 'horizontalSpacing' | 'verticalSpacing' | 'fontSize'> &
  Omit<
    DefaultProps<'root' | 'header' | 'footer' | 'pagination', CSSProperties>,
    'unstyled' | 'p' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr'
  > &
  DataTableColumnProps<T> &
  DataTableOuterBorderProps &
  DataTableLoaderProps &
  DataTableEmptyStateProps &
  DataTablePaginationProps &
  DataTableSortProps &
  DataTableSelectionProps<T>;
