import { useEffect, useMemo } from "react";
import type { DataTableColumnGroup } from "./types/DataTableColumnGroup";
import { useMediaQueriesStringOrFunction } from "./utils";

type DataTableColumnGroupHeaderCellProps<T> = {
  group: DataTableColumnGroup<T>;
};

export default function DataTableColumnGroupHeaderCell<T>({
  group: { columns, component }
}: DataTableColumnGroupHeaderCellProps<T>) {
  const queries = useMemo(() => columns.map(column => column.visibleMediaQuery), [columns]);
  const visibles = useMediaQueriesStringOrFunction(queries);
  const colSpan = useMemo(() => columns.filter((column, i) => !column.hidden && visibles?.[i]).length, [columns, visibles]);

  return colSpan > 0 ? <th colSpan={colSpan}>
    { component }
  </th> : null;
}