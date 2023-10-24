import { Checkbox, TableTh } from '@mantine/core';
import { POINTER_CURSOR } from './utilityClasses';

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
        classNames={{ input: POINTER_CURSOR }}
        checked={checked}
        indeterminate={indeterminate}
        disabled={!onChange}
        onChange={onChange}
        {...checkboxProps}
      />
    </TableTh>
  );
}
