import { useLocalStorage } from '@mantine/hooks';
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
  // Align order with current columns definition
  function alignColumnsOrder<T>(columnsOrder: string[], columns: DataTableColumn<T>[]) {
    const updatedColumnsOrder: string[] = [];

    // Keep existing order for columns that still exist
    columnsOrder.forEach((col) => {
      if (columns.find((c) => c.accessor === col)) {
        updatedColumnsOrder.push(col);
      }
    });

    // Add new columns to the end
    columns.forEach((col) => {
      if (!updatedColumnsOrder.includes(col.accessor as string)) {
        updatedColumnsOrder.push(col.accessor as string);
      }
    });

    return updatedColumnsOrder;
  }

  // Default columns order is the order of the columns in the array
  const defaultColumnsOrder = (columns && columns.map((column) => column.accessor)) || [];

  const [columnsOrder, _setColumnsOrder] = useLocalStorage<string[]>({
    key: key ? `${key}-columns-order` : '',
    defaultValue: key ? (defaultColumnsOrder as string[]) : undefined,
    getInitialValueInEffect,
  });

  function setColumnsOrder(order: string[] | ((prev: string[]) => string[])) {
    if (key) {
      _setColumnsOrder(order);
    }
  }

  const resetColumnsOrder = () => {
    setColumnsOrder(defaultColumnsOrder as string[]);
  };

  // If no key is provided, return unmanaged state
  if (!key) {
    return {
      columnsOrder: columnsOrder as string[],
      setColumnsOrder,
      resetColumnsOrder,
    } as const;
  }

  // Align order with current columns
  const alignedColumnsOrder = alignColumnsOrder(columnsOrder, columns);
  const prevColumnsOrder = JSON.stringify(columnsOrder);

  if (JSON.stringify(alignedColumnsOrder) !== prevColumnsOrder) {
    setColumnsOrder(alignedColumnsOrder);
  }

  return {
    columnsOrder: alignedColumnsOrder,
    setColumnsOrder,
    resetColumnsOrder,
  } as const;
}
