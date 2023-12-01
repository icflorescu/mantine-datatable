import { createSafeContext } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { DataTableColumnToggle } from './hooks/useDragToggleColumns';

interface DataTableDragToggleColumnsContext {
  // accessor of the column which is currently dragged
  sourceColumn: string;
  setSourceColumn: Dispatch<SetStateAction<string>>;

  // accessor of the column which is currently hovered
  targetColumn: string;
  setTargetColumn: Dispatch<SetStateAction<string>>;

  // swap the source column with the target column
  swapColumns: () => void;

  // reset to the default columns order
  resetColumnsOrder: () => void;

  columnsToggle: DataTableColumnToggle[];
  setColumnsToggle: Dispatch<SetStateAction<DataTableColumnToggle[]>>;
  resetColumnsToggle: () => void;
}

export const [DataTableDragToggleColumnsContextProvider, useDataTableDragToggleColumnsContext] =
  createSafeContext<DataTableDragToggleColumnsContext>(
    'useDataTableDragToggleColumnsContext must be used within DataTableDragToggleColumnOrdersProvider'
  );
