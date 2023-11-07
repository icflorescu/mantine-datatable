import { TableTr, type CheckboxProps, type MantineColor, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { DataTableRowCell } from './DataTableRowCell';
import { DataTableRowExpansion } from './DataTableRowExpansion';
import { DataTableRowSelectorCell } from './DataTableRowSelectorCell';
import { getRowCssVariables } from './cssVariables';
import { useRowExpansion } from './hooks';
import type {
  DataTableCellClickHandler,
  DataTableColumn,
  DataTableDefaultColumnProps,
  DataTableRowClickHandler,
} from './types';
import { POINTER_CURSOR } from './utilityClasses';

type DataTableRowProps<T> = {
  record: T;
  index: number;
  columns: DataTableColumn<T>[];
  defaultColumnProps: DataTableDefaultColumnProps<T> | undefined;
  defaultColumnRender:
    | ((record: T, index: number, accessor: keyof T | (string & NonNullable<unknown>)) => React.ReactNode)
    | undefined;
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  isRecordSelectable: ((record: T, index: number) => boolean) | undefined;
  getSelectionCheckboxProps: (record: T, index: number) => CheckboxProps;
  onClick: DataTableRowClickHandler<T> | undefined;
  onContextMenu: DataTableRowClickHandler<T> | undefined;
  onCellClick: DataTableCellClickHandler<T> | undefined;
  onCellContextMenu: DataTableCellClickHandler<T> | undefined;
  expansion: ReturnType<typeof useRowExpansion<T>>;
  customAttributes?: (record: T, index: number) => Record<string, unknown>;
  color:
    | ((record: T, index: number) => MantineColor | undefined | { light: MantineColor; dark: MantineColor })
    | undefined;
  backgroundColor:
    | ((record: T, index: number) => MantineColor | undefined | { light: MantineColor; dark: MantineColor })
    | undefined;
  className?: string | ((record: T, index: number) => string | undefined);
  style?: (record: T, index: number) => MantineStyleProp | undefined;
  selectorCellShadowVisible: boolean;
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
  onContextMenu,
  onCellClick,
  onCellContextMenu,
  expansion,
  customAttributes,
  color,
  backgroundColor,
  className,
  style,
  selectorCellShadowVisible,
}: DataTableRowProps<T>) {
  return (
    <>
      <TableTr
        className={clsx(
          'mantine-datatable-row',
          { [POINTER_CURSOR]: onClick || expansion?.expandOnClick },
          typeof className === 'function' ? className(record, index) : className
        )}
        data-selected={selectionChecked || undefined}
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
          onClick?.({ event: e, record, index });
        }}
        onContextMenu={onContextMenu ? (e) => onContextMenu({ event: e, record, index }) : undefined}
        style={[
          color || backgroundColor
            ? (theme) => {
                const colorValue = color?.(record, index);
                const backgroundColorValue = backgroundColor?.(record, index);
                return getRowCssVariables({ theme, color: colorValue, backgroundColor: backgroundColorValue });
              }
            : undefined,
          style?.(record, index),
        ]}
        {...customAttributes?.(record, index)}
      >
        {selectionVisible && (
          <DataTableRowSelectorCell<T>
            record={record}
            index={index}
            withRightShadow={selectorCellShadowVisible}
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
            textAlign,
            noWrap,
            ellipsis,
            width,
            render,
            cellsClassName,
            cellsStyle,
            customCellAttributes,
          } = { ...defaultColumnProps, ...columnProps };

          return (
            <DataTableRowCell<T>
              key={accessor as React.Key}
              className={typeof cellsClassName === 'function' ? cellsClassName(record, index) : cellsClassName}
              style={cellsStyle?.(record, index)}
              visibleMediaQuery={visibleMediaQuery}
              record={record}
              index={index}
              onClick={
                onCellClick
                  ? (event) => onCellClick({ event, record, index, column: columnProps, columnIndex })
                  : undefined
              }
              onContextMenu={
                onCellContextMenu
                  ? (event) => onCellContextMenu({ event, record, index, column: columnProps, columnIndex })
                  : undefined
              }
              accessor={accessor}
              textAlign={textAlign}
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
