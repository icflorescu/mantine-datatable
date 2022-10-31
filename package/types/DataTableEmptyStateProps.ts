import type { ReactNode } from 'react';

export type DataTableEmptyStateProps =
  | {
      /**
       * Content to show when no records are available; the provided content
       * will be overlaid and centered automatically
       */
      emptyState?: ReactNode;

      noRecordsIcon?: never;
    }
  | {
      emptyState?: never;

      /**
       * Icon to show when no records are available
       */
      noRecordsIcon?: ReactNode;
    };
