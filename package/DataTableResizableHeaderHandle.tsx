import { useDirection } from '@mantine/core';
import type { JSX, RefObject } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useDataTableColumnsContext } from './DataTableColumns.context';

type DataTableResizableHeaderHandleProps = {
  accessor: string;
  columnRef: RefObject<HTMLTableCellElement | null>;
  independentColumnResizing: boolean | undefined;
};

const MIN_COLUMN_WIDTH = 50;

/**
 * Finds the header cell of the next data column (skipping the selection column), if any.
 */
function getNextDataColumn(column: HTMLTableCellElement) {
  let nextColumn = column.nextElementSibling as HTMLTableCellElement | null;
  while (nextColumn) {
    const nextAccessor = nextColumn.getAttribute('data-accessor');
    if (nextAccessor && nextAccessor !== '__selection__') {
      break;
    }
    nextColumn = nextColumn.nextElementSibling as HTMLTableCellElement | null;
  }
  return nextColumn;
}

export const DataTableResizableHeaderHandle = (props: DataTableResizableHeaderHandleProps): JSX.Element => {
  const { accessor, columnRef, independentColumnResizing } = props;
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef<number>(0);
  const originalWidthsRef = useRef<{ current: number; next: number }>({ current: 0, next: 0 });

  const { dir } = useDirection();
  const isRTL = dir === 'rtl';

  const { setMultipleColumnWidths, beginResize, endResize } = useDataTableColumnsContext();

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!columnRef.current) return;

      const currentColumn = columnRef.current;

      // Unless resizing is independent, the width is taken from (or given to) the next data column
      const nextColumn = independentColumnResizing ? null : getNextDataColumn(currentColumn);
      const nextAccessor = nextColumn?.getAttribute('data-accessor') ?? '';
      if (!independentColumnResizing && !nextAccessor) return;

      // Capture pixel widths BEFORE switching the table to fixed layout —
      // these are the natural rendered widths the user is starting from.
      const startCurrentWidth = currentColumn.offsetWidth;
      const startNextWidth = nextColumn?.offsetWidth ?? 0;

      // Snapshot every header cell into pixel widths and switch to fixed layout
      beginResize();

      setIsResizing(true);
      startXRef.current = event.clientX;
      originalWidthsRef.current = {
        current: startCurrentWidth,
        next: startNextWidth,
      };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        let deltaX = moveEvent.clientX - startXRef.current;
        if (isRTL) deltaX = -deltaX;

        const maxShrinkCurrent = originalWidthsRef.current.current - MIN_COLUMN_WIDTH;

        if (independentColumnResizing) {
          // Independent resizing: only the dragged column changes, so the table width (the sum of the
          // locked pixel widths) grows or shrinks with it, overflowing horizontally if needed
          const finalCurrentWidth = originalWidthsRef.current.current + Math.max(-maxShrinkCurrent, deltaX);
          setMultipleColumnWidths([{ accessor, width: `${finalCurrentWidth}px` }]);
          return;
        }

        const maxShrinkNext = originalWidthsRef.current.next - MIN_COLUMN_WIDTH;

        const constrainedDelta = Math.max(-maxShrinkCurrent, Math.min(deltaX, maxShrinkNext));

        const finalCurrentWidth = originalWidthsRef.current.current + constrainedDelta;
        const finalNextWidth = originalWidthsRef.current.next - constrainedDelta;

        // State-driven update: pushes the new widths through `effectiveColumns`
        // and keeps React in sync with the DOM. With table-layout: fixed the
        // browser honors the new pixel widths precisely.
        setMultipleColumnWidths([
          { accessor, width: `${finalCurrentWidth}px` },
          { accessor: nextAccessor, width: `${finalNextWidth}px` },
        ]);
      };

      const handleMouseUp = () => {
        setIsResizing(false);

        document.body.style.cursor = 'initial';
        document.body.style.userSelect = 'initial';

        endResize();

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [accessor, columnRef, independentColumnResizing, isRTL, setMultipleColumnWidths, beginResize, endResize]
  );

  const handleDoubleClick = useCallback(() => {
    if (!columnRef.current) return;

    const updates = [{ accessor, width: 'auto' }];

    // With independent resizing, the next column was never changed, so only this one is reset
    if (!independentColumnResizing) {
      const nextAccessor = getNextDataColumn(columnRef.current)?.getAttribute('data-accessor');
      if (nextAccessor) {
        updates.push({ accessor: nextAccessor, width: 'auto' });
      }
    }

    setMultipleColumnWidths(updates);
  }, [accessor, columnRef, independentColumnResizing, setMultipleColumnWidths]);

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
