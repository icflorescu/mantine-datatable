import { useLocalStorage } from '@mantine/hooks';
import { useMemo } from 'react';
import { DataTableColumn } from '../types/DataTableColumn';

export type DataTableColumnToggle = {
  accessor: string | undefined;
  defaultToggle: boolean;
  toggleable: boolean;
  toggled: boolean;
};

export const useDragToggleColumns = <T>({
  key,
  columns = [],
}: {
  key: string | undefined;
  columns: DataTableColumn<T>[];
}) => {
  // Default columns id ordered is the order of the columns in the array
  const defaultColumnsOrder = (columns && columns.map((column) => column.accessor)) || [];

  // Default columns id toggled is the array of columns which have the toggleable property set to true
  const defaultColumnsToggle =
    columns &&
    columns.map((column) => ({
      accessor: column.accessor,
      defaultToggle: column.defaultToggle || true,
      toggleable: column.toggleable,
      toggled: column.defaultToggle || true,
    }));

  // Store the columns order in localStorage
  const [columnsOrder, setColumnsOrder] = useLocalStorage<string[]>({
    key: `${key}-columns-order`,
    defaultValue: defaultColumnsOrder as string[],
    getInitialValueInEffect: true,
  });

  // Store the columns toggle in localStorage
  const [columnsToggle, setColumnsToggle] = useLocalStorage<DataTableColumnToggle[]>({
    key: `${key}-columns-toggle`,
    defaultValue: defaultColumnsToggle as DataTableColumnToggle[],
    getInitialValueInEffect: true,
  });

  // we won't use the "remove" function from useLocalStorage() because
  // we got issue with rendering
  const resetColumnsOrder = () => setColumnsOrder(defaultColumnsOrder as string[]);

  const resetColumnsToggle = () => setColumnsToggle(defaultColumnsToggle as DataTableColumnToggle[]);

  const effectiveColumns = useMemo(() => {
    if (!columnsOrder) {
      return columns;
    }

    const result = columnsOrder
      .map((order) => columns.find((column) => column.accessor === order))
      .filter((column) => {
        return columnsToggle.find((toggle) => {
          return toggle.accessor === column?.accessor;
        })?.toggled;
      });

    return result;
  }, [columns, columnsOrder, columnsToggle]);

  return {
    effectiveColumns: effectiveColumns as DataTableColumn<T>[],

    // Order handling
    setColumnsOrder,
    columnsOrder: columnsOrder as string[],
    resetColumnsOrder,

    // Toggle handling
    columnsToggle: columnsToggle as DataTableColumnToggle[],
    setColumnsToggle,
    resetColumnsToggle,
  } as const;
};
