import { useLocalStorage } from '@mantine/hooks';
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
  // Align toggle state with current columns definition
  function alignColumnsToggle<T>(columnsToggle: DataTableColumnToggle[], columns: DataTableColumn<T>[]) {
    const updatedColumnsToggle: DataTableColumnToggle[] = [];

    // Keep existing toggle states for columns that still exist
    columnsToggle.forEach((col) => {
      if (columns.find((c) => c.accessor === col.accessor)) {
        updatedColumnsToggle.push(col);
      }
    });

    // Add toggle state for new columns
    columns.forEach((col) => {
      if (!updatedColumnsToggle.find((c) => c.accessor === col.accessor)) {
        updatedColumnsToggle.push({
          accessor: col.accessor as string,
          defaultToggle: col.defaultToggle || true,
          toggleable: col.toggleable as boolean,
          toggled: col.defaultToggle === undefined ? true : col.defaultToggle,
        });
      }
    });

    return updatedColumnsToggle as DataTableColumnToggle[];
  }

  // Default columns toggle state
  const defaultColumnsToggle =
    columns &&
    columns.map((column) => ({
      accessor: column.accessor,
      defaultToggle: column.defaultToggle || true,
      toggleable: column.toggleable,
      toggled: column.defaultToggle === undefined ? true : column.defaultToggle,
    }));

  const [columnsToggle, _setColumnsToggle] = useLocalStorage<DataTableColumnToggle[]>({
    key: key ? `${key}-columns-toggle` : '',
    defaultValue: key ? (defaultColumnsToggle as DataTableColumnToggle[]) : undefined,
    getInitialValueInEffect,
  });

  function setColumnsToggle(
    toggle: DataTableColumnToggle[] | ((prev: DataTableColumnToggle[]) => DataTableColumnToggle[])
  ) {
    if (key) {
      _setColumnsToggle(toggle);
    }
  }

  const resetColumnsToggle = () => {
    setColumnsToggle(defaultColumnsToggle as DataTableColumnToggle[]);
  };

  // If no key is provided, return unmanaged state
  if (!key) {
    return {
      columnsToggle: columnsToggle as DataTableColumnToggle[],
      setColumnsToggle,
      resetColumnsToggle,
    } as const;
  }

  // Align toggle state with current columns
  const alignedColumnsToggle = alignColumnsToggle(columnsToggle, columns);
  const prevColumnsToggle = JSON.stringify(columnsToggle);

  if (JSON.stringify(alignedColumnsToggle) !== prevColumnsToggle) {
    setColumnsToggle(alignedColumnsToggle);
  }

  return {
    columnsToggle: alignedColumnsToggle,
    setColumnsToggle,
    resetColumnsToggle,
  } as const;
}
