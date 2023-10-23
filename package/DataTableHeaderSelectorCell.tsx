import { Checkbox, TableTh } from '@mantine/core';

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
      className="mantine-datatable-header-selector-cell"
      rowSpan={rowSpan}
      data-shadow-visible={shadowVisible || undefined}
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
