import type { CheckboxProps, MantineStyleProp } from '@mantine/core';
import type { DataTableSelectionTrigger } from './DataTableSelectionTrigger';

export type DataTableSelectionProps<T = Record<string, unknown>> =
  | {
      selectionTrigger?: never;
      selectedRecords?: never;
      onSelectedRecordsChange?: never;
      isRecordSelectable?: never;
      selectionCheckboxProps?: never;
      getRecordSelectionCheckboxProps?: never;
      allRecordsSelectionCheckboxProps?: never;
      selectionColumnClassName?: never;
      selectionColumnStyle?: never;
    }
  | {
      /**
       * Defines how selection is triggered.
       * @default 'checkbox'
       */
      selectionTrigger?: DataTableSelectionTrigger;

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
       * Optional class name applied to selection column.
       */
      selectionColumnClassName?: string;

      /**
       * Optional style applied to selection column.
       */
      selectionColumnStyle?: MantineStyleProp;

      /**
       * A function used to determine whether a certain record is selectable.
       * if the function returns false, the row selection checkbox is disabled.
       * Accepts the current recors and index as arguments and returns a boolean.
       */
      isRecordSelectable?: (record: T, index: number) => boolean;

      /**
       * Props for the selection checkboxes, applied to header and all rows.
       */
      selectionCheckboxProps?: CheckboxProps;

      /**
       * A function used to determine additional props of the row selection checkboxes.
       * Accepts the current record and its index as arguments and returns an object.
       */
      getRecordSelectionCheckboxProps?: (record: T, index: number) => CheckboxProps;

      /**
       * Additional props for the header checkbox that toggles selection of all records.
       */
      allRecordsSelectionCheckboxProps?: CheckboxProps;
    };
