import { Table, TableTrProps } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import React, { ElementRef, forwardRef, useEffect, useRef } from 'react';

type Props = {
  isDragging?: boolean;
} & TableTrProps;

const DraggableRow = forwardRef<HTMLTableRowElement, Props>(function ({ children, isDragging, ...props }, passedRef) {
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
    <Table.Tr data-is-dragging={isDragging} ref={mergedRef} {...props}>
      {children}
    </Table.Tr>
  );
});

export default DraggableRow;
