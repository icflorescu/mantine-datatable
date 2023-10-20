import { Box, Center, Group, MantineStyleProp, type MantineTheme } from '@mantine/core';
import { IconArrowUp, IconArrowsVertical } from '@tabler/icons-react';
import clsx from 'clsx';
import { DataTableHeaderCellFilter } from './DataTableHeaderCellFilter';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTableColumn, DataTableSortProps } from './types';
import { humanize } from './utils';

type DataTableHeaderCellProps<T> = {
  className?: string;
  style: MantineStyleProp | undefined;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: React.ReactNode | undefined;
  sortStatus: DataTableSortProps['sortStatus'];
  sortIcons: DataTableSortProps['sortIcons'];
  onSortStatusChange: DataTableSortProps['onSortStatusChange'];
} & Pick<DataTableColumn<T>, 'accessor' | 'sortable' | 'textAlignment' | 'width' | 'filter' | 'filtering'>;

export function DataTableHeaderCell<T>({
  className,
  style,
  accessor,
  visibleMediaQuery,
  title,
  sortable,
  sortIcons,
  textAlignment,
  width,
  sortStatus,
  onSortStatusChange,
  filter,
  filtering,
}: DataTableHeaderCellProps<T>) {
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  const text = title ?? humanize(accessor);
  const tooltip = typeof text === 'string' ? text : undefined;
  const sortAction =
    sortable && onSortStatusChange
      ? (e?: React.BaseSyntheticEvent) => {
          if (e?.defaultPrevented) return;

          onSortStatusChange({
            columnAccessor: accessor,
            direction:
              sortStatus?.columnAccessor === accessor
                ? sortStatus.direction === 'asc'
                  ? 'desc'
                  : 'asc'
                : sortStatus?.direction ?? 'asc',
          });
        }
      : undefined;
  return (
    <Box
      component="th"
      className={clsx({ 'mantine-datatable-header-cell-sortable-column-header': sortable }, className)}
      style={[{ textAlign: textAlignment, width, minWidth: width, maxWidth: width }, style]}
      role={sortable ? 'button' : undefined}
      tabIndex={sortable ? 0 : undefined}
      onClick={sortAction}
      onKeyDown={(e) => e.key === 'Enter' && sortAction?.()}
    >
      <Group
        className="mantine-datatable-header-cell-sortable-column-header-group"
        justify="space-between"
        wrap="nowrap"
      >
        <Box
          className={clsx(
            'mantine-datatable-header-cell-column-header-text',
            'mantine-datatable-header-cell-sortable-column-header-text'
          )}
          title={tooltip}
        >
          {text}
        </Box>
        {sortable || sortStatus?.columnAccessor === accessor ? (
          <>
            {sortStatus?.columnAccessor === accessor ? (
              <Center
                className={clsx('mantine-datatable-header-cell-sortable-column-header-icon', {
                  'mantine-datatable-header-cell-sortable-column-header-icon-rotated': sortStatus.direction === 'desc',
                })}
                role="img"
                aria-label={`Sorted ${sortStatus.direction === 'desc' ? 'descending' : 'ascending'}`}
              >
                {sortIcons?.sorted || <IconArrowUp size={14} />}
              </Center>
            ) : (
              <Center
                className="mantine-datatable-header-cell-sortable-column-header-unsorted-icon"
                role="img"
                aria-label="Not sorted"
              >
                {sortIcons?.unsorted || <IconArrowsVertical size={14} />}
              </Center>
            )}
          </>
        ) : null}
        {filter ? <DataTableHeaderCellFilter isActive={!!filtering}>{filter}</DataTableHeaderCellFilter> : null}
      </Group>
    </Box>
  );
}
