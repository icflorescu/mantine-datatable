import { useLocalStorage } from '@mantine/hooks';
import type { DataTableColumn } from '../types/DataTableColumn';

export type DataTableColumnPinning = {
  accessor: string;
  defaultPinned: 'left' | 'right' | undefined;
  pinnable: boolean;
  pinned: 'left' | 'right' | undefined;
};

/**
 * Hook to handle column pinning with localStorage persistence.
 * @see https://icflorescu.github.io/mantine-datatable/examples/interactive-column-pinning/
 */
export function useDataTableColumnPinning<T>({
  key,
  columns = [],
  getInitialValueInEffect = true,
}: {
  /**
   * The key to use in localStorage to store the columns pinning state.
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
  // Align pinning state with current columns definition
  function alignColumnsPinning<T>(
    columnsPinning: DataTableColumnPinning[],
    columns: DataTableColumn<T>[]
  ): DataTableColumnPinning[] {
    const updated: DataTableColumnPinning[] = [];

    // Keep existing pinning states for columns that still exist
    columnsPinning.forEach((col) => {
      if (columns.find((c) => c.accessor === col.accessor)) {
        updated.push(col);
      }
    });

    // Add pinning state for new columns
    columns.forEach((col) => {
      if (!updated.find((c) => c.accessor === col.accessor)) {
        updated.push({
          accessor: col.accessor as string,
          defaultPinned: col.pinned,
          pinnable: !!col.pinnable,
          pinned: col.pinned,
        });
      }
    });

    return updated;
  }

  // Default columns pinning state
  const defaultColumnsPinning = columns.map((column) => ({
    accessor: column.accessor as string,
    defaultPinned: column.pinned,
    pinnable: !!column.pinnable,
    pinned: column.pinned,
  }));

  const [columnsPinning, _setColumnsPinning] = useLocalStorage<DataTableColumnPinning[]>({
    key: key ? `${key}-columns-pinning` : '',
    defaultValue: key ? defaultColumnsPinning : undefined,
    getInitialValueInEffect,
  });

  function setColumnsPinning(
    pinning: DataTableColumnPinning[] | ((prev: DataTableColumnPinning[]) => DataTableColumnPinning[])
  ) {
    if (key) {
      _setColumnsPinning(pinning);
    }
  }

  const resetColumnsPinning = () => {
    setColumnsPinning(defaultColumnsPinning);
  };

  // If no key is provided, return default state (no persistence)
  if (!key) {
    return {
      columnsPinning: defaultColumnsPinning,
      setColumnsPinning,
      resetColumnsPinning,
    } as const;
  }

  // Align pinning state with current columns
  // columnsPinning may be undefined on first render with getInitialValueInEffect
  const alignedColumnsPinning = alignColumnsPinning(columnsPinning ?? [], columns);
  const prevColumnsPinning = JSON.stringify(columnsPinning ?? []);

  if (JSON.stringify(alignedColumnsPinning) !== prevColumnsPinning) {
    setColumnsPinning(alignedColumnsPinning);
  }

  return {
    columnsPinning: alignedColumnsPinning,
    setColumnsPinning,
    resetColumnsPinning,
  } as const;
}
