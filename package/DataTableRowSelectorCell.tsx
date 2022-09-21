import { Checkbox, createStyles } from '@mantine/core';
import { ChangeEventHandler } from 'react';

const useStyles = createStyles((theme) => {
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.5 : 0.05;
  return {
    root: {
      position: 'sticky',
      zIndex: 1,
      left: 0,
      background: 'inherit',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: -theme.spacing.sm,
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

type DataTableRowSelectorCellProps = {
  withRightShadow: boolean;
  checked: boolean;
  disabled: boolean;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function DataTableRowSelectorCell({ withRightShadow, ...otherProps }: DataTableRowSelectorCellProps) {
  const { cx, classes } = useStyles();
  return (
    <td className={cx(classes.root, { [classes.withRightShadow]: withRightShadow })}>
      <Checkbox classNames={{ input: classes.checkbox }} {...otherProps} onClick={(e) => e.stopPropagation()} />
    </td>
  );
}
