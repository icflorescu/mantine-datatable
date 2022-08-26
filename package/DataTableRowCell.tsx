import { Box, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { get } from 'lodash';
import { ReactNode } from 'react';
import { DataTableColumn } from './DataTable.props';

const useStyles = createStyles({
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

type DataTableRowCellProps<T> = {
  record: T;
} & Pick<DataTableColumn<T>, 'accessor' | 'visibleMediaQuery' | 'textAlign' | 'width' | 'ellipsis' | 'render'>;

export default function DataTableRowCell<T>({
  visibleMediaQuery,
  record,
  ellipsis,
  textAlign,
  width,
  accessor,
  render,
}: DataTableRowCellProps<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQuery(visibleMediaQuery || '', true)) return null;
  return (
    <Box
      component="td"
      className={cx({ [classes.ellipsis]: ellipsis })}
      sx={{
        width,
        minWidth: width,
        maxWidth: width,
        textAlign,
      }}
    >
      {render ? render(record) : (get(record, accessor) as ReactNode)}
    </Box>
  );
}
