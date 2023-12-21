'use client';

import { useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';
import { DataTableColumnsContextProvider } from './DataTableColumns.context';
import { DataTableColumnToggle } from './hooks';

type DataTableColumnsProviderProps = PropsWithChildren<{
  columnsOrder: string[];
  setColumnsOrder: Dispatch<SetStateAction<string[]>>;
  resetColumnsOrder: () => void;

  columnsToggle: DataTableColumnToggle[];
  setColumnsToggle: Dispatch<SetStateAction<DataTableColumnToggle[]>>;
  resetColumnsToggle: () => void;

  setColumnWidth: (accessor: string, width: string | number) => void;
  resetColumnsWidth: () => void;
}>;

export const DataTableColumnsProvider = (props: DataTableColumnsProviderProps) => {
  const {
    children,
    columnsOrder,
    setColumnsOrder,
    columnsToggle,
    setColumnsToggle,

    resetColumnsOrder,
    resetColumnsToggle,

    setColumnWidth,
    resetColumnsWidth,
  } = props;

  const [sourceColumn, setSourceColumn] = useState('');
  const [targetColumn, setTargetColumn] = useState('');

  const swapColumns = () => {
    if (!columnsOrder || !setColumnsOrder || !sourceColumn || !targetColumn) {
      return;
    }
    const sourceIndex = columnsOrder.indexOf(sourceColumn);
    const targetIndex = columnsOrder.indexOf(targetColumn);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const removedColumn = columnsOrder.splice(sourceIndex, 1)[0];

      columnsOrder.splice(targetIndex, 0, removedColumn);

      // update the columns order
      setColumnsOrder([...columnsOrder]);
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
        swapColumns,
        resetColumnsOrder,
        resetColumnsToggle,

        setColumnWidth,
        resetColumnsWidth,
      }}
    >
      {children}
    </DataTableColumnsContextProvider>
  );
};
