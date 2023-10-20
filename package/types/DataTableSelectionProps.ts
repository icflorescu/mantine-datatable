export type DataTableSelectionProps<T> =
  | {
      selectedRecords?: never;
      onSelectedRecordsChange?: never;
      isRecordSelectable?: never;
      getRecordSelectionCheckboxProps?: never;
      allRecordsSelectionCheckboxProps?: never;
    }
  | {
      /**
       * Currently-selected records.
       */
      selectedRecords?: T[];

      /**
       * Callback fired when selected records change.
       * Receives and array of selected records as argument.
       */
      onSelectedRecordsChange?: (selectedRecords: T[]) => void;

      /**
       * A function used to determine whether a certain record is selectable.
       * if the function returns false, the row selection checkbox is disabled.
       * Accepts an object with `record` and `index` properties and returns a boolean.
       */
      isRecordSelectable?: (options: { record: T; index: number }) => boolean;

      /**
       * A function used to determine additional props of the row selection checkbox.
       * Accepts an object with `record` and `index` properties and returns an object.
       */
      getRecordSelectionCheckboxProps?: (options: { record: T; index: number }) => Record<string, unknown>;

      /**
       * Additional props for the header checkbox that toggles selection of all records.
       */
      allRecordsSelectionCheckboxProps?: Record<string, unknown>;
    };
