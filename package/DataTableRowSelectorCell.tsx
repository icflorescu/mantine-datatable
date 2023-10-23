import { Checkbox, TableTd } from '@mantine/core';

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
    <TableTd
      className="mantine-datatable-row-selector-cell"
      data-shadow-visible={withRightShadow || undefined}
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        classNames={{ input: 'mantine-datatable-row-selector-cell-checkbox' }}
        {...otherProps}
        {...getCheckboxProps(record, index)}
      />
    </TableTd>
  );
}
