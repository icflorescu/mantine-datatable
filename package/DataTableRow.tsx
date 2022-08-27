import { Checkbox, createStyles } from '@mantine/core';
import { ChangeEventHandler } from 'react';
import { DataTableColumn } from './DataTable.props';
import DataTableRowCell from './DataTableRowCell';

const useStyles = createStyles((theme) => {
  const baseColor = theme.colors[theme.primaryColor][6];
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.5 : 0.05;
  return {
    withClickHandler: {
      cursor: 'pointer',
    },
    selectorCell: {
      position: 'sticky',
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
    selectorCellWithRightShadow: {
      '&::after': {
        opacity: 1,
      },
    },
    selectorCheckboxInput: {
      cursor: 'pointer',
    },
    selected: {
      'tr&': {
        background: theme.colorScheme === 'dark' ? theme.fn.darken(baseColor, 0.6) : theme.fn.lighten(baseColor, 0.9),
      },
      'table[data-striped] tbody &:nth-of-type(odd)': {
        background: theme.colorScheme === 'dark' ? theme.fn.darken(baseColor, 0.55) : theme.fn.lighten(baseColor, 0.85),
      },
    },
    contextMenuVisible: {
      'tr&': {
        background: theme.colorScheme === 'dark' ? theme.fn.darken(baseColor, 0.5) : theme.fn.lighten(baseColor, 0.7),
      },
      'table[data-striped] tbody &:nth-of-type(odd)': {
        background: theme.colorScheme === 'dark' ? theme.fn.darken(baseColor, 0.45) : theme.fn.lighten(baseColor, 0.65),
      },
    },
  };
});

type DataTableRowProps<T> = {
  record: T;
  columns: DataTableColumn<T>[];
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onClick: ((record: T) => void) | undefined;
  onContextMenu: ((info: { top: number; left: number; record: T }) => void) | undefined;
  contextMenuVisible: boolean;
  leftShadowVisible: boolean;
};

export default function DataTableRow<T>({
  record,
  columns,
  selectionVisible,
  selectionChecked,
  onSelectionChange,
  onClick,
  onContextMenu,
  contextMenuVisible,
  leftShadowVisible,
}: DataTableRowProps<T>) {
  const { cx, classes } = useStyles();

  return (
    <tr
      className={cx({
        [classes.withClickHandler]: onClick,
        [classes.selected]: selectionChecked,
        [classes.contextMenuVisible]: contextMenuVisible,
      })}
      onClick={onClick ? () => onClick(record) : undefined}
      onContextMenu={
        onContextMenu
          ? (e) => {
              e.preventDefault();
              onContextMenu({ top: e.clientY, left: e.clientX, record });
            }
          : undefined
      }
    >
      {selectionVisible && (
        <td className={cx(classes.selectorCell, { [classes.selectorCellWithRightShadow]: leftShadowVisible })}>
          <Checkbox
            classNames={{ input: classes.selectorCheckboxInput }}
            checked={selectionChecked}
            disabled={!onSelectionChange}
            onChange={onSelectionChange}
            onClick={(e) => e.stopPropagation()}
          />
        </td>
      )}
      {columns.map(({ accessor, visibleMediaQuery, textAlign, ellipsis, width, render }) => (
        <DataTableRowCell<T>
          key={accessor}
          visibleMediaQuery={visibleMediaQuery}
          record={record}
          accessor={accessor}
          textAlign={textAlign}
          ellipsis={ellipsis}
          width={width}
          render={render}
        />
      ))}
    </tr>
  );
}
