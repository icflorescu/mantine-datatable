import { Box, createStyles, Sx } from '@mantine/core';
import { CSSProperties, ReactNode } from 'react';
import { DataTableColumn } from './DataTable.props';
import { getValueAtPath, useMediaQueryStringOrFunction } from './utils';

const useStyles = createStyles({
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

type DataTableRowCellProps<T> = {
  className?: string;
  sx?: Sx;
  style?: CSSProperties;
  record: T;
  recordIndex: number;
} & Pick<DataTableColumn<T>, 'accessor' | 'visibleMediaQuery' | 'textAlignment' | 'width' | 'ellipsis' | 'render'>;

export default function DataTableRowCell<T>({
  className,
  sx,
  style,
  visibleMediaQuery,
  record,
  recordIndex,
  ellipsis,
  textAlignment,
  width,
  accessor,
  render,
}: DataTableRowCellProps<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  return (
    <Box
      component="td"
      className={cx({ [classes.ellipsis]: ellipsis }, className)}
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
    >
      {render ? render(record, recordIndex) : (getValueAtPath(record, accessor) as ReactNode)}
    </Box>
  );
}
