import type { TableTrProps } from '@mantine/core';

export type DataTableDraggableRowProps = {
  /**
   * Current dragging status.
   */
  isDragging?: boolean;
} & TableTrProps;
