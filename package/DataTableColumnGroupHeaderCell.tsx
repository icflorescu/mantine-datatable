import { Box } from '@mantine/core';
import { useMemo } from 'react';
import { useMediaQueriesStringOrFunction } from './hooks';
import type { DataTableColumnGroup } from './types';
import { humanize } from './utils';

type DataTableColumnGroupHeaderCellProps<T> = {
  group: DataTableColumnGroup<T>;
};

export function DataTableColumnGroupHeaderCell<T>({
  group: { id, columns, title, className, style },
}: DataTableColumnGroupHeaderCellProps<T>) {
  const queries = useMemo(() => columns.map(({ visibleMediaQuery }) => visibleMediaQuery), [columns]);
  const visibles = useMediaQueriesStringOrFunction(queries);
  const colSpan = useMemo(
    () => columns.filter(({ hidden }, i) => !hidden && visibles?.[i]).length,
    [columns, visibles]
  );

  return colSpan > 0 ? (
    <Box component="th" colSpan={colSpan} className={className} style={style}>
      {title ?? humanize(id)}
    </Box>
  ) : null;
}
