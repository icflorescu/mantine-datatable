import { useLocalStorage } from '@mantine/hooks';
import { useMemo } from 'react';
import { DataTableColumn } from '../types/DataTableColumn';

export type DataTableColumnToggle = {
  accessor: string | undefined;
  defaultToggle: boolean;
  toggleable: boolean;
  toggled: boolean;
};

type DataTableColumnWidth = Record<string, string | number>;

/**
 * Hook to handle the drag-and-drop column reordering and column toggling.
 * @see https://icflorescu.github.io/mantine-datatable/examples/column-dragging-and-toggling/
 */
export const useDragToggleColumns = <T>({
  key,
  columns = [],
}: {
  /**
   * The key to use in localStorage to store the columns order and toggle state.
   */
  key: string | undefined;
  /**
   * Columns definitions.
   */
  columns: DataTableColumn<T>[];
}) => {
  // Default columns id ordered is the order of the columns in the array
  const defaultColumnsOrder = (columns && columns.map((column) => column.accessor)) || [];

  // create an array of object with key = accessor and value = width
  const defaultColumnsWidth =
    (columns && columns.map((column) => ({ [column.accessor]: column.width ?? 'auto' }))) || [];

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

  // Store the columns with in localStorage
  const [columnsWidth, setColumnsWidth] = useLocalStorage<DataTableColumnWidth[]>({
    key: `${key}-columns-width`,
    defaultValue: defaultColumnsWidth as DataTableColumnWidth[],
    getInitialValueInEffect: true,
  });

  // we won't use the "remove" function from useLocalStorage() because
  // we got issue with rendering
  const resetColumnsOrder = () => setColumnsOrder(defaultColumnsOrder as string[]);

  const resetColumnsToggle = () => setColumnsToggle(defaultColumnsToggle as DataTableColumnToggle[]);

  const resetColumnsWidth = () => setColumnsWidth(defaultColumnsWidth as DataTableColumnWidth[]);

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

    const newWith = result.map((column) => {
      return {
        ...column,
        width: columnsWidth.find((width) => {
          return width[column?.accessor as string];
        })?.[column?.accessor as string],
      };
    });

    return newWith;
  }, [columns, columnsOrder, columnsToggle, columnsWidth]);

  const setColumnWidth = (accessor: string, width: string | number) => {
    const newColumnsWidth = columnsWidth.map((column) => {
      if (!column[accessor]) {
        return column;
      }
      return {
        [accessor]: width,
      };
    });

    setColumnsWidth(newColumnsWidth);
  };

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

    // Resize handling
    columnsWidth,
    setColumnsWidth,
    setColumnWidth,
    resetColumnsWidth,
  } as const;
};
