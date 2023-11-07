import { TableTh } from '@mantine/core';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useMediaQueriesStringOrFunction } from './hooks';
import type { DataTableColumnGroup } from './types';
import { TEXT_ALIGN_CENTER, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT } from './utilityClasses';
import { humanize } from './utils';

type DataTableColumnGroupHeaderCellProps<T> = {
  group: DataTableColumnGroup<T>;
};

export function DataTableColumnGroupHeaderCell<T>({
  group: { id, columns, title, textAlign, className, style },
}: DataTableColumnGroupHeaderCellProps<T>) {
  const queries = useMemo(() => columns.map(({ visibleMediaQuery }) => visibleMediaQuery), [columns]);
  const visibles = useMediaQueriesStringOrFunction(queries);
  const colSpan = useMemo(
    () => columns.filter(({ hidden }, i) => !hidden && visibles?.[i]).length,
    [columns, visibles]
  );

  return colSpan > 0 ? (
    <TableTh
      colSpan={colSpan}
      className={clsx(
        'mantine-datatable-column-group-header-cell',
        {
          [TEXT_ALIGN_LEFT]: textAlign === 'left',
          [TEXT_ALIGN_CENTER]: textAlign === 'center',
          [TEXT_ALIGN_RIGHT]: textAlign === 'right',
        },
        className
      )}
      style={style}
    >
      {title ?? humanize(id)}
    </TableTh>
  ) : null;
}
