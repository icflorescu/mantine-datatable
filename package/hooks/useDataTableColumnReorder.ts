import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import type { DataTableColumn } from '../types/DataTableColumn';

/**
 * Hook to handle column reordering with localStorage persistence.
 * @see https://icflorescu.github.io/mantine-datatable/examples/column-dragging-and-toggling/
 */
export function useDataTableColumnReorder<T>({
  key,
  columns = [],
  getInitialValueInEffect = true,
}: {
  /**
   * The key to use in localStorage to store the columns order.
   */
  key: string | undefined;
  /**
   * Columns definitions.
   */
  columns: DataTableColumn<T>[];
  /**
   * If set to true, value will be updated in useEffect after mount.
   * @default true
   */
  getInitialValueInEffect?: boolean;
}) {
  // Default columns order is the order of the columns in the array
  const defaultColumnsOrder = useMemo(
    () => (columns ? (columns.map((column) => column.accessor) as string[]) : []),
    [columns]
  );

  const [columnsOrder, _setColumnsOrder] = useLocalStorage<string[]>({
    key: key ? `${key}-columns-order` : '',
    defaultValue: key ? defaultColumnsOrder : undefined,
    getInitialValueInEffect,
  });

  function setColumnsOrder(order: string[] | ((prev: string[]) => string[])) {
    if (key) {
      _setColumnsOrder(order);
    }
  }

  // Align stored order with current column definitions: drop accessors that no
  // longer exist, append accessors added since last persisted state.
  const alignedColumnsOrder = useMemo(() => {
    if (!columnsOrder) return defaultColumnsOrder;
    const aligned: string[] = [];
    columnsOrder.forEach((col) => {
      if (columns.find((c) => c.accessor === col)) {
        aligned.push(col);
      }
    });
    columns.forEach((col) => {
      if (!aligned.includes(col.accessor as string)) {
        aligned.push(col.accessor as string);
      }
    });
    return aligned;
  }, [columnsOrder, columns, defaultColumnsOrder]);

  // Persist alignment in an effect — never set state during render
  useEffect(() => {
    if (!key) return;
    if (!columnsOrder) return;
    if (JSON.stringify(alignedColumnsOrder) !== JSON.stringify(columnsOrder)) {
      _setColumnsOrder(alignedColumnsOrder);
    }
  }, [key, alignedColumnsOrder, columnsOrder, _setColumnsOrder]);

  const resetColumnsOrder = () => {
    setColumnsOrder(defaultColumnsOrder);
  };

  if (!key) {
    return {
      columnsOrder: columnsOrder as string[],
      setColumnsOrder,
      resetColumnsOrder,
    } as const;
  }

  return {
    columnsOrder: alignedColumnsOrder,
    setColumnsOrder,
    resetColumnsOrder,
  } as const;
}
