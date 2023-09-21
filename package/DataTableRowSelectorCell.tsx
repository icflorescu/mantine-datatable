import { Checkbox } from '@mantine/core';
import type { ChangeEventHandler } from 'react';
import classes from './styles/DataTableRowSelectorCell.css';
import cx from 'clsx';

const shadowGradientAlpha = 'light-dark(0.05, 0.5)';
const classes = {
  root: {
    position: 'sticky',
    zIndex: 1,
    width: 0,
    left: 0,
    background: 'inherit',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: '-px(var(--mantine-spacing-sm))',
      bottom: 0,
      borderLeft: `1px solid light-dark(var(--mantine-color-dark-4), var(--mantine-color-gray-3))`,
      width: 'var(--mantine-spacing-sm)',
      background: `linear-gradient(to right, rgb(var(--mantine-color-black), ${shadowGradientAlpha})}, rgb(var(--mantine-color-black), 0)), 
      linear-gradient(to right, rgb(var(--mantine-color-black), ${shadowGradientAlpha})}, rgb(var(--mantine-color-black), 30%))`,
      pointerEvents: 'none',
      opacity: 0,
      transition: 'opacity .15s ease',
    },
  },
  withRightShadow: {
    '&::after': {
      opacity: 1,
    },
  },
  checkbox: {
    cursor: 'pointer',
  },
};

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
