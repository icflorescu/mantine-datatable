'use client';

import { Checkbox, TableTd, type CheckboxProps } from '@mantine/core';
import { POINTER_CURSOR } from './utilityClasses';

type DataTableRowSelectorCellProps<T> = {
  record: T;
  index: number;
  withRightShadow: boolean;
  checked: boolean;
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  getCheckboxProps: (record: T, index: number) => CheckboxProps;
};

export function DataTableRowSelectorCell<T>({
  record,
  index,
  withRightShadow,
  getCheckboxProps,
  ...otherProps
}: DataTableRowSelectorCellProps<T>) {
  return (
    <TableTd
      className="mantine-datatable-row-selector-cell"
      data-shadow-visible={withRightShadow || undefined}
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox classNames={{ input: POINTER_CURSOR }} {...otherProps} {...getCheckboxProps(record, index)} />
    </TableTd>
  );
}
