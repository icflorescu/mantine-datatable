import { Checkbox, createStyles, Collapse } from '@mantine/core';
import { ChangeEventHandler, MouseEventHandler } from 'react';
import { DataTableColumn, ExpandedRowCollapseProps } from './DataTable.props';
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
    selectorCellWithRightShadow: {
      '&::after': {
        opacity: 1,
      },
    },
    selectorCheckboxInput: {
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
    expandedRow: {
      padding: '0 !important',
    },
    expandedRow__collapsed: {
      border: '0 !important',
    },
  };
});

interface DataTableRowBaseProps<T> {
  record: T;
  columns: DataTableColumn<T>[];
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onClick: MouseEventHandler<HTMLTableRowElement> | undefined;
  onContextMenu: MouseEventHandler<HTMLTableRowElement> | undefined;
  contextMenuVisible: boolean;
  leftShadowVisible: boolean;
}

interface DataTableRowChildProps<T> extends DataTableRowBaseProps<T> {
  styles: ReturnType<typeof useStyles>;
}

interface DataTableRowParentProps<T> extends DataTableRowBaseProps<T> {
  expandedRow: ((record: T) => React.ReactNode) | undefined;
  isExpanded: boolean;
  collapseProps: ExpandedRowCollapseProps;
}

export default function DataTableRowParent<T>({
  record,
  columns,
  selectionVisible,
  selectionChecked,
  onSelectionChange,
  onClick,
  onContextMenu,
  contextMenuVisible,
  leftShadowVisible,
  expandedRow,
  isExpanded,
  collapseProps,
}: DataTableRowParentProps<T>) {
  const styles = useStyles();
  const { cx, classes } = styles;

  const dataTableRow = DataTableRow({
    record,
    columns,
    selectionVisible,
    selectionChecked,
    onSelectionChange,
    onClick,
    onContextMenu,
    contextMenuVisible,
    leftShadowVisible,
    styles,
  });

  if (expandedRow) {
    const { animateOpacity, transitionDuration, transitionTimingFunction } = collapseProps;
    const columnCount = selectionVisible ? columns.length + 1 : columns.length;
    return (
      <>
        {dataTableRow}
        <tr>
          <td
            colSpan={columnCount}
            className={cx(classes.expandedRow, { [classes.expandedRow__collapsed]: !isExpanded })}
          >
            <Collapse
              in={isExpanded}
              animateOpacity={animateOpacity}
              transitionDuration={transitionDuration}
              transitionTimingFunction={transitionTimingFunction}
            >
              {expandedRow(record)}
            </Collapse>
          </td>
        </tr>
      </>
    );
  } else {
    return dataTableRow;
  }
}

function DataTableRow<T>({
  record,
  columns,
  selectionVisible,
  selectionChecked,
  onSelectionChange,
  onClick,
  onContextMenu,
  contextMenuVisible,
  leftShadowVisible,
  styles,
}: DataTableRowChildProps<T>) {
  const { cx, classes } = styles;

  return (
    <tr
      className={cx({
        [classes.withClickHandler]: onClick,
        [classes.selected]: selectionChecked,
        [classes.contextMenuVisible]: contextMenuVisible,
      })}
      onClick={onClick}
      onContextMenu={onContextMenu}
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
      {columns.map(
        ({
          accessor,
          visibleMediaQuery,
          textAlignment,
          ellipsis,
          width,
          render,
          cellsClassName,
          cellsStyle,
          cellsSx,
        }) => (
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
