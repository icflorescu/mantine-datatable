import { Box, type MantineStyleProp, type MantineTheme } from '@mantine/core';
import clsx from 'clsx';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTableColumn } from './types';

type DataTableFooterCellProps<T> = {
  className?: string;
  style?: MantineStyleProp;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: React.ReactNode | undefined;
} & Pick<DataTableColumn<T>, 'noWrap' | 'ellipsis' | 'textAlignment' | 'width'>;

export function DataTableFooterCell<T>({
  className,
  style,
  visibleMediaQuery,
  title,
  noWrap,
  ellipsis,
  textAlignment,
  width,
}: DataTableFooterCellProps<T>) {
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  return (
    <Box
      component="th"
      className={clsx(
        {
          'mantine-datatable-footer-cell-nowrap': noWrap || ellipsis,
          'mantine-datatable-footer-cell-ellipsis': ellipsis,
        },
        className
      )}
      style={[
        {
          textAlign: textAlignment,
          width,
          minWidth: width,
          maxWidth: width,
        },
        style,
      ]}
    >
      {title}
    </Box>
  );
}
