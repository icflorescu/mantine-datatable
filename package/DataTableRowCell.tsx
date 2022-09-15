import { Box, createStyles, Sx, Anchor } from '@mantine/core';
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
} & Pick<DataTableColumn<T>, 'accessor' | 'visibleMediaQuery' | 'textAlignment' | 'width' | 'ellipsis' | 'render' | 'getHref'>;

export default function DataTableRowCell<T>({
  className,
  sx,
  style,
  visibleMediaQuery,
  record,
  ellipsis,
  textAlignment,
  width,
  accessor,
  render,
  getHref
}: DataTableRowCellProps<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;

  let cellValue = render ? render(record) : (getValueAtPath(record, accessor) as ReactNode)

  cellValue = getHref ? <Anchor href={getHref(record)}></Anchor> : cellValue
  
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
      {cellValue}
    </Box>
  );
}
