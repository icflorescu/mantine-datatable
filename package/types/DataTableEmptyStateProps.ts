export type DataTableEmptyStateProps =
  | {
      /**
       * Content to show when no records are available.
       * The provided content will be overlaid and centered automatically.
       * You can either provide this property or `noRecordsIcon`, but not both.
       */
      emptyState?: React.ReactNode;

      noRecordsIcon?: never;
    }
  | {
      emptyState?: never;

      /**
       * Icon to show when no records are available.
       * The provided icon will be overlaid and centered automatically.
       * You can either provide this property or `emptyState`, but not both.
       */
      noRecordsIcon?: React.ReactNode;
    };
