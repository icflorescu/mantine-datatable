import { Box, createStyles } from '@mantine/core';
import { get } from 'lodash';
import { ReactNode } from 'react';
import { DataTableColumn } from './DataTable.props';
import { useMediaQueryStringOrFunction } from './utils';

const useStyles = createStyles({
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

type DataTableRowCellProps<T> = {
  record: T;
} & Pick<DataTableColumn<T>, 'accessor' | 'visibleMediaQuery' | 'textAlignment' | 'width' | 'ellipsis' | 'render'>;

export default function DataTableRowCell<T>({
  visibleMediaQuery,
  record,
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
      className={cx({ [classes.ellipsis]: ellipsis })}
      sx={{
        width,
        minWidth: width,
        maxWidth: width,
        textAlign: textAlignment,
      }}
    >
      {render ? render(record) : (get(record, accessor) as ReactNode)}
    </Box>
  );
}
