import { Box } from '@mantine/core';
import { useMemo } from 'react';
import type { DataTableColumnGroup } from './types/DataTableColumnGroup';
import { humanize, useMediaQueriesStringOrFunction } from './utils';

type DataTableColumnGroupHeaderCellProps<T> = {
  group: DataTableColumnGroup<T>;
};

export default function DataTableColumnGroupHeaderCell<T>({
  group: { id, columns, title, className, style, sx },
}: DataTableColumnGroupHeaderCellProps<T>) {
  const queries = useMemo(() => columns.map((column) => column.visibleMediaQuery), [columns]);
  const visibles = useMediaQueriesStringOrFunction(queries);
  const colSpan = useMemo(
    () => columns.filter((column, i) => !column.hidden && visibles?.[i]).length,
    [columns, visibles]
  );

  return colSpan > 0 ? (
    <Box component="th" colSpan={colSpan} className={className} sx={sx} style={style}>
      {title ?? humanize(id)}
    </Box>
  ) : null;
}
