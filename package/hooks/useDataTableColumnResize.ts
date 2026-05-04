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
 * 2. On mousedown we snapshot every header cell into pixel widths, lock the
 *    table total, and switch to `table-layout: fixed` so pixel widths are
 *    honored strictly during the drag and afterwards.
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

  const [storedColumnsWidth, setStoredColumnsWidth] = useLocalStorage<DataTableColumnWidth[]>({
    key: key ? `${key}-columns-width` : '',
    defaultValue: key ? getDefaultColumnsWidth() : undefined,
    getInitialValueInEffect: false,
  });

  const [effectiveColumnsWidth, setEffectiveColumnsWidth] = useState<DataTableColumnWidth[]>(() =>
    getDefaultColumnsWidth()
  );

  // True only during an active drag — drives cursor / user-select styling
  const [isResizing, setIsResizing] = useState(false);

  // Once locked, every column has a pixel width and the table-layout switches
  // to `fixed`. Persists across drags until `resetColumnsWidth` is called.
  const [isLocked, setIsLocked] = useState(false);

  // Locked total table width in pixels
  const [tableWidth, setTableWidth] = useState<number | null>(null);

  // Marks effective widths as user-changed so the persistence effect knows to
  // sync them to localStorage. We never want the *hydration* path to also
  // round-trip through localStorage.
  const dirtyRef = useRef(false);

  // Apply persisted widths after hydration. If any persisted width looks like
  // a pixel value, the table also enters the locked state on mount.
  useEffect(() => {
    if (!key || !getInitialValueInEffect) return;
    if (!storedColumnsWidth || storedColumnsWidth.length === 0) return;

    const hasPixelWidth = storedColumnsWidth.some((entry) => {
      const value = Object.values(entry)[0];
      return typeof value === 'string' && /px$/.test(value);
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEffectiveColumnsWidth(storedColumnsWidth);
    if (hasPixelWidth) {
      setIsLocked(true);
    }
  }, [key, getInitialValueInEffect, storedColumnsWidth]);

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

  // Persist user-initiated width changes to localStorage. Gated by `dirtyRef`
  // so the hydration → effective sync above doesn't bounce back into storage
  // and create a render loop.
  useEffect(() => {
    if (!key || !dirtyRef.current) return;
    dirtyRef.current = false;
    setStoredColumnsWidth(effectiveColumnsWidth);
  }, [key, effectiveColumnsWidth, setStoredColumnsWidth]);

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
   * Snapshot every header cell width into the React state and lock the
   * table-layout to `fixed`. Called the moment the user grabs a handle.
   */
  const beginResize = useCallback(() => {
    setIsResizing(true);

    // Already locked from a previous drag (or hydrated from storage) — nothing to snapshot
    if (isLocked) return;

    const thead = headerRef?.current;
    if (!thead) return;

    const cells = Array.from(thead.querySelectorAll<HTMLTableCellElement>('th[data-accessor]'));
    if (cells.length === 0) return;

    const snapshot: DataTableColumnWidth[] = [];
    let total = 0;

    for (const cell of cells) {
      const accessor = cell.getAttribute('data-accessor');
      if (!accessor) continue;
      const width = Math.round(cell.getBoundingClientRect().width);
      total += width;
      if (accessor === '__selection__') continue;
      snapshot.push({ [accessor]: `${width}px` });
    }

    dirtyRef.current = true;
    setEffectiveColumnsWidth(snapshot);
    setTableWidth(total);
    setIsLocked(true);
  }, [headerRef, isLocked]);

  /** Clear the active-drag flag — persistence is handled by the effect above. */
  const endResize = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resetColumnsWidth = useCallback(() => {
    const defaults = getDefaultColumnsWidth();
    dirtyRef.current = true;
    setEffectiveColumnsWidth(defaults);
    setTableWidth(null);
    setIsResizing(false);
    setIsLocked(false);
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
    isLocked,
    tableWidth,
    beginResize,
    endResize,
  } as const;
}
