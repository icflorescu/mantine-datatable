import { TableTfoot, TableTr, rem, type MantineStyleProp } from '@mantine/core';
import clsx from 'clsx';
import { forwardRef, type JSX } from 'react';
import { DataTableFooterCell } from './DataTableFooterCell';
import { DataTableFooterSelectorPlaceholderCell } from './DataTableFooterSelectorPlaceholderCell';
import type { DataTableColumn, DataTableDefaultColumnProps } from './types';

type DataTableFooterProps<T> = {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  columns: DataTableColumn<T>[];
  defaultColumnProps: DataTableDefaultColumnProps<T> | undefined;
  selectionVisible: boolean;
  selectorCellShadowVisible: boolean;
  scrollDiff: number;
};

export const DataTableFooter = forwardRef(function DataTableFooter<T>(
  {
    className,
    style,
    columns,
    defaultColumnProps,
    selectionVisible,
    selectorCellShadowVisible,
    scrollDiff,
  }: DataTableFooterProps<T>,
  ref: React.ForwardedRef<HTMLTableSectionElement>
) {
  const relative = scrollDiff < 0;
  return (
    <TableTfoot
      ref={ref}
      className={clsx('mantine-datatable-footer', className)}
      style={[
        {
          position: relative ? 'relative' : 'sticky',
          bottom: rem(relative ? scrollDiff : 0),
        },
        style,
      ]}
    >
      <TableTr>
        {selectionVisible && <DataTableFooterSelectorPlaceholderCell shadowVisible={selectorCellShadowVisible} />}
        {columns.map(({ hidden, ...columnProps }) => {
          if (hidden) return null;

          const {
            accessor,
            visibleMediaQuery,
            textAlign,
            width,
            footer,
            footerClassName,
            footerStyle,
            noWrap,
            ellipsis,
          } = { ...defaultColumnProps, ...columnProps };

          return (
            <DataTableFooterCell<T>
              key={accessor as React.Key}
              className={footerClassName}
              style={footerStyle}
              visibleMediaQuery={visibleMediaQuery}
              textAlign={textAlign}
              width={width}
              title={footer}
              noWrap={noWrap}
              ellipsis={ellipsis}
            />
          );
        })}
      </TableTr>
    </TableTfoot>
  );
}) as <T>(props: DataTableFooterProps<T> & { ref: React.ForwardedRef<HTMLTableSectionElement> }) => JSX.Element;
