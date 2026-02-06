'use client';

import { useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';
import { DataTableColumnsContextProvider } from './DataTableColumns.context';
import type { DataTableColumnPinning, DataTableColumnToggle, PinnedColumnInfo } from './hooks';

type DataTableColumnsProviderProps = PropsWithChildren<{
  columnsOrder: string[];
  setColumnsOrder: Dispatch<SetStateAction<string[]>>;
  resetColumnsOrder: () => void;

  columnsToggle: DataTableColumnToggle[];
  setColumnsToggle: Dispatch<SetStateAction<DataTableColumnToggle[]>>;
  resetColumnsToggle: () => void;

  columnsPinning: DataTableColumnPinning[];
  setColumnsPinning: Dispatch<SetStateAction<DataTableColumnPinning[]>>;
  resetColumnsPinning: () => void;

  setColumnWidth: (accessor: string, width: string | number) => void;
  setMultipleColumnWidths: (updates: Array<{ accessor: string; width: string | number }>) => void;
  resetColumnsWidth: () => void;

  pinnedMap: Map<string, PinnedColumnInfo>;
}>;

export const DataTableColumnsProvider = (props: DataTableColumnsProviderProps) => {
  const {
    children,
    columnsOrder,
    setColumnsOrder,
    columnsToggle,
    setColumnsToggle,
    columnsPinning,
    setColumnsPinning,

    resetColumnsOrder,
    resetColumnsToggle,
    resetColumnsPinning,

    setColumnWidth,
    setMultipleColumnWidths,
    resetColumnsWidth,

    pinnedMap,
  } = props;

  const [sourceColumn, setSourceColumn] = useState('');
  const [targetColumn, setTargetColumn] = useState('');

  const swapColumns = () => {
    if (!columnsOrder || !setColumnsOrder || !sourceColumn || !targetColumn) {
      return;
    }

    const sourceInfo = pinnedMap.get(sourceColumn);
    const targetInfo = pinnedMap.get(targetColumn);
    if (sourceInfo?.logicalSide !== targetInfo?.logicalSide) return;

    const sourceIndex = columnsOrder.indexOf(sourceColumn);
    const targetIndex = columnsOrder.indexOf(targetColumn);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const newOrder = [...columnsOrder];
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(targetIndex, 0, removed);
      setColumnsOrder(newOrder);
    }
  };

  return (
    <DataTableColumnsContextProvider
      value={{
        sourceColumn,
        setSourceColumn,
        targetColumn,
        setTargetColumn,
        columnsToggle,
        setColumnsToggle,
        columnsPinning,
        setColumnsPinning,
        swapColumns,
        resetColumnsOrder,
        resetColumnsToggle,
        resetColumnsPinning,

        setColumnWidth,
        setMultipleColumnWidths,
        resetColumnsWidth,
      }}
    >
      {children}
    </DataTableColumnsContextProvider>
  );
};
