import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
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
  // Default columns pinning state
  const defaultColumnsPinning = useMemo(
    () =>
      columns.map((column) => ({
        accessor: column.accessor as string,
        defaultPinned: column.pinned,
        pinnable: !!column.pinnable,
        pinned: column.pinned,
      })),
    [columns]
  );

  const [storedColumnsPinning, _setColumnsPinning] = useLocalStorage<DataTableColumnPinning[]>({
    key: key ? `${key}-columns-pinning` : '',
    defaultValue: key ? defaultColumnsPinning : undefined,
    getInitialValueInEffect,
  });

  const columnsPinning = storedColumnsPinning ?? defaultColumnsPinning;

  function setColumnsPinning(
    pinning: DataTableColumnPinning[] | ((prev: DataTableColumnPinning[]) => DataTableColumnPinning[])
  ) {
    if (!key) return;
    if (typeof pinning === 'function') {
      _setColumnsPinning((prev) => pinning(prev ?? defaultColumnsPinning));
    } else {
      _setColumnsPinning(pinning);
    }
  }

  // Align stored pinning state with current column definitions: drop accessors
  // that no longer exist, append accessors added since last persisted state.
  const alignedColumnsPinning = useMemo(() => {
    if (!columnsPinning) return defaultColumnsPinning;
    const aligned: DataTableColumnPinning[] = [];
    columnsPinning.forEach((col) => {
      if (columns.find((c) => c.accessor === col.accessor)) {
        aligned.push(col);
      }
    });
    columns.forEach((col) => {
      if (!aligned.find((c) => c.accessor === col.accessor)) {
        aligned.push({
          accessor: col.accessor as string,
          defaultPinned: col.pinned,
          pinnable: !!col.pinnable,
          pinned: col.pinned,
        });
      }
    });
    return aligned;
  }, [columnsPinning, columns, defaultColumnsPinning]);

  // Persist alignment in an effect — never set state during render
  useEffect(() => {
    if (!key) return;
    if (!columnsPinning) return;
    if (JSON.stringify(alignedColumnsPinning) !== JSON.stringify(columnsPinning)) {
      _setColumnsPinning(alignedColumnsPinning);
    }
  }, [key, alignedColumnsPinning, columnsPinning, _setColumnsPinning]);

  const resetColumnsPinning = () => {
    setColumnsPinning(defaultColumnsPinning);
  };

  if (!key) {
    return {
      columnsPinning: defaultColumnsPinning,
      setColumnsPinning,
      resetColumnsPinning,
    } as const;
  }

  return {
    columnsPinning: alignedColumnsPinning,
    setColumnsPinning,
    resetColumnsPinning,
  } as const;
}
