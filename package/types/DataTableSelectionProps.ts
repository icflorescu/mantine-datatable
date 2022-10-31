export type DataTableSelectionProps<T> =
  | {
      selectedRecords?: never;
      onSelectedRecordsChange?: never;
      isRecordSelectable?: never;
    }
  | {
      /**
       * Currently-selected records
       */
      selectedRecords: T[];

      /**
       * Callback fired when selected records change
       */
      onSelectedRecordsChange?: (selectedRecords: T[]) => void;

      /**
       * A function used to determine whether a certain record is selectable;
       * if the function returns false, the row selection checkbox is disabled
       */
      isRecordSelectable?: (record: T, index: number) => boolean;
    };
