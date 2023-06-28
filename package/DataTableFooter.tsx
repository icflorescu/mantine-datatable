import { Box, createStyles, type CSSObject, type MantineTheme } from '@mantine/core';
import { CSSProperties, forwardRef, type ForwardedRef } from 'react';
import DataTableFooterCell from './DataTableFooterCell';
import DataTableFooterSelectorPlaceholderCell from './DataTableFooterSelectorPlaceholderCell';
import type { DataTableColumn, DataTableDefaultColumnProps } from './types';

const useStyles = createStyles(
  (
    theme,
    { scrollDiff, borderColor }: { scrollDiff: number; borderColor: string | ((theme: MantineTheme) => string) }
  ) => {
    const relative = scrollDiff < 0;
    const borderColorValue = typeof borderColor === 'function' ? borderColor(theme) : borderColor;

    return {
      root: {
        zIndex: 2,
        position: relative ? 'relative' : 'sticky',
        bottom: relative ? scrollDiff : -1,
        background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        '&& tr th': {
          borderTopColor: borderColorValue,
        },
      },
      relative: {
        position: 'relative',
      },
      textSelectionDisabled: {
        userSelect: 'none',
      },
    };
  }
);

type DataTableFooterProps<T> = {
  borderColor: string | ((theme: MantineTheme) => string);
  className?: string;
  style?: CSSObject;
  columns: DataTableColumn<T>[];
  defaultColumnProps: DataTableDefaultColumnProps<T> | undefined;
  selectionVisible: boolean;
  leftShadowVisible: boolean;
  scrollDiff: number;
};

export default forwardRef(function DataTableFooter<T>(
  {
    className,
    style,
    borderColor,
    columns,
    defaultColumnProps,
    selectionVisible,
    leftShadowVisible,
    scrollDiff,
  }: DataTableFooterProps<T>,
  ref: ForwardedRef<HTMLTableSectionElement>
) {
  const { cx, classes } = useStyles({ scrollDiff, borderColor });

  return (
    <Box component="tfoot" ref={ref} className={cx(classes.root, className)} style={style as CSSProperties}>
      <tr>
        {selectionVisible && <DataTableFooterSelectorPlaceholderCell shadowVisible={leftShadowVisible} />}
        {columns.map(({ hidden, ...columnProps }) => {
          if (hidden) return null;

          const {
            accessor,
            visibleMediaQuery,
            textAlignment,
            width,
            footer,
            footerClassName,
            footerStyle,
            footerSx,
            noWrap,
            ellipsis,
          } = { ...defaultColumnProps, ...columnProps };

          return (
            <DataTableFooterCell<T>
              key={accessor}
              className={footerClassName}
              style={footerStyle}
              sx={footerSx}
              visibleMediaQuery={visibleMediaQuery}
              textAlignment={textAlignment}
              width={width}
              title={footer}
              noWrap={noWrap}
              ellipsis={ellipsis}
            />
          );
        })}
      </tr>
    </Box>
  );
}) as <T>(props: DataTableFooterProps<T> & { ref: ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
