import type { MantineColor, MantineSize } from '@mantine/core';
import type { DataTablePageSizeSelectorProps } from './DataTablePageSizeSelectorProps';

export type DataTablePaginationProps = (
  | {
      page?: never;
      onPageChange?: never;
      totalRecords?: never;
      recordsPerPage?: never;
      paginationColor?: never;
      paginationSize?: never;
      loadingText?: never;
      paginationWithEdges?: never;
      paginationText?: never;
      paginationWrapBreakpoint?: never;
      getPaginationControlProps?: never;
    }
  | {
      /**
       * Whenther to show first and last page navigation buttons.
       */
      paginationWithEdges?: boolean;

      /**
       * Current page number (1-based).
       * If provided, a pagination component is shown.
       */
      page: number;

      /**
       * Callback fired after page change.
       * Receives the new page number as argument.
       */
      onPageChange: (page: number) => void;

      /**
       * Total number of records in the dataset.
       */
      totalRecords: number | undefined;

      /**
       * Number of records per page.
       */
      recordsPerPage: number;

      /**
       * Pagination component size.
       * @default `sm`
       */
      paginationSize?: MantineSize;

      /**
       * Pagination component color.
       * Defaults to primary theme color.
       */
      paginationColor?: MantineColor;

      /**
       * Text to show while records are loading.
       */
      loadingText?: string;

      /**
       * Pagination text. Defaults to ```({ from, to, totalRecords }) => `${from}-${to}/${totalRecords}`
       * ```
       */
      paginationText?: (params: { from: number; to: number; totalRecords: number }) => React.ReactNode;

      /**
       * Pagination wrap breakpoints.
       * Below this breakpoint the content will be displayed on multiple lines,
       * above it the content will be displayed on a single line.
       * @default `sm`
       */
      paginationWrapBreakpoint?: MantineSize | (string & NonNullable<unknown>) | number;

      /**
       * Function that returns props object for pagination control.
       * Useful for improving accessibility.
       */
      getPaginationControlProps?: (control: 'first' | 'last' | 'previous' | 'next') => Record<string, unknown>;
    }
) &
  DataTablePageSizeSelectorProps;
