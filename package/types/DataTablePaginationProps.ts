import type { MantineColor, MantineNumberSize, MantineSize } from '@mantine/core';
import type { ReactNode } from 'react';
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
      paginationText?: never;
      paginationWrapBreakpoint?: never;
      getPaginationControlProps?: never;
    }
  | {
      /**
       * Current page number (1-based); if provided, a pagination component is shown
       */
      page: number;

      /**
       * Callback fired after change of each page
       */
      onPageChange: (page: number) => void;

      /**
       * Total number of records in the dataset
       */
      totalRecords: number | undefined;

      /**
       * Number of records per page
       */
      recordsPerPage: number;

      /**
       * Pagination component size; defaults to `sm`
       */
      paginationSize?: MantineSize;

      /**
       * Pagination component color; defaults to primary theme color
       */
      paginationColor?: MantineColor;

      /**
       * Text to show while records are loading
       */
      loadingText?: string;

      /**
       * Pagination text; defaults to ```({ from, to, totalRecords }) => `${from}-${to}/${totalRecords}`
       * ```
       */
      paginationText?: (options: { from: number; to: number; totalRecords: number }) => ReactNode;

      /**
       * Pagination wrap breakpoints; defaults to `sm`.
       * Below this breakpoint the content will be displayed on multiple lines;
       * above it the content will be displayed on a single line.
       */
      paginationWrapBreakpoint?: MantineNumberSize;

      /**
       * Function that returns props object for pagination control; useful for improving accessibility
       */
      getPaginationControlProps?: (control: 'previous' | 'next') => Record<string, unknown>;
    }
) &
  DataTablePageSizeSelectorProps;
