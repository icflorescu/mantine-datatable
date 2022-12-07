import type { DefaultProps, MantineShadow, MantineTheme, TableProps } from '@mantine/core';
import type { CSSProperties } from 'react';
import type { DataTableCellClickHandler } from './DataTableCellClickHandler';
import type { DataTableColumn } from './DataTableColumn';
import type { DataTableContextMenuProps } from './DataTableContextMenuProps';
import type { DataTableEmptyStateProps } from './DataTableEmptyStateProps';
import { DataTableLoaderProps } from './DataTableLoaderProps';
import type { DataTableOuterBorderProps } from './DataTableOuterBorderProps';
import type { DataTablePaginationProps } from './DataTablePaginationProps';
import type { DataTableRowExpansionProps } from './DataTableRowExpansionProps';
import type { DataTableSelectionProps } from './DataTableSelectionProps';
import type { DataTableSortProps } from './DataTableSortProps';
import type { DataTableVerticalAlignment } from './DataTableVerticalAlignment';

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
  borderColor?: string | ((theme: MantineTheme) => string);

  /**
   * Row border color; defaults to
   * `(theme) => (theme.fn.rgba(theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3], 0.65))`
   */
  rowBorderColor?: string | ((theme: MantineTheme) => string);

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
   * Visible columns
   */
  columns: DataTableColumn<T>[];

  /**
   * Accessor to use as unique record key; you can use dot-notation for nested objects property drilling
   * (i.e. `department.name` or `department.company.name`);
   * defaults to `id`
   */
  idAccessor?: string;

  /**
   * Visible records; the `DataTable` component will try to infer its row type from here
   */
  records?: T[];

  /**
   * Text to show on empty state and pagination footer when no records are available
   */
  noRecordsText?: string;

  /**
   * Function to call when a row cell is clicked
   */
  onCellClick?: DataTableCellClickHandler<T>;

  /**
   * Function to call when a row is clicked, accepting the current record and its index in `records`
   */
  onRowClick?: (record: T, recordIndex: number) => void;

  /**
   * Defines a context-menu to show when user right-clicks or clicks on a row
   */
  rowContextMenu?: DataTableContextMenuProps<T>;

  /**
   * Defines the row expansion behavior
   */
  rowExpansion?: DataTableRowExpansionProps<T>;

  /**
   * Optional function returning an object of custom attributes to be applied to each row in the table
   */
  customRowAttributes?: (record: T, recordIndex: number) => Record<string, string | number>;
} & Pick<TableProps, 'striped' | 'highlightOnHover' | 'horizontalSpacing' | 'verticalSpacing' | 'fontSize'> &
  Omit<
    DefaultProps<'root' | 'header' | 'pagination', CSSProperties>,
    'unstyled' | 'p' | 'px' | 'py' | 'pt' | 'pb' | 'pl' | 'pr'
  > &
  DataTableOuterBorderProps &
  DataTableLoaderProps &
  DataTableEmptyStateProps &
  DataTablePaginationProps &
  DataTableSortProps &
  DataTableSelectionProps<T>;
