import { type MantineStyleProp, TableTfoot, TableTr } from '@mantine/core';
import clsx from 'clsx';
import { DataTableFooterCell } from './DataTableFooterCell';
import { DataTableFooterSelectorPlaceholderCell } from './DataTableFooterSelectorPlaceholderCell';
import type { PinnedColumnInfo } from './hooks';
import type { DataTableColumn, DataTableDefaultColumnProps } from './types';

type DataTableFooterProps<T> = {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  columns: DataTableColumn<T>[];
  defaultColumnProps: DataTableDefaultColumnProps<T> | undefined;
  pinnedMap: Map<string, PinnedColumnInfo>;
  selectionVisible: boolean;
  selectorCellShadowVisible: boolean;
  ref: React.Ref<HTMLTableSectionElement>;
};

export function DataTableFooter<T>({
  className,
  style,
  columns,
  defaultColumnProps,
  pinnedMap,
  selectionVisible,
  selectorCellShadowVisible,
  ref,
}: DataTableFooterProps<T>) {
  return (
    <TableTfoot ref={ref} className={clsx('mantine-datatable-footer', className)} style={style}>
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
              pinnedInfo={pinnedMap.get(String(accessor))}
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
}
