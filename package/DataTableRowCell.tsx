import { type MantineStyleProp, TableTd } from '@mantine/core';
import clsx from 'clsx';
import { useCallback, useLayoutEffect, useRef } from 'react';
import type { PinnedColumnInfo } from './hooks';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTableColumn } from './types';
import {
  CONTEXT_MENU_CURSOR,
  ELLIPSIS,
  NOWRAP,
  POINTER_CURSOR,
  TEXT_ALIGN_CENTER,
  TEXT_ALIGN_LEFT,
  TEXT_ALIGN_RIGHT,
} from './utilityClasses';
import { getValueAtPath } from './utils';

type DataTableRowCellProps<T> = {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  pinnedInfo: PinnedColumnInfo | undefined;
  record: T;
  index: number;
  defaultRender:
    | ((record: T, index: number, accessor: keyof T | (string & NonNullable<unknown>)) => React.ReactNode)
    | undefined;
  onClick: React.MouseEventHandler<HTMLTableCellElement> | undefined;
  onDoubleClick: React.MouseEventHandler<HTMLTableCellElement> | undefined;
  onContextMenu: React.MouseEventHandler<HTMLTableCellElement> | undefined;
  isEditing: boolean;
  editValue: string;
  onEditChange: (value: string) => void;
  onEditCommit: (value?: string) => void;
  onEditCancel: () => void;
  commitEditOn: ('blur' | 'enter')[];
  isFocused: boolean;
  onCellFocus?: () => void;
  onCellBlur?: () => void;
  registerInputRef?: (el: HTMLInputElement | null) => void;
  onFocusNextCell?: (direction: 'next' | 'prev') => void;
  editingCellStyle?: MantineStyleProp;
  editingCellClassName?: string;
} & Pick<
  DataTableColumn<T>,
  | 'accessor'
  | 'visibleMediaQuery'
  | 'textAlign'
  | 'width'
  | 'noWrap'
  | 'ellipsis'
  | 'render'
  | 'customCellAttributes'
  | 'editRender'
>;

export function DataTableRowCell<T>({
  className,
  style,
  pinnedInfo,
  visibleMediaQuery,
  record,
  index,
  onClick,
  onDoubleClick,
  onContextMenu,
  noWrap,
  ellipsis,
  textAlign,
  width,
  accessor,
  render,
  defaultRender,
  customCellAttributes,
  isEditing,
  editValue,
  onEditChange,
  onEditCommit,
  onEditCancel,
  commitEditOn,
  editRender,
  isFocused,
  onCellFocus,
  onCellBlur,
  registerInputRef,
  onFocusNextCell,
  editingCellStyle,
  editingCellClassName,
}: DataTableRowCellProps<T>) {
  const committingRef = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // Store latest registerInputRef in a ref so the stable callback always calls it
  const registerInputRefRef = useRef(registerInputRef);
  registerInputRefRef.current = registerInputRef;
  const stableInputRef = useCallback((el: HTMLInputElement | null) => {
    inputRef.current = el;
    registerInputRefRef.current?.(el);
  }, []);

  useLayoutEffect(() => {
    if (isEditing && !editRender) inputRef.current?.focus();
  }, [isEditing, editRender]);

  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  return (
    <TableTd
      data-pinned={pinnedInfo?.position}
      data-pinned-shadow={pinnedInfo?.isBoundary ? pinnedInfo.position : undefined}
      className={clsx(
        {
          [NOWRAP]: noWrap || ellipsis,
          [ELLIPSIS]: ellipsis,
          [POINTER_CURSOR]: !isEditing && (onClick || onDoubleClick),
          [CONTEXT_MENU_CURSOR]: !isEditing && onContextMenu,
          [TEXT_ALIGN_LEFT]: textAlign === 'left',
          [TEXT_ALIGN_CENTER]: textAlign === 'center',
          [TEXT_ALIGN_RIGHT]: textAlign === 'right',
        },
        className,
        isEditing && isFocused ? editingCellClassName : undefined
      )}
      style={[
        {
          width,
          minWidth: width,
          maxWidth: width,
        },
        style,
        pinnedInfo && {
          position: 'sticky',
          [pinnedInfo.position]: pinnedInfo.offset,
          overflow: 'visible',
        },
        isEditing && isFocused ? editingCellStyle : undefined,
      ]}
      onClick={isEditing ? undefined : onClick}
      onDoubleClick={isEditing ? undefined : onDoubleClick}
      onContextMenu={isEditing ? undefined : onContextMenu}
      {...customCellAttributes?.(record, index)}
    >
      {isEditing ? (
        editRender ? (
          editRender(record, index, {
            value: editValue,
            onChange: onEditChange,
            onCommit: onEditCommit,
            onCancel: onEditCancel,
          })
        ) : (
          <input
            ref={stableInputRef}
            value={editValue}
            onChange={(e) => onEditChange(e.target.value)}
            onFocus={onCellFocus}
            onKeyDown={(e) => {
              if (commitEditOn.includes('enter') && e.key === 'Enter') {
                committingRef.current = true;
                onEditCommit();
              }
              if (e.key === 'Escape') onEditCancel();
              if (e.key === 'Tab' && onFocusNextCell) {
                e.preventDefault();
                committingRef.current = true;
                onEditCommit();
                onFocusNextCell(e.shiftKey ? 'prev' : 'next');
              }
            }}
            onBlur={() => {
              if (committingRef.current) {
                committingRef.current = false;
                onCellBlur?.();
                return;
              }
              onCellBlur?.();
              if (commitEditOn.includes('blur')) onEditCommit();
              else onEditCancel();
            }}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              padding: 0,
              width: '100%',
              font: 'inherit',
              color: 'inherit',
            }}
          />
        )
      ) : render ? (
        render(record, index)
      ) : defaultRender ? (
        defaultRender(record, index, accessor)
      ) : (
        (getValueAtPath(record, accessor) as React.ReactNode)
      )}
    </TableTd>
  );
}
