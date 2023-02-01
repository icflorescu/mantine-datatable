import { Box, createStyles, type Sx } from '@mantine/core';
import type { CSSProperties, MouseEventHandler, ReactNode } from 'react';
import type { DataTableColumn } from './types';
import { getValueAtPath, useMediaQueryStringOrFunction } from './utils';

const useStyles = createStyles({
  withPointerCursor: {
    cursor: 'pointer',
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

type DataTableRowCellProps<T> = {
  className?: string;
  sx?: Sx;
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
  sx,
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
  const { cx, classes } = useStyles();
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  return (
    <Box
      component="td"
      className={cx(
        { [classes.noWrap]: noWrap || ellipsis, [classes.ellipsis]: ellipsis, [classes.withPointerCursor]: onClick },
        className
      )}
      sx={[
        {
          width,
          minWidth: width,
          maxWidth: width,
          textAlign: textAlignment,
        },
        sx,
      ]}
      style={style}
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
