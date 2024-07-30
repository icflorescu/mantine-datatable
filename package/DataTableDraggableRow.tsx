import { TableTr } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { type ElementRef, forwardRef, useEffect, useRef } from 'react';
import type { DataTableDraggableRowProps } from './types';

const DataTableDraggableRow = forwardRef<HTMLTableRowElement, DataTableDraggableRowProps>(function (
  { children, isDragging, ...props },
  passedRef
) {
  const ref = useRef<ElementRef<'tr'>>(null);
  const mergedRef = useMergedRef(ref, passedRef);

  useEffect(() => {
    // a simple fix to keep column width as in table
    if (!ref.current) return;
    if (!isDragging) return;

    const tbody = ref.current.parentElement!;
    const table = tbody.parentElement!;
    const thead = table.children[0];
    const headerRow = thead.children[0];

    for (let index = 0; index < headerRow.children.length; index++) {
      const headerCell = headerRow.children[index];
      const headerCellDimensions = headerCell.getBoundingClientRect();

      const cell = ref.current.children[index] as HTMLTableCellElement;

      cell.style.height = headerCellDimensions.height + 'px';
      cell.style.width = headerCellDimensions.width + 'px';
      cell.style.minWidth = headerCellDimensions.width + 'px';
      cell.style.maxWidth = headerCellDimensions.width + 'px';
    }
  }, [isDragging, children]);

  return (
    <TableTr data-is-dragging={isDragging} ref={mergedRef} {...props}>
      {children}
    </TableTr>
  );
});

DataTableDraggableRow.displayName = 'DataTableDraggableRow';

export { DataTableDraggableRow };
