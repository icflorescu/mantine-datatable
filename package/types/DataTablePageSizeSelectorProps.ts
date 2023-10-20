export type DataTablePageSizeSelectorProps =
  | {
      onRecordsPerPageChange?: never;
      recordsPerPageOptions?: never;
      recordsPerPageLabel?: never;
    }
  | {
      /**
       * Callback fired a new page size is selected.
       * Receives new page size as argument.
       */
      onRecordsPerPageChange: (recordsPerPage: number) => void;

      /**
       * Array of page sizes (numbers) to show in records per page selector.
       */
      recordsPerPageOptions: number[];

      /**
       * Label for records per page selector.
       */
      recordsPerPageLabel?: string;
    };
