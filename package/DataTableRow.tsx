import { TableTr, darken, lighten, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { DataTableRowCell } from './DataTableRowCell';
import { DataTableRowExpansion } from './DataTableRowExpansion';
import { DataTableRowSelectorCell } from './DataTableRowSelectorCell';
import { useRowExpansion } from './hooks';
import type { DataTableCellClickHandler, DataTableColumn, DataTableDefaultColumnProps } from './types';

type DataTableRowProps<T> = {
  record: T;
  index: number;
  columns: DataTableColumn<T>[];
  defaultColumnProps: DataTableDefaultColumnProps<T> | undefined;
  defaultColumnRender: ((record: T, index: number, accessor: string) => React.ReactNode) | undefined;
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  isRecordSelectable: ((record: T, index: number) => boolean) | undefined;
  getSelectionCheckboxProps: (record: T, index: number) => Record<string, unknown>;
  onClick: React.MouseEventHandler<HTMLTableRowElement> | undefined;
  onCellClick: DataTableCellClickHandler<T> | undefined;
  // onContextMenu: React.MouseEventHandler<HTMLTableRowElement> | undefined;
  expansion: ReturnType<typeof useRowExpansion<T>>;
  customAttributes?: (record: T, index: number) => Record<string, unknown>;
  className?: string | ((record: T, index: number) => string | undefined);
  style?: (record: T, index: number) => MantineStyleProp | undefined;
  contextMenuVisible: boolean;
  leftShadowVisible: boolean;
};

export function DataTableRow<T>({
  record,
  index,
  columns,
  defaultColumnProps,
  defaultColumnRender,
  selectionVisible,
  selectionChecked,
  onSelectionChange,
  isRecordSelectable,
  getSelectionCheckboxProps,
  onClick,
  onCellClick,
  // onContextMenu,
  expansion,
  customAttributes,
  className,
  style,
  contextMenuVisible,
  leftShadowVisible,
}: DataTableRowProps<T>) {
  return (
    <>
      <TableTr
        className={clsx(
          {
            'mantine-datatable-row-with-pointer-cursor': onClick || expansion?.expandOnClick,
            'mantine-datatable-row-selected': selectionChecked,
            'mantine-datatable-row-context-menu-visible': contextMenuVisible,
          },
          typeof className === 'function' ? className(record, index) : className
        )}
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
        style={[
          ({ colors, primaryColor }) => {
            const baseColor = colors[primaryColor][6];
            return {
              '--mantine-datatable-row-selected-background-light': lighten(baseColor, 0.9),
              '--mantine-datatable-row-selected-background-dark': darken(baseColor, 0.6),
              '--mantine-datatable-row-selected-background-odd-light': lighten(baseColor, 0.85),
              '--mantine-datatable-row-selected-background-odd-dark': darken(baseColor, 0.55),
              '--mantine-datatable-row-context-menu-visible-background-light': lighten(baseColor, 0.7),
              '--mantine-datatable-row-context-menu-visible-background-dark': darken(baseColor, 0.5),
              '--mantine-datatable-row-context-menu-visible-background-odd-light': lighten(baseColor, 0.65),
              '--mantine-datatable-row-context-menu-visible-background-odd-dark': darken(baseColor, 0.45),
            };
          },
          style?.(record, index),
        ]}
        {...customAttributes?.(record, index)}
        // onContextMenu={onContextMenu}
      >
        {selectionVisible && (
          <DataTableRowSelectorCell<T>
            record={record}
            index={index}
            withRightShadow={leftShadowVisible}
            checked={selectionChecked}
            disabled={!onSelectionChange || (isRecordSelectable ? !isRecordSelectable(record, index) : false)}
            onChange={onSelectionChange}
            getCheckboxProps={getSelectionCheckboxProps}
          />
        )}
        {columns.map(({ hidden, ...columnProps }, columnIndex) => {
          if (hidden) return null;

          const {
            accessor,
            visibleMediaQuery,
            textAlignment,
            noWrap,
            ellipsis,
            width,
            render,
            cellsClassName,
            cellsStyle,
            customCellAttributes,
          } = { ...defaultColumnProps, ...columnProps };

          let handleCellClick: React.MouseEventHandler<HTMLTableCellElement> | undefined;
          if (onCellClick) {
            handleCellClick = (event) => onCellClick({ event, record, index, column: columnProps, columnIndex });
          }

          return (
            <DataTableRowCell<T>
              key={accessor}
              className={typeof cellsClassName === 'function' ? cellsClassName(record, index) : cellsClassName}
              style={cellsStyle?.(record, index)}
              visibleMediaQuery={visibleMediaQuery}
              record={record}
              index={index}
              onClick={handleCellClick}
              accessor={accessor}
              textAlignment={textAlignment}
              noWrap={noWrap}
              ellipsis={ellipsis}
              width={width}
              render={render}
              defaultRender={defaultColumnRender}
              customCellAttributes={customCellAttributes}
            />
          );
        })}
      </TableTr>
      {expansion && (
        <DataTableRowExpansion
          colSpan={columns.filter(({ hidden }) => !hidden).length + (selectionVisible ? 1 : 0)}
          open={expansion.isRowExpanded(record)}
          content={expansion.content({ record, index })}
          collapseProps={expansion.collapseProps}
        />
      )}
    </>
  );
}
