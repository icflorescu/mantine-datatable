import type { TableTrProps } from '@mantine/core';

export type DataTableDraggableRowProps = {
  /**
   * Optional class name.
   */
  className?: string;

  /**
   * Current dragging status.
   */
  isDragging?: boolean;
} & TableTrProps;
