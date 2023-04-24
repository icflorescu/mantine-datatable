import { Box, createStyles, type MantineTheme, type Sx } from '@mantine/core';
import type { CSSProperties, ReactNode } from 'react';
import type { DataTableColumn } from './types';
import { useMediaQueryStringOrFunction } from './utils';

const useStyles = createStyles({
  noWrap: {
    whiteSpace: 'nowrap',
  },
  ellipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

type DataTableFooterCellProps<T> = {
  className?: string;
  sx?: Sx;
  style?: CSSProperties;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: ReactNode | undefined;
} & Pick<DataTableColumn<T>, 'noWrap' | 'ellipsis' | 'textAlignment' | 'width'>;

export default function DataTableFooterCell<T>({
  className,
  sx,
  style,
  visibleMediaQuery,
  title,
  noWrap,
  ellipsis,
  textAlignment,
  width,
}: DataTableFooterCellProps<T>) {
  const { cx, classes } = useStyles();
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  return (
    <Box
      component="th"
      className={cx({ [classes.noWrap]: noWrap || ellipsis, [classes.ellipsis]: ellipsis }, className)}
      sx={[
        {
          '&&': { textAlign: textAlignment },
          width,
          minWidth: width,
          maxWidth: width,
        },
        sx,
      ]}
      style={style}
    >
      {title}
    </Box>
  );
}
