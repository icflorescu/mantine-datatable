import { useMemo, type RefObject } from 'react';
import type { DataTableColumn } from '../types/DataTableColumn';
import { useDataTableColumnReorder } from './useDataTableColumnReorder';
import { useDataTableColumnResize } from './useDataTableColumnResize';
import { useDataTableColumnToggle, type DataTableColumnToggle } from './useDataTableColumnToggle';

export type { DataTableColumnToggle };

/**
 * Hook to handle column features such as drag-and-drop reordering, visibility toggling and resizing.
 * @see https://icflorescu.github.io/mantine-datatable/examples/column-dragging-and-toggling/
 */
export const useDataTableColumns = <T>({
  key,
  columns = [],
  getInitialValueInEffect = true,
  headerRef,
  scrollViewportRef,
  onFixedLayoutChange,
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
   * If set to true, value will be updated in useEffect after mount.
   * @default true
   */
  getInitialValueInEffect?: boolean;
  /**
   * Reference to the table header element for measuring column widths.
   */
  headerRef?: RefObject<HTMLTableSectionElement | null>;
  /**
   * Reference to the scroll viewport for calculating overflow.
   */
  scrollViewportRef?: RefObject<HTMLElement | null>;
  /**
   * Callback to control fixed layout state in the parent component.
   */
  onFixedLayoutChange?: (enabled: boolean) => void;
}) => {
  // Use specialized hooks for each feature
  const { columnsOrder, setColumnsOrder, resetColumnsOrder } = useDataTableColumnReorder({
    key,
    columns,
    getInitialValueInEffect,
  });

  const { columnsToggle, setColumnsToggle, resetColumnsToggle } = useDataTableColumnToggle({
    key,
    columns,
    getInitialValueInEffect,
  });

  const {
    columnsWidth,
    setColumnsWidth,
    setColumnWidth,
    setMultipleColumnWidths,
    resetColumnsWidth,
    hasResizableColumns,
    allResizableWidthsInitial,
    measureAndSetColumnWidths,
  } = useDataTableColumnResize({
    key,
    columns,
    getInitialValueInEffect,
    headerRef,
    scrollViewportRef,
    onFixedLayoutChange,
  });

  // Compute effective columns based on order, toggle, and width
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
      // Skip width application for selection column
      if (column?.accessor === '__selection__') {
        return column;
      }

      return {
        ...column,
        width: columnsWidth.find((width) => {
          return width[column?.accessor as string];
        })?.[column?.accessor as string],
      };
    });

    return newWidths;
  }, [columns, columnsOrder, columnsToggle, columnsWidth]);

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
    setMultipleColumnWidths,
    resetColumnsWidth,
    hasResizableColumns,
    allResizableWidthsInitial,
    measureAndSetColumnWidths,
  } as const;
};
