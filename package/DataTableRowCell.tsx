import { Checkbox, NumberInput, TableTd, TextInput, type MantineStyleProp } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
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
  | 'editType'
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
  editType = 'text',
}: DataTableRowCellProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState<string | number | Date | boolean>('');

  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;

  const handleEdit = () => {
    if (onEdit && editType !== 'date') {
      const valueToSave = editedValue;
      const newRecord = { ...record, [accessor as keyof T]: valueToSave as T[keyof T] };
      onEdit(newRecord, index);
    }
    setIsEditing(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (editable && editType !== 'boolean') {
      e.stopPropagation();
      setIsEditing(true);
      const currentValue = getValueAtPath(record, accessor);
      if (editType === 'date' && typeof currentValue === 'string') {
        setEditedValue(new Date(currentValue));
      } else {
        setEditedValue(currentValue as string | number | Date | boolean);
      }
    }
    onClick?.(e);
  };

  const handleBooleanToggle = () => {
    if (editable && editType === 'boolean' && onEdit) {
      const currentValue = getValueAtPath(record, accessor) as boolean;
      const newRecord = { ...record, [accessor as keyof T]: !currentValue as T[keyof T] };
      onEdit(newRecord, index);
    }
  };

  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
    if (isEditing) {
      return;
    } else if (editType === 'boolean') {
      handleBooleanToggle();
    } else {
      handleClick(e);
    }
  };

  let cellContent: React.ReactNode;
  if (render) {
    cellContent = render(record, index);
  } else if (defaultRender) {
    cellContent = defaultRender(record, index, accessor);
  } else {
    const value = getValueAtPath(record, accessor);
    if (editType === 'boolean' && typeof value === 'boolean') {
      cellContent = value ? 'Yes' : 'No';
    } else if (editType === 'date' && (value instanceof Date || typeof value === 'string')) {
      const date = value instanceof Date ? value : new Date(value);
      cellContent = date.toLocaleDateString();
    } else {
      cellContent = value as React.ReactNode;
    }
  }

  const renderEditInput = () => {
    switch (editType) {
      case 'number':
        return (
          <NumberInput
            value={editedValue as number}
            onChange={(value) => setEditedValue(value ?? 0)}
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
        );
      case 'date':
        return (
          <DatePickerInput
            value={editedValue as Date}
            onChange={(value) => {
              if (value) {
                const date =
                  typeof value === 'object' && value !== null && 'toISOString' in value
                    ? (value as Date)
                    : new Date(value as string);
                setEditedValue(date);
                if (onEdit) {
                  const dateValue = date.toISOString();
                  const newRecord = { ...record, [accessor as keyof T]: dateValue as T[keyof T] };
                  onEdit(newRecord, index);
                }
                setIsEditing(false);
              }
            }}
            autoFocus
            popoverProps={{ withinPortal: true }}
          />
        );
      case 'boolean':
        return null;
      default:
        return (
          <TextInput
            value={editedValue as string}
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
        );
    }
  };

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
      onClick={handleCellClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      {...customCellAttributes?.(record, index)}
    >
      {isEditing && editType !== 'boolean' ? (
        renderEditInput()
      ) : editType === 'boolean' ? (
        <Checkbox checked={getValueAtPath(record, accessor) as boolean} onChange={handleBooleanToggle} />
      ) : (
        cellContent
      )}
    </TableTd>
  );
}
