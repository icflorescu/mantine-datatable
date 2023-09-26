import { Box } from '@mantine/core';
import type { ChangeEventHandler, CSSProperties, MouseEventHandler, ReactNode } from 'react';
import DataTableRowCell from './DataTableRowCell';
import DataTableRowExpansion from './DataTableRowExpansion';
import DataTableRowSelectorCell from './DataTableRowSelectorCell';
import { useRowExpansion } from './hooks';
import type { DataTableCellClickHandler, DataTableColumn, DataTableDefaultColumnProps } from './types';
import classes from './styles/DataTableRow.css';
import cx from 'clsx';

type DataTableRowProps<T> = {
  record: T;
  recordIndex: number;
  columns: DataTableColumn<T>[];
  defaultColumnProps: DataTableDefaultColumnProps<T> | undefined;
  defaultColumnRender: ((record: T, index: number, accessor: string) => ReactNode) | undefined;
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: ChangeEventHandler<HTMLInputElement> | undefined;
  isRecordSelectable: ((record: T, index: number) => boolean) | undefined;
  getSelectionCheckboxProps: (record: T, recordIndex: number) => Record<string, unknown>;
  onClick: MouseEventHandler<HTMLTableRowElement> | undefined;
  onCellClick: DataTableCellClickHandler<T> | undefined;
  onContextMenu: MouseEventHandler<HTMLTableRowElement> | undefined;
  expansion: ReturnType<typeof useRowExpansion<T>>;
  customAttributes?: (record: T, recordIndex: number) => Record<string, unknown>;
  className?: string | ((record: T, recordIndex: number) => string | undefined);
  style?: CSSProperties | ((record: T, recordIndex: number) => CSSProperties | undefined);
  contextMenuVisible: boolean;
  leftShadowVisible: boolean;
};

export default function DataTableRow<T>({
  record,
  recordIndex,
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
  onContextMenu,
  expansion,
  customAttributes,
  className,
  style,
  contextMenuVisible,
  leftShadowVisible,
}: DataTableRowProps<T>) {

  return (
    <>
      <Box
        component="tr"
        className={cx(
          {
            [classes.withPointerCursor]: onClick || expansion?.expandOnClick,
            [classes.selected]: selectionChecked,
            [classes.contextMenuVisible]: contextMenuVisible,
          },
          typeof className === 'function' ? className(record, recordIndex) : className
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
        style={typeof style === 'function' ? style(record, recordIndex) : style}
        {...customAttributes?.(record, recordIndex)}
        onContextMenu={onContextMenu}
      >
        {selectionVisible && (
          <DataTableRowSelectorCell<T>
            record={record}
            recordIndex={recordIndex}
            withRightShadow={leftShadowVisible}
            checked={selectionChecked}
            disabled={!onSelectionChange || (isRecordSelectable ? !isRecordSelectable(record, recordIndex) : false)}
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
            cellsSx,
            customCellAttributes,
          } = { ...defaultColumnProps, ...columnProps };

          let handleCellClick: MouseEventHandler<HTMLTableCellElement> | undefined;
          if (onCellClick) {
            handleCellClick = (event) => onCellClick({ event, record, recordIndex, column: columnProps, columnIndex });
          }

          return (
            <DataTableRowCell<T>
              key={accessor}
              className={typeof cellsClassName === 'function' ? cellsClassName(record, recordIndex) : cellsClassName}
              style={typeof cellsStyle === 'function' ? cellsStyle(record, recordIndex) : cellsStyle}
              visibleMediaQuery={visibleMediaQuery}
              record={record}
              recordIndex={recordIndex}
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
      </Box>
      {expansion && (
        <DataTableRowExpansion
          colSpan={columns.filter(({ hidden }) => !hidden).length + (selectionVisible ? 1 : 0)}
          open={expansion.isRowExpanded(record)}
          content={expansion.content(record, recordIndex)}
          collapseProps={expansion.collapseProps}
        />
      )}
    </>
  );
}
