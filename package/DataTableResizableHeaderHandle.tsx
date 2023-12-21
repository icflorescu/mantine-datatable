import { rem } from '@mantine/core';
import { useRef, useState, type MutableRefObject } from 'react';
import { useDataTableColumnsContext } from './DataTableColumns.context';

type DataTableResizableHeaderHandleProps = {
  accessor: string;
  columnRef: MutableRefObject<HTMLTableCellElement | null>;
};

export const DataTableResizableHeaderHandle = (props: DataTableResizableHeaderHandleProps) => {
  const { accessor, columnRef } = props;

  const dragRef = useRef<HTMLTableCellElement>(null);

  const [deltaX, setDeltaX] = useState<number>(0);

  const { setColumnWidth } = useDataTableColumnsContext();

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'col-resize';
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!columnRef.current) return;

    const delta = event.clientX - columnRef.current.getBoundingClientRect().right;

    const width = columnRef.current.getBoundingClientRect().width + delta;

    const widthString = `${width}px`;

    columnRef.current.style.width = widthString;

    // we have to set (store) the width in the context  and in the
    // local storage, otherwise the resizing won't work for small sizes
    setColumnWidth(accessor, columnRef.current.style.width as string);

    setDeltaX(-delta);
  };

  const handleMouseUp = () => {
    if (!columnRef.current) return;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    document.body.style.cursor = 'initial';

    setColumnWidth(accessor, columnRef.current.style.width as string);

    setDeltaX(0);
  };

  /**
   * Reset the column width to the default value
   */
  const handleDoubleClick = () => {
    if (!columnRef.current) return;

    columnRef.current.style.maxWidth = 'initial';
    columnRef.current.style.minWidth = 'initial';
    columnRef.current.style.width = 'initial';

    setColumnWidth(accessor, 'initial');
  };

  return (
    <div
      ref={dragRef}
      // we have to stop propagation so that the column doesn't
      // accidentally get sorted when the user is resizing it
      onClick={(event) => event.stopPropagation()}
      onMouseDown={handleDragStart}
      onDoubleClick={handleDoubleClick}
      className="mantine-datatable-header-resizable-handle"
      style={{ right: rem(deltaX) }}
    ></div>
  );
};
