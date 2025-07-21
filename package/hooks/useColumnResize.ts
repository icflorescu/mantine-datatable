import { useCallback, useRef, useState } from 'react';

interface UseColumnResizeProps {
  onColumnResize: (updates: Array<{ accessor: string; width: string | number }>) => void;
  minColumnWidth?: number;
}

interface ResizeState {
  isResizing: boolean;
  startX: number;
  originalWidths: { current: number; next: number };
  currentAccessor: string;
  nextAccessor: string | null;
}

export const useColumnResize = ({ onColumnResize, minColumnWidth = 50 }: UseColumnResizeProps) => {
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const currentColumnRef = useRef<HTMLTableCellElement | null>(null);
  const nextColumnRef = useRef<HTMLTableCellElement | null>(null);

  const startResize = useCallback(
    (event: React.MouseEvent, currentColumn: HTMLTableCellElement, currentAccessor: string) => {
      event.preventDefault();
      event.stopPropagation();

      const nextColumn = currentColumn.nextElementSibling as HTMLTableCellElement | null;
      if (!nextColumn) return false; // Can't resize without next column

      const nextAccessor = nextColumn.getAttribute('data-accessor');
      if (!nextAccessor) return false; // Need accessor for next column

      const currentWidth = currentColumn.getBoundingClientRect().width;
      const nextWidth = nextColumn.getBoundingClientRect().width;

      currentColumnRef.current = currentColumn;
      nextColumnRef.current = nextColumn;

      setResizeState({
        isResizing: true,
        startX: event.clientX,
        originalWidths: { current: currentWidth, next: nextWidth },
        currentAccessor,
        nextAccessor,
      });

      // Global styles for better UX
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      return true;
    },
    []
  );

  const updateResize = useCallback(
    (clientX: number) => {
      if (!resizeState || !currentColumnRef.current || !nextColumnRef.current) return;

      const deltaX = clientX - resizeState.startX;

      // Calculate new widths with constraints
      const newCurrentWidth = Math.max(minColumnWidth, resizeState.originalWidths.current + deltaX);

      const newNextWidth = Math.max(minColumnWidth, resizeState.originalWidths.next - deltaX);

      // Calculate the actual delta we can apply based on constraints
      const actualDelta = Math.min(
        deltaX,
        resizeState.originalWidths.next - minColumnWidth // Don't shrink next below minimum
      );

      const finalCurrentWidth = resizeState.originalWidths.current + actualDelta;
      const finalNextWidth = resizeState.originalWidths.next - actualDelta;

      // Apply to DOM for immediate visual feedback
      currentColumnRef.current.style.width = `${finalCurrentWidth}px`;
      nextColumnRef.current.style.width = `${finalNextWidth}px`;

      return { finalCurrentWidth, finalNextWidth };
    },
    [resizeState, minColumnWidth]
  );

  const endResize = useCallback(() => {
    if (!resizeState || !currentColumnRef.current || !nextColumnRef.current) return;

    // Reset global styles
    document.body.style.cursor = 'initial';
    document.body.style.userSelect = 'initial';

    // Get final widths
    const currentWidth = currentColumnRef.current.getBoundingClientRect().width;
    const nextWidth = nextColumnRef.current.getBoundingClientRect().width;

    // Update through callback
    const updates = [{ accessor: resizeState.currentAccessor, width: `${currentWidth}px` }];

    if (resizeState.nextAccessor) {
      updates.push({ accessor: resizeState.nextAccessor, width: `${nextWidth}px` });
    }

    onColumnResize(updates);

    // Clean up
    setResizeState(null);
    currentColumnRef.current = null;
    nextColumnRef.current = null;
  }, [resizeState, onColumnResize]);

  const cancelResize = useCallback(() => {
    if (!resizeState) return;

    // Reset global styles
    document.body.style.cursor = 'initial';
    document.body.style.userSelect = 'initial';

    // Reset column widths to original values
    if (currentColumnRef.current) {
      currentColumnRef.current.style.width = `${resizeState.originalWidths.current}px`;
    }
    if (nextColumnRef.current) {
      nextColumnRef.current.style.width = `${resizeState.originalWidths.next}px`;
    }

    // Clean up
    setResizeState(null);
    currentColumnRef.current = null;
    nextColumnRef.current = null;
  }, [resizeState]);

  const resetColumnWidths = useCallback(
    (currentAccessor: string, nextAccessor?: string) => {
      const updates = [{ accessor: currentAccessor, width: 'initial' }];
      if (nextAccessor) {
        updates.push({ accessor: nextAccessor, width: 'initial' });
      }
      onColumnResize(updates);
    },
    [onColumnResize]
  );

  return {
    isResizing: !!resizeState,
    startResize,
    updateResize,
    endResize,
    cancelResize,
    resetColumnWidths,
  };
};
