import { Checkbox } from '@mantine/core';
import clsx from 'clsx';

type DataTableRowSelectorCellProps<T> = {
  record: T;
  recordIndex: number;
  withRightShadow: boolean;
  checked: boolean;
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  getCheckboxProps: (record: T, recordIndex: number) => Record<string, unknown>;
};

export function DataTableRowSelectorCell<T>({
  record,
  recordIndex,
  withRightShadow,
  getCheckboxProps,
  ...otherProps
}: DataTableRowSelectorCellProps<T>) {
  return (
    <td
      className={clsx('mantine-datatable-row-selector-cell', {
        'mantine-datatable-row-selector-cell-with-right-shadow': withRightShadow,
      })}
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        classNames={{ input: 'mantine-datatable-row-selector-cell-checkbox' }}
        {...otherProps}
        {...getCheckboxProps(record, recordIndex)}
      />
    </td>
  );
}
