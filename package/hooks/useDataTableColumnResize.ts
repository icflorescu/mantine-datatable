import { useLocalStorage } from '@mantine/hooks';
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import type { DataTableColumn } from '../types/DataTableColumn';

type DataTableColumnWidth = Record<string, string | number>;

/**
 * Hook to handle column resizing with localStorage persistence.
 *
 * Strategy (mirrors `mantine-list-view-table`):
 * 1. Until the user grabs a handle, the table stays in `table-layout: auto`
 *    so declarative widths — including `width: '0%'` on actions columns —
 *    work as documented.
 * 2. On mousedown we snapshot every header cell into pixel widths and switch
 *    to `table-layout: fixed` so pixel widths are honored strictly during
 *    the drag and afterwards.
 * 3. The lock stays in place until `resetColumnsWidth` is called.
 *
 * @see https://icflorescu.github.io/mantine-datatable/examples/column-resizing/
 */
export function useDataTableColumnResize<T>({
  key,
  columns = [],
  getInitialValueInEffect = true,
  headerRef,
}: {
  /** The key to use in localStorage to store the columns width. */
  key: string | undefined;
  /** Columns definitions. */
  columns: DataTableColumn<T>[];
  /**
   * If set to true, value will be updated in useEffect after mount.
   * @default true
   */
  getInitialValueInEffect?: boolean;
  /** Reference to the table header element for measuring column widths. */
  headerRef?: RefObject<HTMLTableSectionElement | null>;
  /**
   * Reference to the scroll viewport for calculating overflow.
   * Kept for backwards compatibility; no longer used internally.
   */
  scrollViewportRef?: RefObject<HTMLElement | null>;
}) {
  const hasResizableColumns = useMemo(() => {
    return columns.some((c) => c.resizable && !c.hidden && c.accessor !== '__selection__');
  }, [columns]);

  const getDefaultColumnsWidth = useCallback(() => {
    return columns
      .filter((column) => column.accessor !== '__selection__')
      .map((column) => ({ [column.accessor]: column.width ?? 'auto' }));
  }, [columns]);

  // Honor caller's `getInitialValueInEffect`: when false the read is synchronous
  // and we can seed `effectiveColumnsWidth` directly; when true the value lands
  // after mount and the hydration effect below picks it up.
  const [storedColumnsWidth, setStoredColumnsWidth] = useLocalStorage<DataTableColumnWidth[]>({
    key: key ? `${key}-columns-width` : '',
    defaultValue: key ? getDefaultColumnsWidth() : undefined,
    getInitialValueInEffect,
  });

  const [effectiveColumnsWidth, setEffectiveColumnsWidth] = useState<DataTableColumnWidth[]>(() => {
    if (key && storedColumnsWidth && storedColumnsWidth.length > 0) {
      return storedColumnsWidth;
    }
    return getDefaultColumnsWidth();
  });

  // True only during an active drag — drives cursor / user-select styling
  const [isResizing, setIsResizing] = useState(false);

  // Marks effective widths as user-changed so the persistence effect knows to
  // sync them to localStorage. Hydration / column re-alignment never set this.
  const dirtyRef = useRef(false);

  // Sync stored → effective whenever the persisted value lands or changes
  // (covers `getInitialValueInEffect: true`, cross-tab updates, etc.).
  // Idempotent: when values are unchanged React bails out of the re-render.
  useEffect(() => {
    if (!key) return;
    if (!storedColumnsWidth || storedColumnsWidth.length === 0) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEffectiveColumnsWidth(storedColumnsWidth);
  }, [key, storedColumnsWidth]);

  // Re-align effective state with the current column set: drop entries for
  // removed accessors, add defaults for newly introduced columns. Bails out
  // when nothing actually changed to avoid extra renders.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEffectiveColumnsWidth((prev) => {
      const validAccessors = new Set(
        columns.filter((c) => c.accessor !== '__selection__').map((c) => String(c.accessor))
      );
      const filtered = prev.filter((entry) => validAccessors.has(Object.keys(entry)[0]));
      const present = new Set(filtered.map((entry) => Object.keys(entry)[0]));
      let added = false;
      for (const column of columns) {
        if (column.accessor === '__selection__') continue;
        const accessor = String(column.accessor);
        if (present.has(accessor)) continue;
        filtered.push({ [accessor]: column.width ?? 'auto' });
        added = true;
      }
      const removed = filtered.length !== prev.length || added;
      return removed ? filtered : prev;
    });
  }, [columns]);

  const updateColumnWidths = useCallback(
    (updates: Array<{ accessor: string; width: string | number }>) => {
      const filtered = updates.filter((u) => u.accessor !== '__selection__');
      if (filtered.length === 0) return;

      dirtyRef.current = true;
      setEffectiveColumnsWidth((prev) =>
        prev.map((col) => {
          const accessor = Object.keys(col)[0];
          const update = filtered.find((u) => u.accessor === accessor);
          return update ? { [accessor]: update.width } : col;
        })
      );
    },
    []
  );

  // Persist user-initiated width changes — but only when no drag is in flight.
  // `localStorage.setItem` is synchronous and writing it on every mousemove
  // would block the main thread and visibly hurt drag smoothness.
  useEffect(() => {
    if (!key || !dirtyRef.current) return;
    if (isResizing) return;
    dirtyRef.current = false;
    setStoredColumnsWidth(effectiveColumnsWidth);
  }, [key, effectiveColumnsWidth, isResizing, setStoredColumnsWidth]);

  const setColumnWidth = useCallback(
    (accessor: string, width: string | number) => {
      updateColumnWidths([{ accessor, width }]);
    },
    [updateColumnWidths]
  );

  const setMultipleColumnWidths = useCallback(
    (updates: Array<{ accessor: string; width: string | number }>) => {
      updateColumnWidths(updates);
    },
    [updateColumnWidths]
  );

  /**
   * Snapshot every header cell width into the React state. Called the moment
   * the user grabs a handle. Idempotent: if all cells are already pixel-locked
   * the snapshot reads back the same values.
   */
  const beginResize = useCallback(() => {
    setIsResizing(true);

    const thead = headerRef?.current;
    if (!thead) return;

    const cells = Array.from(thead.querySelectorAll<HTMLTableCellElement>('th[data-accessor]'));
    if (cells.length === 0) return;

    const snapshot: DataTableColumnWidth[] = [];

    for (const cell of cells) {
      const accessor = cell.getAttribute('data-accessor');
      if (!accessor) continue;
      if (accessor === '__selection__') continue;
      const width = Math.round(cell.getBoundingClientRect().width);
      snapshot.push({ [accessor]: `${width}px` });
    }

    dirtyRef.current = true;
    setEffectiveColumnsWidth(snapshot);
  }, [headerRef]);

  /** Clear the active-drag flag. Persistence runs from the effect once `isResizing` flips off. */
  const endResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resetColumnsWidth = useCallback(() => {
    const defaults = getDefaultColumnsWidth();
    dirtyRef.current = true;
    setEffectiveColumnsWidth(defaults);
    setIsResizing(false);
  }, [getDefaultColumnsWidth]);

  const allResizableWidthsInitial = useMemo(() => {
    if (!hasResizableColumns) return false;
    const resizable = columns.filter((c) => c.resizable && !c.hidden && c.accessor !== '__selection__');
    return effectiveColumnsWidth
      .filter((cw) => {
        const accessor = Object.keys(cw)[0];
        return resizable.some((c) => c.accessor === accessor);
      })
      .every((cw) => {
        const w = Object.values(cw)[0];
        return w === 'auto' || w === 'initial';
      });
  }, [hasResizableColumns, columns, effectiveColumnsWidth]);

  // No-op kept for backwards compatibility — measurement is now lazy
  const measureAndSetColumnWidths = useCallback(() => {
    /* noop */
  }, []);

  return {
    columnsWidth: effectiveColumnsWidth,
    setColumnsWidth: updateColumnWidths,
    setColumnWidth,
    setMultipleColumnWidths,
    resetColumnsWidth,
    hasResizableColumns,
    allResizableWidthsInitial,
    measureAndSetColumnWidths,
    isResizing,
    beginResize,
    endResize,
  } as const;
}
