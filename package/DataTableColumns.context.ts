import { createSafeContext } from '@mantine/core';
import type { Context, Dispatch, SetStateAction } from 'react';
import type { DataTableColumnPinning, DataTableColumnToggle } from './hooks';

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
  setColumnsToggle: (toggle: DataTableColumnToggle[]) => void;
  resetColumnsToggle: () => void;

  columnsPinning: DataTableColumnPinning[];
  setColumnsPinning: Dispatch<SetStateAction<DataTableColumnPinning[]>>;
  resetColumnsPinning: () => void;

  setColumnWidth: (accessor: string, width: string | number) => void;
  setMultipleColumnWidths: (updates: Array<{ accessor: string; width: string | number }>) => void;
  resetColumnsWidth: () => void;

  // Drag lifecycle: snapshot DOM widths, lock the table, then persist on release
  beginResize: () => void;
  endResize: () => void;
}

const [ColumnsContext, useColumnsContext] = createSafeContext<DataTableColumnsContext>(
  'useDataTableColumnsContext must be used within DataTableColumnProvider'
);

export const DataTableColumnsContextProvider: Context<DataTableColumnsContext | null> = ColumnsContext;
export const useDataTableColumnsContext: () => DataTableColumnsContext = useColumnsContext;
