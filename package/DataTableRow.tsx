import { createStyles } from '@mantine/core';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { DataTableColumn } from './DataTable.props';
import DataTableRowCell from './DataTableRowCell';
import DataTableRowSelectorCell from './DataTableRowSelectorCell';

const useStyles = createStyles((theme) => {
  const baseColor = theme.colors[theme.primaryColor][6];
  return {
    withPointerCursor: {
      cursor: 'pointer',
    },
    selected: {
      '&&': {
        'tr&': {
          background: theme.colorScheme === 'dark' ? theme.fn.darken(baseColor, 0.6) : theme.fn.lighten(baseColor, 0.9),
        },
        'table[data-striped] tbody &:nth-of-type(odd)': {
          background:
            theme.colorScheme === 'dark' ? theme.fn.darken(baseColor, 0.55) : theme.fn.lighten(baseColor, 0.85),
        },
      },
    },
    contextMenuVisible: {
      '&&': {
        'tr&': {
          background: theme.colorScheme === 'dark' ? theme.fn.darken(baseColor, 0.5) : theme.fn.lighten(baseColor, 0.7),
        },
        'table[data-striped] tbody &:nth-of-type(odd)': {
          background:
            theme.colorScheme === 'dark' ? theme.fn.darken(baseColor, 0.45) : theme.fn.lighten(baseColor, 0.65),
        },
      },
    },
  };
});

type DataTableRowProps<T> = {
  record: T;
  columns: DataTableColumn<T>[];
  withPointerCursor: boolean;
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onClick: MouseEventHandler<HTMLTableRowElement> | undefined;
  onContextMenu: MouseEventHandler<HTMLTableRowElement> | undefined;
  contextMenuVisible: boolean;
  leftShadowVisible: boolean;
};

export default function DataTableRow<T>({
  record,
  columns,
  withPointerCursor,
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
        [classes.withPointerCursor]: withPointerCursor,
        [classes.selected]: selectionChecked,
        [classes.contextMenuVisible]: contextMenuVisible,
      })}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {selectionVisible && (
        <DataTableRowSelectorCell
          withRightShadow={leftShadowVisible}
          checked={selectionChecked}
          disabled={!onSelectionChange}
          onChange={onSelectionChange}
        />
      )}
      {columns.map(
        ({
          accessor,
          hidden,
          visibleMediaQuery,
          textAlignment,
          ellipsis,
          width,
          render,
          cellsClassName,
          cellsStyle,
          cellsSx,
        }) =>
          hidden ? null : (
            <DataTableRowCell<T>
              key={accessor}
              className={typeof cellsClassName === 'function' ? cellsClassName(record) : cellsClassName}
              style={typeof cellsStyle === 'function' ? cellsStyle(record) : cellsStyle}
              sx={cellsSx}
              visibleMediaQuery={visibleMediaQuery}
              record={record}
              accessor={accessor}
              textAlignment={textAlignment}
              ellipsis={ellipsis}
              width={width}
              render={render}
            />
          )
      )}
    </tr>
  );
}
