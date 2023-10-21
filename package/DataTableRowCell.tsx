import { TableTd, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTableColumn } from './types';
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
  | 'accessor'
  | 'visibleMediaQuery'
  | 'textAlignment'
  | 'width'
  | 'noWrap'
  | 'ellipsis'
  | 'render'
  | 'customCellAttributes'
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
  textAlignment,
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
          'mantine-datatable-row-cell-no-wrap': noWrap || ellipsis,
          'mantine-datatable-row-cell-ellipsis': ellipsis,
          'mantine-datatable-row-cell-with-pointer-cursor': onClick,
        },
        className
      )}
      style={[
        {
          width,
          minWidth: width,
          maxWidth: width,
          textAlign: textAlignment,
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
