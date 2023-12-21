import { createSafeContext } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { DataTableColumnToggle } from './hooks';

interface DataTableColumnsContext {
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

  setColumnWidth: (accessor: string, width: string | number) => void;
  resetColumnsWidth: () => void;
}

export const [DataTableColumnsContextProvider, useDataTableColumnsContext] = createSafeContext<DataTableColumnsContext>(
  'useDataTableColumnsContext must be used within DataTableColumnProvider'
);
