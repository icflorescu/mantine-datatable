import { Checkbox } from '@mantine/core';
import clsx from 'clsx';

type DataTableRowSelectorCellProps<T> = {
  record: T;
  index: number;
  withRightShadow: boolean;
  checked: boolean;
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  getCheckboxProps: (record: T, index: number) => Record<string, unknown>;
};

export function DataTableRowSelectorCell<T>({
  record,
  index,
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
        {...getCheckboxProps(record, index)}
      />
    </td>
  );
}
