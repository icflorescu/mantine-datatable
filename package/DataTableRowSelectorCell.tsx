import { Checkbox, createStyles, px } from '@mantine/core';
import type { ChangeEventHandler } from 'react';

const useStyles = createStyles((theme) => {
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.5 : 0.05;
  return {
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
        right: -px(theme.spacing.sm),
        bottom: 0,
        borderLeft: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
        width: theme.spacing.sm,
        background: `linear-gradient(to right, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
          theme.black,
          0
        )}), linear-gradient(to right, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
          theme.black,
          0
        )} 30%)`,
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
});

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
  const { cx, classes } = useStyles();
  return (
    <td
      className={cx(classes.root, { [classes.withRightShadow]: withRightShadow })}
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox classNames={{ input: classes.checkbox }} {...otherProps} {...getCheckboxProps(record, recordIndex)} />
    </td>
  );
}
