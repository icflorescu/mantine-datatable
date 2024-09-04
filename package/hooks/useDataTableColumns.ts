import { useLocalStorage } from '@mantine/hooks';
import { useMemo } from 'react';
import type { DataTableColumn } from '../types/DataTableColumn';

export type DataTableColumnToggle = {
  accessor: string;
  defaultToggle: boolean;
  toggleable: boolean;
  toggled: boolean;
};

type DataTableColumnWidth = Record<string, string | number>;

/**
 * Hook to handle column features such as drag-and-drop reordering, visibility toggling and resizing.
 * @see https://icflorescu.github.io/mantine-datatable/examples/column-dragging-and-toggling/
 */
export const useDataTableColumns = <T>({
  key,
  columns = [],
  getInitialValueInEffect = true,
}: {
  /**
   * The key to use in localStorage to store the columns order and toggle state.
   */
  key: string | undefined;
  /**
   * Columns definitions.
   */
  columns: DataTableColumn<T>[];
  /**
   * Columns definitions.
   */
  /**
   * If set to true, value will be update is useEffect after mount.
   * @default true
   */
  getInitialValueInEffect?: boolean;
}) => {
  // align order
  function alignColumnsOrder<T>(columnsOrder: string[], columns: DataTableColumn<T>[]) {
    const updatedColumnsOrder: string[] = [];
    columnsOrder.forEach((col) => {
      if (columns.find((c) => c.accessor === col)) {
        updatedColumnsOrder.push(col);
      }
    });
    columns.forEach((col) => {
      if (!updatedColumnsOrder.includes(col.accessor as string)) {
        updatedColumnsOrder.push(col.accessor as string);
      }
    });
    return updatedColumnsOrder;
  }

  // align toggle
  function alignColumnsToggle<T>(columnsToggle: DataTableColumnToggle[], columns: DataTableColumn<T>[]) {
    const updatedColumnsToggle: DataTableColumnToggle[] = [];
    columnsToggle.forEach((col) => {
      if (columns.find((c) => c.accessor === col.accessor)) {
        updatedColumnsToggle.push(col);
      }
    });
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

  // align width
  function alignColumnsWidth<T>(columnsWidth: DataTableColumnWidth[], columns: DataTableColumn<T>[]) {
    const updatedColumnsWidth: DataTableColumnWidth[] = [];

    columnsWidth.forEach((col) => {
      const accessor = Object.keys(col)[0];
      if (columns.find((c) => c.accessor === accessor)) {
        updatedColumnsWidth.push(col);
      }
    });

    columns.forEach((col) => {
      const accessor = col.accessor;
      if (!updatedColumnsWidth.find((c) => Object.keys(c)[0] === accessor)) {
        const widthObj: DataTableColumnWidth = {};
        widthObj[accessor as string] = '';
        updatedColumnsWidth.push(widthObj);
      }
    });

    return updatedColumnsWidth;
  }

  // align order
  function useAlignColumnsOrder() {
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

    if (!key) {
      return [columnsOrder, setColumnsOrder] as const;
    }

    const alignedColumnsOrder = alignColumnsOrder(columnsOrder, columns);

    const prevColumnsOrder = JSON.stringify(columnsOrder);

    if (JSON.stringify(alignedColumnsOrder) !== prevColumnsOrder) {
      setColumnsOrder(alignedColumnsOrder);
    }

    return [alignedColumnsOrder, setColumnsOrder] as const;
  }

  function useAlignColumnsToggle() {
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

    if (!key) {
      return [columnsToggle, setColumnsToggle] as const;
    }

    const alignedColumnsToggle = alignColumnsToggle(columnsToggle, columns);

    const prevColumnsToggle = JSON.stringify(columnsToggle);

    if (JSON.stringify(alignedColumnsToggle) !== prevColumnsToggle) {
      setColumnsToggle(alignedColumnsToggle);
    }

    return [alignColumnsToggle(columnsToggle, columns), setColumnsToggle] as const;
  }

  function useAlignColumnsWidth() {
    const [columnsWidth, _setColumnsWidth] = useLocalStorage<DataTableColumnWidth[]>({
      key: key ? `${key}-columns-width` : '',
      defaultValue: key ? (defaultColumnsWidth as DataTableColumnWidth[]) : undefined,
      getInitialValueInEffect,
    });

    function setColumnsWidth(
      width: DataTableColumnWidth[] | ((prev: DataTableColumnWidth[]) => DataTableColumnWidth[])
    ) {
      if (key) {
        _setColumnsWidth(width);
      }
    }

    if (!key) {
      return [columnsWidth, setColumnsWidth] as const;
    }

    const alignedColumnsWidth = alignColumnsWidth(columnsWidth, columns);

    const prevColumnsWidth = JSON.stringify(columnsWidth);

    if (JSON.stringify(alignedColumnsWidth) !== prevColumnsWidth) {
      setColumnsWidth(alignedColumnsWidth);
    }

    return [alignColumnsWidth(columnsWidth, columns), setColumnsWidth] as const;
  }

  // Default columns id ordered is the order of the columns in the array
  const defaultColumnsOrder = (columns && columns.map((column) => column.accessor)) || [];

  // create an array of object with key = accessor and value = width
  const defaultColumnsWidth =
    (columns && columns.map((column) => ({ [column.accessor]: column.width ?? 'initial' }))) || [];

  // Default columns id toggled is the array of columns which have the toggleable property set to true
  const defaultColumnsToggle =
    columns &&
    columns.map((column) => ({
      accessor: column.accessor,
      defaultToggle: column.defaultToggle || true,
      toggleable: column.toggleable,
      toggled: column.defaultToggle === undefined ? true : column.defaultToggle,
    }));

  // Store the columns order in localStorage
  const [columnsOrder, setColumnsOrder] = useAlignColumnsOrder();

  // Store the columns toggle in localStorage
  const [columnsToggle, setColumnsToggle] = useAlignColumnsToggle();

  // Store the columns widths in localStorage
  const [columnsWidth, setColumnsWidth] = useAlignColumnsWidth();

  // we won't use the "remove" function from useLocalStorage() because
  // we got issue with rendering
  const resetColumnsOrder = () => setColumnsOrder(defaultColumnsOrder as string[]);

  const resetColumnsToggle = () => {
    setColumnsToggle(defaultColumnsToggle as DataTableColumnToggle[]);
  };

  const resetColumnsWidth = () => setColumnsWidth(defaultColumnsWidth as DataTableColumnWidth[]);

  const effectiveColumns = useMemo(() => {
    if (!columnsOrder) {
      return columns;
    }

    const result = columnsOrder
      .map((order) => columns.find((column) => column.accessor === order))
      .map((column) => {
        return {
          ...column,
          hidden:
            column?.hidden ||
            !columnsToggle.find((toggle) => {
              return toggle.accessor === column?.accessor;
            })?.toggled,
        };
      }) as DataTableColumn<T>[];

    const newWidths = result.map((column) => {
      return {
        ...column,
        width: columnsWidth.find((width) => {
          return width[column?.accessor as string];
        })?.[column?.accessor as string],
      };
    });

    return newWidths;
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
