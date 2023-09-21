import { Box, type MantineTheme } from '@mantine/core';
import type { CSSProperties, ReactNode } from 'react';
import type { DataTableColumn } from './types';
import { useMediaQueryStringOrFunction } from './utils';
import classes from './styles/DataTableFooterCell.css';
import cx from 'clsx';

type DataTableFooterCellProps<T> = {
  className?: string;
  style?: CSSProperties;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: ReactNode | undefined;
} & Pick<DataTableColumn<T>, 'noWrap' | 'ellipsis' | 'textAlignment' | 'width'>;

export default function DataTableFooterCell<T>({
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
      className={cx({ [classes.noWrap]: noWrap || ellipsis, [classes.ellipsis]: ellipsis }, className)}
      style={[
        {
          textAlign: textAlignment,
          width,
          minWidth: width,
          maxWidth: width,
        },
        style
      ]}
    >
      {title}
    </Box>
  );
}
