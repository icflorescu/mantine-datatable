import { createStyles } from '@mantine/core';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { DataTableColumn } from './DataTable.props';
import DataTableRowCell from './DataTableRowCell';
import DataTableRowExpansion from './DataTableRowExpansion';
import DataTableRowSelectorCell from './DataTableRowSelectorCell';
import { useRowExpansion } from './hooks';

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
  recordIndex: number;
  columns: DataTableColumn<T>[];
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onClick: MouseEventHandler<HTMLTableRowElement> | undefined;
  onContextMenu: MouseEventHandler<HTMLTableRowElement> | undefined;
  expansion: ReturnType<typeof useRowExpansion<T>>;
  contextMenuVisible: boolean;
  leftShadowVisible: boolean;
};

export default function DataTableRow<T>({
  record,
  recordIndex,
  columns,
  selectionVisible,
  selectionChecked,
  onSelectionChange,
  onClick,
  onContextMenu,
  expansion,
  contextMenuVisible,
  leftShadowVisible,
}: DataTableRowProps<T>) {
  const { cx, classes } = useStyles();

  return (
    <>
      <tr
        className={cx({
          [classes.withPointerCursor]: onClick || expansion?.expandOnClick,
          [classes.selected]: selectionChecked,
          [classes.contextMenuVisible]: contextMenuVisible,
        })}
        onClick={(e) => {
          if (expansion) {
            const { isRowExpanded, expandOnClick, expandRow, collapseRow } = expansion;
            if (expandOnClick) {
              if (isRowExpanded(record)) {
                collapseRow(record);
              } else {
                expandRow(record);
              }
            }
          }
          onClick?.(e);
        }}
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
                className={typeof cellsClassName === 'function' ? cellsClassName(record, recordIndex) : cellsClassName}
                style={typeof cellsStyle === 'function' ? cellsStyle(record, recordIndex) : cellsStyle}
                sx={cellsSx}
                visibleMediaQuery={visibleMediaQuery}
                record={record}
                recordIndex={recordIndex}
                accessor={accessor}
                textAlignment={textAlignment}
                ellipsis={ellipsis}
                width={width}
                render={render}
              />
            )
        )}
      </tr>
      {expansion && (
        <DataTableRowExpansion
          colSpan={columns.filter((c) => !c.hidden).length + (selectionVisible ? 1 : 0)}
          open={expansion.isRowExpanded(record)}
          content={expansion.content(record, recordIndex)}
          collapseProps={expansion.collapseProps}
        />
      )}
    </>
  );
}
