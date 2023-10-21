import { Box, rem, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { DataTableFooterCell } from './DataTableFooterCell';
import { DataTableFooterSelectorPlaceholderCell } from './DataTableFooterSelectorPlaceholderCell';
import type { DataTableColumn, DataTableDefaultColumnProps } from './types';

type DataTableFooterProps<T> = {
  // borderColor: StyleProp<MantineColor>;
  className?: string;
  style?: MantineStyleProp;
  columns: DataTableColumn<T>[];
  defaultColumnProps: DataTableDefaultColumnProps<T> | undefined;
  selectionVisible: boolean;
  leftShadowVisible: boolean;
  scrollDiff: number;
};

export const DataTableFooter = forwardRef(function DataTableFooter<T>(
  {
    className,
    style,
    // borderColor,
    columns,
    defaultColumnProps,
    selectionVisible,
    leftShadowVisible,
    scrollDiff,
  }: DataTableFooterProps<T>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  const relative = scrollDiff < 0;
  return (
    <Box
      component="tfoot"
      ref={ref}
      className={clsx('mantine-datatable-footer', className)}
      style={[
        // (theme) => ({
        //   '--mantine-datatable-footer-border-color': parseThemeColor({ color: borderColor, theme }).value,
        // }),
        {
          position: relative ? 'relative' : 'sticky',
          bottom: rem(`${relative ? scrollDiff : -1}px`),
        },
        style,
      ]}
    >
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
            noWrap,
            ellipsis,
          } = { ...defaultColumnProps, ...columnProps };

          return (
            <DataTableFooterCell<T>
              key={accessor}
              className={footerClassName}
              style={footerStyle}
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
}) as <T>(props: DataTableFooterProps<T> & { ref: React.ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
