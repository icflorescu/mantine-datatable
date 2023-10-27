import { Box, Center, Group, MantineStyleProp, TableTh, type MantineTheme } from '@mantine/core';
import { IconArrowUp, IconArrowsVertical } from '@tabler/icons-react';
import clsx from 'clsx';
import { DataTableHeaderCellFilter } from './DataTableHeaderCellFilter';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTableColumn, DataTableSortProps } from './types';
import { ELLIPSIS, NOWRAP, TEXT_ALIGN_CENTER, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT } from './utilityClasses';
import { humanize } from './utils';

type DataTableHeaderCellProps<T> = {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: React.ReactNode | undefined;
  sortStatus: DataTableSortProps<T>['sortStatus'];
  sortIcons: DataTableSortProps<T>['sortIcons'];
  onSortStatusChange: DataTableSortProps<T>['onSortStatusChange'];
} & Pick<DataTableColumn<T>, 'accessor' | 'sortable' | 'textAlign' | 'width' | 'filter' | 'filtering'>;

export function DataTableHeaderCell<T>({
  className,
  style,
  accessor,
  visibleMediaQuery,
  title,
  sortable,
  sortIcons,
  textAlign,
  width,
  sortStatus,
  onSortStatusChange,
  filter,
  filtering,
}: DataTableHeaderCellProps<T>) {
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  const text = title ?? humanize(accessor as string);
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
    <TableTh
      className={clsx(
        {
          'mantine-datatable-header-cell-sortable-column-header': sortable,
        },
        className
      )}
      style={[{ width, minWidth: width, maxWidth: width }, style]}
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
            'mantine-datatable-header-cell-sortable-column-header-text',
            {
              [TEXT_ALIGN_LEFT]: textAlign === 'left',
              [TEXT_ALIGN_CENTER]: textAlign === 'center',
              [TEXT_ALIGN_RIGHT]: textAlign === 'right',
            },
            NOWRAP,
            ELLIPSIS
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
                  'mantine-datatable-header-cell-sortable-column-header-icon-reversed': sortStatus.direction === 'desc',
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
    </TableTh>
  );
}
