import { TableTh } from '@mantine/core';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useMediaQueriesStringOrFunction } from './hooks';
import type { DataTableColumnGroup } from './types';
import { TEXT_ALIGN_CENTER, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT } from './utilityClasses';
import { calculateColSpan, flattenColumns, humanize, needsRightBorder } from './utils';

type DataTableColumnGroupHeaderCellProps<T> = {
  group: DataTableColumnGroup<T>;
  maxDepth: number;
  currentDepth: number;
  previousGroups: readonly DataTableColumnGroup<T>[];
  isLastGroup: boolean;
  withColumnBorders?: boolean;
  totalTableColumns: number;
};

export function DataTableColumnGroupHeaderCell<T>({
  group: { id, columns, groups, title, textAlign, className, style },
  maxDepth,
  currentDepth,
  previousGroups,
  isLastGroup,
  withColumnBorders = false,
  totalTableColumns,
}: DataTableColumnGroupHeaderCellProps<T>) {
  const allColumns = useMemo(() => {
    if (columns && columns.length > 0) {
      return columns;
    }
    if (groups && groups.length > 0) {
      return flattenColumns([{ id, columns, groups }]);
    }
    return [];
  }, [columns, groups, id]);

  const queries = useMemo(() => allColumns.map(({ visibleMediaQuery }) => visibleMediaQuery), [allColumns]);
  const visibles = useMediaQueriesStringOrFunction(queries);

  const colSpan = useMemo(() => {
    return calculateColSpan({ id, columns, groups }, visibles);
  }, [id, columns, groups, visibles]);

  const columnsBeforeGroup = useMemo(() => {
    return previousGroups.reduce((sum, g) => sum + calculateColSpan(g, visibles), 0);
  }, [previousGroups, visibles]);

  const hasSubGroups = groups && groups.length > 0;
  const rowSpan = hasSubGroups ? 1 : maxDepth - currentDepth;

  const hasMoreColumns = columnsBeforeGroup + colSpan < totalTableColumns;
  const needsBorder = needsRightBorder(isLastGroup, hasMoreColumns, withColumnBorders);

  return colSpan > 0 ? (
    <TableTh
      colSpan={colSpan}
      rowSpan={rowSpan > 1 ? rowSpan : undefined}
      className={clsx(
        'mantine-datatable-column-group-header-cell',
        {
          [TEXT_ALIGN_LEFT]: textAlign === 'left',
          [TEXT_ALIGN_CENTER]: textAlign === 'center',
          [TEXT_ALIGN_RIGHT]: textAlign === 'right',
          'mantine-datatable-column-group-header-cell--needs-border': needsBorder,
        },
        className
      )}
      style={style}
    >
      {title ?? humanize(id)}
    </TableTh>
  ) : null;
}
