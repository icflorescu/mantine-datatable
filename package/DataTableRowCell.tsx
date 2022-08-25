import { Box, createStyles } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { get } from 'lodash';
import { ReactNode } from 'react';
import { DataTableColumn } from './DataTable.props';
import getCellWidthStyleProps from './getCellWidthStyleProps';

const useStyles = createStyles({
  ellipsis: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
});

type DataTableRowCellProps<T> = {
  record: T;
  expandedColumnAccessor: string | undefined;
} & Pick<DataTableColumn<T>, 'accessor' | 'visibleMediaQuery' | 'textAlign' | 'width' | 'ellipsis' | 'render'>;

export default function DataTableRowCell<T>({
  visibleMediaQuery,
  record,
  ellipsis,
  textAlign,
  width,
  accessor,
  expandedColumnAccessor,
  render,
}: DataTableRowCellProps<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQuery(visibleMediaQuery || '', true)) return null;
  return (
    <Box
      component="td"
      className={cx({ [classes.ellipsis]: ellipsis })}
      sx={{
        textAlign,
        ...getCellWidthStyleProps({
          width,
          accessor,
          expandedColumnAccessor,
        }),
      }}
    >
      {render ? render(record) : (get(record, accessor) as ReactNode)}
    </Box>
  );
}
