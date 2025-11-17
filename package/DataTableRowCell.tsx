import { TableTd, TextInput, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { useState } from 'react';
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
  record: T;
  index: number;
  defaultRender:
    | ((record: T, index: number, accessor: keyof T | (string & NonNullable<unknown>)) => React.ReactNode)
    | undefined;
  onClick: React.MouseEventHandler<HTMLTableCellElement> | undefined;
  onDoubleClick: React.MouseEventHandler<HTMLTableCellElement> | undefined;
  onContextMenu: React.MouseEventHandler<HTMLTableCellElement> | undefined;
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
  | 'editable'
  | 'onEdit'
>;

export function DataTableRowCell<T>({
  className,
  style,
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
  editable,
  onEdit,
}: DataTableRowCellProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState<string>('');

  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;

  const handleEdit = () => {
    if (onEdit) {
      const newRecord = { ...record, [accessor as keyof T]: editedValue };
      onEdit(newRecord, index);
    }
    setIsEditing(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (editable) {
      setIsEditing(true);
      setEditedValue(getValueAtPath(record, accessor) as string);
    }
    onClick?.(e);
  };

  let cellContent: React.ReactNode;
  if (render) {
    cellContent = render(record, index);
  } else if (defaultRender) {
    cellContent = defaultRender(record, index, accessor);
  } else {
    cellContent = getValueAtPath(record, accessor) as React.ReactNode;
  }

  return (
    <TableTd
      className={clsx(
        {
          [NOWRAP]: noWrap || ellipsis,
          [ELLIPSIS]: ellipsis,
          [POINTER_CURSOR]: (onClick || onDoubleClick || editable) && !isEditing,
          [CONTEXT_MENU_CURSOR]: onContextMenu,
          [TEXT_ALIGN_LEFT]: textAlign === 'left',
          [TEXT_ALIGN_CENTER]: textAlign === 'center',
          [TEXT_ALIGN_RIGHT]: textAlign === 'right',
        },
        className
      )}
      style={[
        {
          width,
          minWidth: width,
          maxWidth: width,
        },
        style,
      ]}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      {...customCellAttributes?.(record, index)}
    >
      {isEditing ? (
        <TextInput
          value={editedValue}
          onChange={(event) => setEditedValue(event.currentTarget.value)}
          onBlur={handleEdit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleEdit();
            }
            if (event.key === 'Escape') {
              setIsEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        cellContent
      )}
    </TableTd>
  );
}
