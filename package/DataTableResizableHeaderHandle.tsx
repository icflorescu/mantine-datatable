import { useDirection } from '@mantine/core';
import type { RefObject } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useDataTableColumnsContext } from './DataTableColumns.context';

type DataTableResizableHeaderHandleProps = {
  accessor: string;
  columnRef: RefObject<HTMLTableCellElement | null>;
};

export const DataTableResizableHeaderHandle = (props: DataTableResizableHeaderHandleProps) => {
  const { accessor, columnRef } = props;
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef<number>(0);
  const originalWidthsRef = useRef<{ current: number; next: number }>({ current: 0, next: 0 });

  const { dir } = useDirection();
  const isRTL = dir === 'rtl';

  const { setMultipleColumnWidths } = useDataTableColumnsContext();

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!columnRef.current) return;

      const currentColumn = columnRef.current;

      // Find the next resizable data column (skip selection column)
      let nextColumn = currentColumn.nextElementSibling as HTMLTableCellElement | null;
      while (nextColumn) {
        const nextAccessor = nextColumn.getAttribute('data-accessor');
        if (nextAccessor && nextAccessor !== '__selection__') {
          break; // Found a valid data column
        }
        nextColumn = nextColumn.nextElementSibling as HTMLTableCellElement | null;
      }

      if (!nextColumn) {
        return; // No next column to resize with
      }

      const nextAccessor = nextColumn.getAttribute('data-accessor');
      if (!nextAccessor) {
        return; // Next column missing data-accessor
      }

      // Special handling for next column being selection column
      const isNextSelection = nextAccessor === '__selection__';

      // Store initial state
      setIsResizing(true);
      startXRef.current = event.clientX;

      // Get current computed widths (not getBoundingClientRect which might include borders/padding)
      const currentWidth = currentColumn.offsetWidth;
      const nextWidth = nextColumn.offsetWidth;

      originalWidthsRef.current = {
        current: currentWidth,
        next: nextWidth,
      };

      // Global mouse event handlers
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!columnRef.current) return;

        const currentCol = columnRef.current;
        const nextCol = currentCol.nextElementSibling as HTMLTableCellElement | null;
        if (!nextCol) return;

        let deltaX = moveEvent.clientX - startXRef.current;

        // In RTL, reverse the deltaX to make resizing follow mouse movement naturally
        if (isRTL) {
          deltaX = -deltaX;
        }

        const minWidth = 50;

        // Calculate the maximum possible movement in both directions
        const maxShrinkCurrent = originalWidthsRef.current.current - minWidth;
        const maxShrinkNext = originalWidthsRef.current.next - minWidth;

        // Limit deltaX to respect both columns' minimum widths
        const constrainedDelta = Math.max(
          -maxShrinkCurrent, // Don't shrink current below minimum
          Math.min(deltaX, maxShrinkNext) // Don't shrink next below minimum
        );

        const finalCurrentWidth = originalWidthsRef.current.current + constrainedDelta;
        const finalNextWidth = originalWidthsRef.current.next - constrainedDelta;

        // Apply to DOM immediately for smooth visual feedback
        currentCol.style.width = `${finalCurrentWidth}px`;
        nextCol.style.width = `${finalNextWidth}px`;

        // Ensure the table maintains fixed layout during resize
        currentCol.style.minWidth = `${finalCurrentWidth}px`;
        currentCol.style.maxWidth = `${finalCurrentWidth}px`;
        nextCol.style.minWidth = `${finalNextWidth}px`;
        nextCol.style.maxWidth = `${finalNextWidth}px`;
      };

      const handleMouseUp = () => {
        if (!columnRef.current) return;

        const currentCol = columnRef.current;
        const nextCol = currentCol.nextElementSibling as HTMLTableCellElement | null;

        setIsResizing(false);

        // Reset global styles
        document.body.style.cursor = 'initial';
        document.body.style.userSelect = 'initial';

        // Get final widths from the applied styles
        const finalCurrentWidth = parseInt(currentCol.style.width) || currentCol.offsetWidth;
        const finalNextWidth = nextCol ? parseInt(nextCol.style.width) || nextCol.offsetWidth : 0;

        // Update context with final widths
        const updates = [{ accessor, width: `${finalCurrentWidth}px` }];

        if (nextCol && !isNextSelection) {
          const nextAccessor = nextCol.getAttribute('data-accessor');
          if (nextAccessor) {
            updates.push({
              accessor: nextAccessor,
              width: `${finalNextWidth}px`,
            });
          }
        }

        // Update the context AFTER we've applied the styles
        setTimeout(() => {
          setMultipleColumnWidths(updates);
        }, 0);

        // Remove event listeners
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      // Set global styles
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      // Add event listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [accessor, columnRef, isRTL, setMultipleColumnWidths]
  );

  const handleDoubleClick = useCallback(() => {
    if (!columnRef.current) return;

    const currentColumn = columnRef.current;
    const nextColumn = currentColumn.nextElementSibling as HTMLTableCellElement | null;

    // Clear any inline styles that might interfere with natural sizing
    currentColumn.style.width = '';
    currentColumn.style.minWidth = '';
    currentColumn.style.maxWidth = '';

    // Reset current column to auto width
    const updates = [{ accessor, width: 'auto' }];

    if (nextColumn) {
      nextColumn.style.width = '';
      nextColumn.style.minWidth = '';
      nextColumn.style.maxWidth = '';

      const nextAccessor = nextColumn.getAttribute('data-accessor');
      // Only reset next column if it's not the selection column
      if (nextAccessor && nextAccessor !== '__selection__') {
        updates.push({ accessor: nextAccessor, width: 'auto' });
      }
    }

    // Use setTimeout to ensure DOM changes are applied before context update
    setTimeout(() => {
      setMultipleColumnWidths(updates);
    }, 0);
  }, [accessor, columnRef, setMultipleColumnWidths]);

  return (
    <div
      className="mantine-datatable-header-resizable-handle"
      style={{
        cursor: isResizing ? 'col-resize' : undefined,
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onClick={(event) => event.stopPropagation()} // Prevent column sorting
      title="Drag to resize column, double-click to reset"
    />
  );
};
