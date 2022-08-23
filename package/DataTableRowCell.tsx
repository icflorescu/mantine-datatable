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
  expandedColumnPropertyName: string | undefined;
} & Pick<DataTableColumn<T>, 'propertyName' | 'visibleMediaQuery' | 'textAlign' | 'width' | 'ellipsis' | 'render'>;

export default function DataTableRowCell<T>({
  visibleMediaQuery,
  record,
  ellipsis,
  textAlign,
  width,
  propertyName,
  expandedColumnPropertyName,
  render,
}: DataTableRowCellProps<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQuery(visibleMediaQuery || '', true)) return null;
  return (
    <Box
      component="td"
      className={cx({ [classes.ellipsis]: ellipsis })}
      sx={{ textAlign, ...getCellWidthStyleProps({ width, propertyName, expandedColumnPropertyName }) }}
    >
      {render ? render(record) : (get(record, propertyName) as ReactNode)}
    </Box>
  );
}
