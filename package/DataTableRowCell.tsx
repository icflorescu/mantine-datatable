import { Box } from '@mantine/core';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import type { DataTableColumn } from './types';
import { getValueAtPath, useMediaQueryStringOrFunction } from './utils';
import classes from './styles/DataTableRowCell.css';
import cx from 'clsx';

type DataTableRowCellProps<T> = {
  className?: string;
  style?: CSSProperties;
  record: T;
  recordIndex: number;
  defaultRender: ((record: T, index: number, accessor: string) => ReactNode) | undefined;
  onClick?: MouseEventHandler<HTMLTableCellElement>;
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

export default function DataTableRowCell<T>({
  className,
  style,
  visibleMediaQuery,
  record,
  recordIndex,
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
    <Box
      component="td"
      className={cx(
        { [classes.noWrap]: noWrap || ellipsis, [classes.ellipsis]: ellipsis, [classes.withPointerCursor]: onClick },
        className
      )}
      style={[
        {
          ...style,
          width,
          minWidth: width,
          maxWidth: width,
          textAlign: textAlignment,
        }
      ]}
      onClick={onClick}
      {...customCellAttributes?.(record, recordIndex)}
    >
      {render
        ? render(record, recordIndex)
        : defaultRender
        ? defaultRender(record, recordIndex, accessor)
        : (getValueAtPath(record, accessor) as ReactNode)}
    </Box>
  );
}
