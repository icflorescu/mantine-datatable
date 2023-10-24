import { TableTd, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTableColumn } from './types';
import {
  ELLIPSIS,
  NOWRAP,
  POINTER_CURSOR,
  TEXT_ALIGN_CENTER,
  TEXT_ALIGN_LEFT,
  TEXT_ALIGN_RIGHT,
} from './utilityClasses';
import { getValueAtPath } from './utils';

type DataTableRowCellProps<T> = {
  className?: string;
  style?: MantineStyleProp;
  record: T;
  index: number;
  defaultRender: ((record: T, index: number, accessor: string) => React.ReactNode) | undefined;
  onClick?: React.MouseEventHandler<HTMLTableCellElement>;
} & Pick<
  DataTableColumn<T>,
  'accessor' | 'visibleMediaQuery' | 'textAlign' | 'width' | 'noWrap' | 'ellipsis' | 'render' | 'customCellAttributes'
>;

export function DataTableRowCell<T>({
  className,
  style,
  visibleMediaQuery,
  record,
  index,
  onClick,
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
      className={clsx(
        {
          [NOWRAP]: noWrap || ellipsis,
          [ELLIPSIS]: ellipsis,
          [POINTER_CURSOR]: onClick,
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
      onClick={onClick}
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
