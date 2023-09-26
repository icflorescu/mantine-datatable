import { Checkbox } from '@mantine/core';
import type { ChangeEventHandler } from 'react';
import classes from './styles/DataTableRowSelectorCell.css';
import cx from 'clsx';

type DataTableRowSelectorCellProps<T> = {
  record: T;
  recordIndex: number;
  withRightShadow: boolean;
  checked: boolean;
  disabled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  getCheckboxProps: (record: T, recordIndex: number) => Record<string, unknown>;
};

export default function DataTableRowSelectorCell<T>({
  record,
  recordIndex,
  withRightShadow,
  getCheckboxProps,
  ...otherProps
}: DataTableRowSelectorCellProps<T>) {
  return (
    <td
      className={cx(classes.root, withRightShadow ? classes.withRightShadow : null)}
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox styles={{ input: {cursor: 'pointer'} }} {...otherProps} {...getCheckboxProps(record, recordIndex)} />
    </td>
  );
}
