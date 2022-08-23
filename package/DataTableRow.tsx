import { Checkbox, createStyles } from '@mantine/core';
import { ChangeEventHandler, MouseEvent } from 'react';
import { DataTableColumn } from './DataTable.props';
import DataTableRowCell from './DataTableRowCell';

const useStyles = createStyles((theme) => {
  const baseColor = theme.colors[theme.primaryColor][6];
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.5 : 0.05;
  return {
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
    menuVisible: {
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
  expandedColumnPropertyName: string | undefined;
  columns: DataTableColumn<T>[];
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: ChangeEventHandler<HTMLInputElement> | undefined;
  menu:
    | {
        trigger: 'click' | 'rightClick';
        onShow: (info: { top: number; left: number; record: T }) => void;
      }
    | undefined;
  menuVisible: boolean;
  leftShadowVisible: boolean;
};

export default function DataTableRow<T>({
  record,
  expandedColumnPropertyName,
  columns,
  selectionVisible,
  selectionChecked,
  onSelectionChange,
  menu,
  menuVisible,
  leftShadowVisible,
}: DataTableRowProps<T>) {
  const showMenu = menu
    ? (e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        menu.onShow({ top: e.clientY, left: e.clientX, record });
      }
    : undefined;

  const { cx, classes } = useStyles();

  return (
    <tr
      className={cx({
        [classes.selected]: selectionChecked,
        [classes.menuVisible]: menuVisible,
      })}
      onClick={menu?.trigger === 'click' ? showMenu : undefined}
      onContextMenu={menu?.trigger === 'rightClick' ? showMenu : undefined}
    >
      {selectionVisible && (
        <td className={cx(classes.selectorCell, { [classes.selectorCellWithRightShadow]: leftShadowVisible })}>
          <Checkbox
            classNames={{ input: classes.selectorCheckboxInput }}
            checked={selectionChecked}
            disabled={!onSelectionChange}
            onChange={onSelectionChange}
          />
        </td>
      )}
      {columns.map(({ propertyName, visibleMediaQuery, textAlign, ellipsis, width, render }) => (
        <DataTableRowCell<T>
          key={propertyName}
          visibleMediaQuery={visibleMediaQuery}
          record={record}
          propertyName={propertyName}
          expandedColumnPropertyName={expandedColumnPropertyName}
          textAlign={textAlign}
          ellipsis={ellipsis}
          width={width}
          render={render}
        />
      ))}
    </tr>
  );
}
