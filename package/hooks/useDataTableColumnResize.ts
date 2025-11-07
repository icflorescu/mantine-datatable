import { useLocalStorage } from '@mantine/hooks';
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import type { DataTableColumn } from '../types/DataTableColumn';

type DataTableColumnWidth = Record<string, string | number>;

/**
 * Hook to handle column resizing with localStorage persistence and auto-resize calculation.
 * @see https://icflorescu.github.io/mantine-datatable/examples/column-resizing/
 */
export function useDataTableColumnResize<T>({
  key,
  columns = [],
  getInitialValueInEffect = true,
  headerRef,
  scrollViewportRef,
  onFixedLayoutChange,
}: {
  /**
   * The key to use in localStorage to store the columns width.
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
}) {
  const isInitializedRef = useRef(false);
  const naturalWidthsRef = useRef<Record<string, number>>({});
  const [isSSR, setIsSSR] = useState(true);

  // Check if columns have resizable feature
  const hasResizableColumns = useMemo(() => {
    return columns.some((c) => c.resizable && !c.hidden && c.accessor !== '__selection__');
  }, [columns]);

  // Get resizable columns
  const resizableColumns = useMemo(() => {
    return columns.filter((c) => c.resizable && !c.hidden && c.accessor !== '__selection__');
  }, [columns]);

  // Check if we need to measure natural widths (columns without explicit width)
  const needsNaturalMeasurement = useMemo(() => {
    return resizableColumns.some((c) => c.width === undefined || c.width === '' || c.width === 'initial');
  }, [resizableColumns]);

  // Create default column widths - use explicit widths or 'auto' for natural sizing
  // Exclude selection column from width management
  const getDefaultColumnsWidth = useCallback(() => {
    return columns
      .filter((column) => column.accessor !== '__selection__')
      .map((column) => ({
        [column.accessor]: column.width ?? 'auto',
      }));
  }, [columns]);

  const [storedColumnsWidth, setStoredColumnsWidth] = useLocalStorage<DataTableColumnWidth[]>({
    key: key ? `${key}-columns-width` : '',
    defaultValue: key ? getDefaultColumnsWidth() : undefined,
    getInitialValueInEffect: false, // We'll handle initialization manually
  });

  // Current effective column widths (combines stored + measured natural widths)
  const [effectiveColumnsWidth, setEffectiveColumnsWidth] = useState<DataTableColumnWidth[]>(() =>
    getDefaultColumnsWidth()
  );

  // Handle SSR
  useEffect(() => {
    setIsSSR(false);
  }, []);

  // Measure natural widths of columns
  const measureNaturalWidths = useCallback(() => {
    if (!headerRef?.current || isSSR) return {};

    const thead = headerRef.current;
    const headerCells = Array.from(thead.querySelectorAll<HTMLTableCellElement>('th[data-accessor]'));
    const naturalWidths: Record<string, number> = {};

    headerCells.forEach((cell) => {
      const accessor = cell.getAttribute('data-accessor');
      if (!accessor || accessor === '__selection__') return;

      const column = resizableColumns.find((c) => c.accessor === accessor);
      if (!column) return;

      // Only measure if column doesn't have explicit width
      if (column.width === undefined || column.width === '' || column.width === 'initial') {
        const rect = cell.getBoundingClientRect();
        naturalWidths[accessor] = Math.round(rect.width);
      }
    });

    return naturalWidths;
  }, [headerRef, resizableColumns, isSSR]);

  // Update column widths (both stored and effective)
  // Filter out selection column from updates
  const updateColumnWidths = useCallback(
    (updates: Array<{ accessor: string; width: string | number }>) => {
      // Filter out any updates to the selection column
      const filteredUpdates = updates.filter((update) => update.accessor !== '__selection__');
      
      const newWidths = effectiveColumnsWidth.map((column) => {
        const accessor = Object.keys(column)[0];
        const update = filteredUpdates.find((u) => u.accessor === accessor);

        if (update) {
          return { [accessor]: update.width };
        }
        return column;
      });

      setEffectiveColumnsWidth(newWidths);

      // Also update stored widths if we have a key
      if (key) {
        setStoredColumnsWidth(newWidths);
      }
    },
    [effectiveColumnsWidth, key, setStoredColumnsWidth]
  );

  const setMultipleColumnWidths = useCallback(
    (updates: Array<{ accessor: string; width: string | number }>) => {
      updateColumnWidths(updates);
    },
    [updateColumnWidths]
  );

  // Initialize column widths (measure natural widths and apply stored widths)
  const initializeColumnWidths = useCallback(() => {
    if (!headerRef?.current || !onFixedLayoutChange || isSSR) return;

    // First, measure natural widths if needed
    if (needsNaturalMeasurement) {
      // Temporarily use auto layout to get natural widths
      onFixedLayoutChange(false);

      // Wait for layout to settle, then measure
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const naturalWidths = measureNaturalWidths();
          naturalWidthsRef.current = { ...naturalWidthsRef.current, ...naturalWidths };

          // Create effective widths combining stored and natural widths
          // Exclude selection column from width management
          const newEffectiveWidths = columns
            .filter((column) => column.accessor !== '__selection__')
            .map((column) => {
              const accessor = column.accessor as string;

              // Check if we have a stored width for this column
              const storedWidth = storedColumnsWidth?.find((w) => Object.keys(w)[0] === accessor);
              if (storedWidth && storedWidth[accessor] !== 'auto') {
                return { [accessor]: storedWidth[accessor] };
              }

              // Use natural width if available, otherwise use column definition or auto
              const naturalWidth = naturalWidths[accessor];
              if (naturalWidth) {
                return { [accessor]: `${naturalWidth}px` };
              }

              return { [accessor]: column.width ?? 'auto' };
            });

          setEffectiveColumnsWidth(newEffectiveWidths);

          // Switch to fixed layout for resizing
          setTimeout(() => {
            onFixedLayoutChange(true);
            isInitializedRef.current = true;
          }, 10);
        });
      });
    } else {
      // All columns have explicit widths, use them directly
      // Exclude selection column from width management
      const explicitWidths = columns
        .filter((column) => column.accessor !== '__selection__')
        .map((column) => ({
          [column.accessor]: column.width ?? 'auto',
        }));

      setEffectiveColumnsWidth(explicitWidths);
      onFixedLayoutChange(true);
      isInitializedRef.current = true;
    }
  }, [
    headerRef,
    onFixedLayoutChange,
    isSSR,
    needsNaturalMeasurement,
    measureNaturalWidths,
    columns,
    storedColumnsWidth,
  ]);

  const measureAndSetColumnWidths = initializeColumnWidths;

  // Initialize on mount and when columns change
  useEffect(() => {
    if (!hasResizableColumns || !onFixedLayoutChange || isSSR) {
      onFixedLayoutChange?.(false);
      return;
    }

    // Reset initialization flag when columns change
    isInitializedRef.current = false;

    // Initialize after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initializeColumnWidths();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [hasResizableColumns, onFixedLayoutChange, isSSR, initializeColumnWidths]);

  // Load stored widths on client-side hydration
  useEffect(() => {
    if (isSSR || !key || !getInitialValueInEffect) return;

    // Apply stored widths if available
    if (storedColumnsWidth && storedColumnsWidth.length > 0) {
      setEffectiveColumnsWidth(storedColumnsWidth);
    }
  }, [isSSR, key, getInitialValueInEffect, storedColumnsWidth]);
  // Reset all columns to their natural/initial widths
  const resetColumnsWidth = useCallback(() => {
    // Clear stored widths
    if (key) {
      setStoredColumnsWidth(getDefaultColumnsWidth());
    }

    // Reset to natural widths
    naturalWidthsRef.current = {};
    isInitializedRef.current = false;

    // Re-initialize to measure natural widths
    if (onFixedLayoutChange) {
      onFixedLayoutChange(false);
      setTimeout(() => {
        initializeColumnWidths();
      }, 10);
    }
  }, [key, setStoredColumnsWidth, getDefaultColumnsWidth, onFixedLayoutChange, initializeColumnWidths]);

  // Set width for a single column
  const setColumnWidth = useCallback(
    (accessor: string, width: string | number) => {
      updateColumnWidths([{ accessor, width }]);
    },
    [updateColumnWidths]
  );

  // Check if all resizable columns are using auto/natural widths
  const allResizableWidthsInitial = useMemo(() => {
    if (!hasResizableColumns) return false;
    return effectiveColumnsWidth
      .filter((colWidth) => {
        const accessor = Object.keys(colWidth)[0];
        return resizableColumns.some((c) => c.accessor === accessor);
      })
      .every((colWidth) => {
        const width = Object.values(colWidth)[0];
        return width === 'auto' || width === 'initial';
      });
  }, [hasResizableColumns, effectiveColumnsWidth, resizableColumns]);

  return {
    columnsWidth: effectiveColumnsWidth,
    setColumnsWidth: updateColumnWidths,
    setColumnWidth,
    setMultipleColumnWidths,
    resetColumnsWidth,
    hasResizableColumns,
    allResizableWidthsInitial,
    measureAndSetColumnWidths,
  } as const;
}
