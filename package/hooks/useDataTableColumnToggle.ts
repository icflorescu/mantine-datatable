import { useLocalStorage } from '@mantine/hooks';
import { useEffect, useMemo } from 'react';
import type { DataTableColumn } from '../types/DataTableColumn';

export type DataTableColumnToggle = {
  accessor: string;
  defaultToggle: boolean;
  toggleable: boolean;
  toggled: boolean;
};

/**
 * Hook to handle column visibility toggling with localStorage persistence.
 * @see https://icflorescu.github.io/mantine-datatable/examples/column-dragging-and-toggling/
 */
export function useDataTableColumnToggle<T>({
  key,
  columns = [],
  getInitialValueInEffect = true,
}: {
  /**
   * The key to use in localStorage to store the columns toggle state.
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
  // Default columns toggle state
  const defaultColumnsToggle = useMemo(
    () =>
      columns?.map((column) => ({
        accessor: column.accessor as string,
        defaultToggle: column.defaultToggle || true,
        toggleable: column.toggleable as boolean,
        toggled: column.defaultToggle === undefined ? true : column.defaultToggle,
      })) as DataTableColumnToggle[],
    [columns]
  );

  const [storedColumnsToggle, _setColumnsToggle] = useLocalStorage<DataTableColumnToggle[]>({
    key: key ? `${key}-columns-toggle` : '',
    defaultValue: key ? defaultColumnsToggle : undefined,
    getInitialValueInEffect,
  });

  const columnsToggle = storedColumnsToggle ?? defaultColumnsToggle;

  function setColumnsToggle(toggle: DataTableColumnToggle[]) {
    if (key) {
      _setColumnsToggle(toggle);
    }
  }

  // Align stored toggle state with current column definitions: drop accessors
  // that no longer exist, append accessors added since last persisted state.
  const alignedColumnsToggle = useMemo(() => {
    if (!columnsToggle) return defaultColumnsToggle;
    const aligned: DataTableColumnToggle[] = [];
    columnsToggle.forEach((col) => {
      if (columns.find((c) => c.accessor === col.accessor)) {
        aligned.push(col);
      }
    });
    columns.forEach((col) => {
      if (!aligned.find((c) => c.accessor === col.accessor)) {
        aligned.push({
          accessor: col.accessor as string,
          defaultToggle: col.defaultToggle || true,
          toggleable: col.toggleable as boolean,
          toggled: col.defaultToggle === undefined ? true : col.defaultToggle,
        });
      }
    });
    return aligned;
  }, [columnsToggle, columns, defaultColumnsToggle]);

  // Persist alignment in an effect — never set state during render
  useEffect(() => {
    if (!key) return;
    if (!columnsToggle) return;
    if (JSON.stringify(alignedColumnsToggle) !== JSON.stringify(columnsToggle)) {
      _setColumnsToggle(alignedColumnsToggle);
    }
  }, [key, alignedColumnsToggle, columnsToggle, _setColumnsToggle]);

  const resetColumnsToggle = () => {
    setColumnsToggle(defaultColumnsToggle);
  };

  if (!key) {
    return {
      columnsToggle,
      setColumnsToggle,
      resetColumnsToggle,
    } as const;
  }

  return {
    columnsToggle: alignedColumnsToggle,
    setColumnsToggle,
    resetColumnsToggle,
  } as const;
}
