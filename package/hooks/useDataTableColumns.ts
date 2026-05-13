import { type RefObject, useMemo } from 'react';
import type { DataTableColumn } from '../types/DataTableColumn';
import { type DataTableColumnPinning, useDataTableColumnPinning } from './useDataTableColumnPinning';
import { useDataTableColumnReorder } from './useDataTableColumnReorder';
import { useDataTableColumnResize } from './useDataTableColumnResize';
import { type DataTableColumnToggle, useDataTableColumnToggle } from './useDataTableColumnToggle';

export type { DataTableColumnPinning, DataTableColumnToggle };

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

  const { columnsPinning, setColumnsPinning, resetColumnsPinning } = useDataTableColumnPinning({
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
    isResizing,
    beginResize,
    endResize,
  } = useDataTableColumnResize({
    key,
    columns,
    getInitialValueInEffect,
    headerRef,
    scrollViewportRef,
  });

  // Compute effective columns based on order, toggle, pinning, and width.
  // Width is applied unconditionally — even without a `storeColumnsKey` —
  // so that `setMultipleColumnWidths` updates from the resize handle
  // actually flow back into the rendered cell `style.width`.
  const effectiveColumns = useMemo(() => {
    let result: DataTableColumn<T>[];
    if (columnsOrder) {
      result = columnsOrder
        .map((order) => columns.find((column) => column.accessor === order))
        .map((column) => {
          // Effective pinned value:
          // - If pinnable: true → use state from columnsPinning.pinned (interactive)
          // - Otherwise → use static column.pinned
          const pinningState = columnsPinning.find((p) => p.accessor === column?.accessor);
          const effectivePinned = column?.pinnable ? pinningState?.pinned : column?.pinned;
          return {
            ...column,
            hidden: column?.hidden || !columnsToggle.find((toggle) => toggle.accessor === column?.accessor)?.toggled,
            pinned: effectivePinned,
          };
        }) as DataTableColumn<T>[];
    } else {
      result = columns;
    }

    // Reorder columns by pinning: left-pinned → unpinned → right-pinned
    const leftPinned = result.filter((c) => c.pinned === 'left');
    const unpinned = result.filter((c) => !c.pinned);
    const rightPinned = result.filter((c) => c.pinned === 'right');
    const reordered = [...leftPinned, ...unpinned, ...rightPinned];

    return reordered.map((column) => {
      if (column?.accessor === '__selection__') return column;
      const accessor = column?.accessor as string;
      const widthEntry = columnsWidth.find((entry) => accessor in entry);
      if (!widthEntry) return column;
      const width = widthEntry[accessor];
      // Treat 'auto' / 'initial' as "no override" so declarative widths win
      if (width === undefined || width === 'auto' || width === 'initial') return column;
      return { ...column, width };
    });
  }, [columns, columnsOrder, columnsToggle, columnsPinning, columnsWidth]);

  // Lock the table layout to `fixed` only when *every* visible column has a
  // pixel width. Mixed states (some 'auto', some pixels) stay in auto layout
  // so the browser keeps the auto cells visible — the user can re-resize to
  // produce a complete pixel snapshot.
  // Recomputes on column visibility changes too, so resize + toggle stays
  // consistent.
  const isLocked = useMemo(() => {
    const visible = effectiveColumns.filter((c) => !c.hidden && c.accessor !== '__selection__');
    if (visible.length === 0) return false;
    return visible.every((c) => typeof c.width === 'string' && /px$/.test(c.width));
  }, [effectiveColumns]);

  const tableWidth = useMemo(() => {
    if (!isLocked) return null;
    let sum = 0;
    for (const col of effectiveColumns) {
      if (col.hidden || col.accessor === '__selection__') continue;
      const w = col.width;
      if (typeof w !== 'string') continue;
      const n = parseInt(w, 10);
      if (Number.isNaN(n)) continue;
      sum += n;
    }
    return sum > 0 ? sum : null;
  }, [isLocked, effectiveColumns]);

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

    // Pinning handling
    columnsPinning: columnsPinning as DataTableColumnPinning[],
    setColumnsPinning,
    resetColumnsPinning,

    // Resize handling
    columnsWidth,
    setColumnsWidth,
    setColumnWidth,
    setMultipleColumnWidths,
    resetColumnsWidth,
    hasResizableColumns,
    allResizableWidthsInitial,
    measureAndSetColumnWidths,
    isResizing,
    isLocked,
    tableWidth,
    beginResize,
    endResize,
  } as const;
};
