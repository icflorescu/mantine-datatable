import { useMemo } from "react";
import type { DataTableColumnGroup } from "./types/DataTableColumnGroup";

type DataTableColumnGroupHeaderCellProps<T> = {
  group: DataTableColumnGroup<T>;
};

export default function DataTableColumnGroupHeaderCell<T>({
  group: { columns, component }
}: DataTableColumnGroupHeaderCellProps<T>) {
  const queries = useMemo(() => columns.map(column => column.visibleMediaQuery), [columns]);
  const colSpan = useMemo(() => columns.length, [columns]);

  return colSpan > 0 ? <th colSpan={columns.length}>
    { component }
  </th> : null;
}