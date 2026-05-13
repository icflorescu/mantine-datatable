import { useDirection } from '@mantine/core';
import type { RefObject } from 'react';
import { useCallback, useRef, useState } from 'react';
import { useDataTableColumnsContext } from './DataTableColumns.context';

type DataTableResizableHeaderHandleProps = {
  accessor: string;
  columnRef: RefObject<HTMLTableCellElement | null>;
};

const MIN_COLUMN_WIDTH = 50;

export const DataTableResizableHeaderHandle = (props: DataTableResizableHeaderHandleProps) => {
  const { accessor, columnRef } = props;
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

      // Find the next resizable data column (skip selection column)
      let nextColumn = currentColumn.nextElementSibling as HTMLTableCellElement | null;
      while (nextColumn) {
        const nextAccessor = nextColumn.getAttribute('data-accessor');
        if (nextAccessor && nextAccessor !== '__selection__') {
          break;
        }
        nextColumn = nextColumn.nextElementSibling as HTMLTableCellElement | null;
      }

      if (!nextColumn) {
        return;
      }

      const nextAccessor = nextColumn.getAttribute('data-accessor');
      if (!nextAccessor) {
        return;
      }

      // Capture pixel widths BEFORE switching the table to fixed layout —
      // these are the natural rendered widths the user is starting from.
      const startCurrentWidth = currentColumn.offsetWidth;
      const startNextWidth = nextColumn.offsetWidth;

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
    [accessor, columnRef, isRTL, setMultipleColumnWidths, beginResize, endResize]
  );

  const handleDoubleClick = useCallback(() => {
    if (!columnRef.current) return;

    const currentColumn = columnRef.current;
    const nextColumn = currentColumn.nextElementSibling as HTMLTableCellElement | null;

    const updates = [{ accessor, width: 'auto' }];

    if (nextColumn) {
      const nextAccessor = nextColumn.getAttribute('data-accessor');
      if (nextAccessor && nextAccessor !== '__selection__') {
        updates.push({ accessor: nextAccessor, width: 'auto' });
      }
    }

    setMultipleColumnWidths(updates);
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
