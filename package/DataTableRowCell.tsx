import { type MantineStyleProp, TableTd } from '@mantine/core';
import clsx from 'clsx';
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
} & Pick<
  DataTableColumn<T>,
  'accessor' | 'visibleMediaQuery' | 'textAlign' | 'width' | 'noWrap' | 'ellipsis' | 'render' | 'customCellAttributes'
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
}: DataTableRowCellProps<T>) {
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  return (
    <TableTd
      data-pinned={pinnedInfo?.position}
      data-pinned-shadow={pinnedInfo?.isBoundary ? pinnedInfo.position : undefined}
      className={clsx(
        {
          [NOWRAP]: noWrap || ellipsis,
          [ELLIPSIS]: ellipsis,
          [POINTER_CURSOR]: onClick || onDoubleClick,
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
        pinnedInfo && {
          position: 'sticky',
          [pinnedInfo.position]: pinnedInfo.offset,
          overflow: 'visible',
        },
      ]}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onContextMenu={onContextMenu}
      {...customCellAttributes?.(record, index)}
    >
      {render
        ? render(record, index)
        : defaultRender
          ? defaultRender(record, index, accessor)
          : (getValueAtPath(record, accessor) as React.ReactNode)}
    </TableTd>
  );
}
