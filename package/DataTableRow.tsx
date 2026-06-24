import type { MantineStyleProp, MantineTheme } from '@mantine/core';
import { type CheckboxProps, type MantineColor, TableTr } from '@mantine/core';
import clsx from 'clsx';
import { getRowCssVariables } from './cssVariables';
import { DataTableRowCell } from './DataTableRowCell';
import { DataTableRowExpansion } from './DataTableRowExpansion';
import { DataTableRowSelectorCell } from './DataTableRowSelectorCell';
import type { PinnedColumnInfo, useRowExpansion } from './hooks';
import type {
  DataTableCellClickHandler,
  DataTableColumn,
  DataTableDefaultColumnProps,
  DataTableProps,
  DataTableRowClickHandler,
  DataTableSelectionTrigger,
} from './types';
import { CONTEXT_MENU_CURSOR, POINTER_CURSOR } from './utilityClasses';
import { getValueAtPath } from './utils';

type DataTableRowProps<T> = {
  record: T;
  index: number;
  columns: DataTableColumn<T>[];
  defaultColumnProps: DataTableDefaultColumnProps<T> | undefined;
  pinnedMap: Map<string, PinnedColumnInfo>;
  defaultColumnRender:
    | ((record: T, index: number, accessor: keyof T | (string & NonNullable<unknown>)) => React.ReactNode)
    | undefined;
  selectionTrigger: DataTableSelectionTrigger;
  selectionVisible: boolean;
  selectionChecked: boolean;
  onSelectionChange: React.MouseEventHandler | undefined;
  isRecordSelectable: ((record: T, index: number) => boolean) | undefined;
  selectionCheckboxProps: CheckboxProps | undefined;
  getSelectionCheckboxProps: (record: T, index: number) => CheckboxProps;
  onClick: DataTableRowClickHandler<T> | undefined;
  onDoubleClick: DataTableRowClickHandler<T> | undefined;
  onContextMenu: DataTableRowClickHandler<T> | undefined;
  onCellClick: DataTableCellClickHandler<T> | undefined;
  onCellDoubleClick: DataTableCellClickHandler<T> | undefined;
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
  selectionColumnClassName: string | undefined;
  selectionColumnStyle: MantineStyleProp | undefined;
  idAccessor: string;
  recordId: React.Key;
  editingCell: { recordKey: React.Key; accessor: string; value: string } | null;
  onEditStart: (recordKey: React.Key, accessor: string, value: string) => void;
  onEditChange: (value: string) => void;
  onEditCommit: (value?: string) => void;
  onEditCancel: () => void;
  defaultCommitEditOn: ('blur' | 'enter')[];
  editMode: 'cell' | 'global';
  globalEditValues: Map<string, string>;
  focusedCell: { recordKey: string; accessor: string } | null;
  onCellFocus: (recordKey: React.Key, accessor: string) => void;
  onCellBlur: () => void;
  onGlobalEditChange: (recordKey: React.Key, accessor: string, value: string) => void;
  onGlobalEditCommit: (recordKey: React.Key, accessor: string, overrideValue?: string) => void;
  onGlobalEditCancel: (recordKey: React.Key, accessor: string) => void;
  registerCellRef: (recordKey: React.Key, accessor: string, el: HTMLInputElement | null) => void;
  onFocusCell: (recordKey: React.Key, accessor: string) => void;
  onFocusNextRow: (direction: 'next' | 'prev', fromRecordId: React.Key) => void;
  editingCellStyle?: MantineStyleProp;
  editingCellClassName?: string;
} & Pick<DataTableProps<T>, 'rowFactory'>;

export function DataTableRow<T>({
  record,
  index,
  columns,
  defaultColumnProps,
  pinnedMap,
  defaultColumnRender,
  selectionTrigger,
  selectionVisible,
  selectionChecked,
  onSelectionChange,
  isRecordSelectable,
  selectionCheckboxProps,
  getSelectionCheckboxProps,
  onClick,
  onDoubleClick,
  onContextMenu,
  onCellClick,
  onCellDoubleClick,
  onCellContextMenu,
  expansion,
  customAttributes,
  color,
  backgroundColor,
  className,
  style,
  selectorCellShadowVisible,
  selectionColumnClassName,
  selectionColumnStyle,
  rowFactory,
  recordId,
  editingCell,
  onEditStart,
  onEditChange,
  onEditCommit,
  onEditCancel,
  defaultCommitEditOn,
  editMode,
  globalEditValues,
  focusedCell,
  onCellFocus,
  onCellBlur,
  onGlobalEditChange,
  onGlobalEditCommit,
  onGlobalEditCancel,
  registerCellRef,
  onFocusCell,
  onFocusNextRow,
  editingCellStyle,
  editingCellClassName,
}: Readonly<DataTableRowProps<T>>) {
  const editableAccessors = columns
    .filter(({ hidden, hiddenContent }) => !hidden && !hiddenContent)
    .map((col) => ({ ...defaultColumnProps, ...col }))
    .filter(({ editable }) => editable === true || (typeof editable === 'function' && editable(record, index)))
    .map(({ accessor }) => String(accessor));
  const cols = (
    <>
      {selectionVisible && (
        <DataTableRowSelectorCell<T>
          className={selectionColumnClassName}
          style={selectionColumnStyle}
          record={record}
          index={index}
          trigger={selectionTrigger}
          withRightShadow={selectorCellShadowVisible}
          checked={selectionChecked}
          disabled={!onSelectionChange || (isRecordSelectable ? !isRecordSelectable(record, index) : false)}
          onChange={onSelectionChange}
          checkboxProps={selectionCheckboxProps}
          getCheckboxProps={getSelectionCheckboxProps}
        />
      )}

      {columns.map(({ hidden, hiddenContent, ...columnProps }, columnIndex) => {
        if (hidden || hiddenContent) return null;

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
          editable,
          editRender,
          commitEditOn,
        } = { ...defaultColumnProps, ...columnProps };

        const isEditableCell =
          editable === true || (typeof editable === 'function' && editable(record, index));
        const cellKey = `${String(recordId)}::${String(accessor)}`;
        const isEditing =
          editMode === 'global'
            ? isEditableCell
            : isEditableCell &&
              editingCell?.recordKey === recordId &&
              editingCell?.accessor === String(accessor);
        const editValue =
          editMode === 'global'
            ? (globalEditValues.get(cellKey) ?? '')
            : isEditing
              ? (editingCell?.value ?? '')
              : '';
        const cellCommitEditOn = commitEditOn ?? defaultCommitEditOn;
        const isFocused =
          focusedCell?.recordKey === String(recordId) && focusedCell?.accessor === String(accessor);

        const cellOnEditChange =
          editMode === 'global'
            ? (value: string) => onGlobalEditChange(recordId, String(accessor), value)
            : onEditChange;
        const cellOnEditCommit =
          editMode === 'global'
            ? (overrideValue?: string) => onGlobalEditCommit(recordId, String(accessor), overrideValue)
            : onEditCommit;
        const cellOnEditCancel =
          editMode === 'global'
            ? () => onGlobalEditCancel(recordId, String(accessor))
            : onEditCancel;
        const cellRegisterInputRef = isEditableCell
          ? (el: HTMLInputElement | null) => registerCellRef(recordId, String(accessor), el)
          : undefined;
        const cellOnCellFocus = isEditableCell
          ? () => onCellFocus(recordId, String(accessor))
          : undefined;
        const cellIdx = isEditableCell ? editableAccessors.indexOf(String(accessor)) : -1;
        const cellOnFocusNextCell = isEditableCell
          ? (direction: 'next' | 'prev') => {
              const targetIdx = direction === 'next' ? cellIdx + 1 : cellIdx - 1;
              if (targetIdx >= 0 && targetIdx < editableAccessors.length) {
                const targetAccessor = editableAccessors[targetIdx];
                if (editMode === 'global') {
                  onFocusCell(recordId, targetAccessor);
                } else {
                  const targetCol = columns.find(
                    (c) => String(({ ...defaultColumnProps, ...c }).accessor) === targetAccessor
                  );
                  if (targetCol) {
                    const { accessor: tAcc } = { ...defaultColumnProps, ...targetCol };
                    onEditStart(recordId, targetAccessor, String(getValueAtPath(record, tAcc) ?? ''));
                  }
                }
              } else {
                onFocusNextRow(direction, recordId);
              }
            }
          : undefined;

        return (
          <DataTableRowCell<T>
            key={accessor as React.Key}
            pinnedInfo={pinnedMap.get(String(accessor))}
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
            onDoubleClick={
              isEditableCell && editMode === 'cell'
                ? (event) => {
                    if (!isEditing) {
                      onEditStart(
                        recordId,
                        String(accessor),
                        String(getValueAtPath(record, accessor) ?? '')
                      );
                    }
                    onCellDoubleClick?.({ event, record, index, column: columnProps, columnIndex });
                  }
                : onCellDoubleClick
                  ? (event) => onCellDoubleClick({ event, record, index, column: columnProps, columnIndex })
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
            isEditing={!!isEditing}
            editValue={editValue}
            onEditChange={cellOnEditChange}
            onEditCommit={cellOnEditCommit}
            onEditCancel={cellOnEditCancel}
            commitEditOn={cellCommitEditOn}
            editRender={editRender}
            isFocused={isFocused}
            onCellFocus={cellOnCellFocus}
            onCellBlur={onCellBlur}
            registerInputRef={cellRegisterInputRef}
            onFocusNextCell={cellOnFocusNextCell}
            editingCellStyle={editingCellStyle}
            editingCellClassName={editingCellClassName}
          />
        );
      })}
    </>
  );

  const expandedElement = expansion && (
    <DataTableRowExpansion
      colSpan={columns.filter(({ hidden }) => !hidden).length + (selectionVisible ? 1 : 0)}
      open={expansion.isRowExpanded(record)}
      content={expansion.content({ record, index })}
      collapseProps={expansion.collapseProps}
    />
  );

  const rowProps = getRowProps({
    record,
    index,
    selectionChecked,
    onClick,
    onDoubleClick,
    onContextMenu,
    expansion,
    customAttributes,
    color,
    backgroundColor,
    className,
    style,
  });

  if (rowFactory) {
    return rowFactory({
      record,
      index,
      rowProps,
      children: cols,
      expandedElement,
    });
  }

  return (
    <>
      <TableTr {...rowProps}>{cols}</TableTr>
      {expandedElement}
    </>
  );
}

type GetRowPropsArgs<T> = Readonly<
  Pick<
    DataTableRowProps<T>,
    | 'record'
    | 'index'
    | 'selectionChecked'
    | 'onClick'
    | 'onDoubleClick'
    | 'onContextMenu'
    | 'expansion'
    | 'customAttributes'
    | 'color'
    | 'backgroundColor'
    | 'className'
    | 'style'
  >
>;

export function getRowProps<T>({
  record,
  index,
  selectionChecked,
  onClick,
  onDoubleClick,
  onContextMenu,
  expansion,
  customAttributes,
  color,
  backgroundColor,
  className,
  style,
}: GetRowPropsArgs<T>) {
  return {
    className: clsx(
      'mantine-datatable-row',
      {
        [POINTER_CURSOR]:
          onClick || onDoubleClick || (expansion?.isExpandable({ record, index }) && expansion?.expandOnClick),
      },
      { [CONTEXT_MENU_CURSOR]: onContextMenu },
      typeof className === 'function' ? className(record, index) : className
    ),

    'data-selected': selectionChecked || undefined,

    onClick: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (expansion) {
        const { isExpandable, isRowExpanded, expandOnClick, expandRow, collapseRow } = expansion;
        if (isExpandable({ record, index }) && expandOnClick) {
          if (isRowExpanded(record)) {
            collapseRow(record);
          } else {
            expandRow(record);
          }
        }
      }
      onClick?.({ event: e, record, index });
    },
    onDoubleClick: onDoubleClick
      ? (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => onDoubleClick({ event: e, record, index })
      : undefined,
    onContextMenu: onContextMenu
      ? (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => onContextMenu({ event: e, record, index })
      : undefined,
    style: [
      color || backgroundColor
        ? (theme: MantineTheme) => {
            const colorValue = color?.(record, index);
            const backgroundColorValue = backgroundColor?.(record, index);
            return getRowCssVariables({ theme, color: colorValue, backgroundColor: backgroundColorValue });
          }
        : undefined,
      style?.(record, index),
    ],
    ...(customAttributes?.(record, index) ?? {}),
  };
}
