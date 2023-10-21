import { Checkbox, TableTh } from '@mantine/core';
import clsx from 'clsx';

type DataTableHeaderSelectorCellProps = {
  shadowVisible: boolean;
  checked: boolean;
  indeterminate: boolean;
  checkboxProps: Record<string, unknown>;
  onChange: (() => void) | undefined;
  rowSpan: number | undefined;
};

export function DataTableHeaderSelectorCell({
  shadowVisible,
  checked,
  indeterminate,
  checkboxProps,
  onChange,
  rowSpan,
}: DataTableHeaderSelectorCellProps) {
  return (
    <TableTh
      className={clsx('mantine-datatable-header-selector-cell', {
        'mantine-datatable-header-selector-cell-shadow-visible': shadowVisible,
      })}
      rowSpan={rowSpan}
    >
      <Checkbox
        classNames={{ input: 'mantine-datatable-header-selector-cell-checkbox-input' }}
        checked={checked}
        indeterminate={indeterminate}
        disabled={!onChange}
        onChange={onChange}
        {...checkboxProps}
      />
    </TableTh>
  );
}
