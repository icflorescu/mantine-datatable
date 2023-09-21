import { Checkbox } from '@mantine/core';
import classes from './styles/DataTableHeaderSelectorCell.css';
import cx from 'clsx';

type DataTableHeaderSelectorCellProps = {
  shadowVisible: boolean;
  checked: boolean;
  indeterminate: boolean;
  checkboxProps: Record<string, unknown>;
  onChange: (() => void) | undefined;
  rowSpan: number | undefined;
};

export default function DataTableHeaderSelectorCell({
  shadowVisible,
  checked,
  indeterminate,
  checkboxProps,
  onChange,
  rowSpan,
}: DataTableHeaderSelectorCellProps) {
  return (
    <th className={cx(classes.root, { [classes.shadowVisible]: shadowVisible })} rowSpan={rowSpan}>
      <Checkbox
        classNames={{ input: classes.checkboxInput }}
        checked={checked}
        indeterminate={indeterminate}
        disabled={!onChange}
        onChange={onChange}
        {...checkboxProps}
      />
    </th>
  );
}
