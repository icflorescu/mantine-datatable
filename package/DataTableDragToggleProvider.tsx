'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { DataTableDragToggleColumnsContextProvider } from './DataTableDragToggleColumns.context';
import { DataTableColumnToggle } from './hooks';

type DataTableDragToggleColumnsProviderProps = {
  // React children
  children: React.ReactNode;

  columnsOrder: string[];
  setColumnsOrder: Dispatch<SetStateAction<string[]>>;
  resetColumnsOrder: () => void;

  columnsToggle: DataTableColumnToggle[];
  setColumnsToggle: Dispatch<SetStateAction<DataTableColumnToggle[]>>;
  resetColumnsToggle: () => void;
};

export const DataTableDragToggleColumnsProvider = (props: DataTableDragToggleColumnsProviderProps) => {
  const {
    children,
    columnsOrder,
    setColumnsOrder,
    columnsToggle,
    setColumnsToggle,

    resetColumnsOrder,
    resetColumnsToggle,
  } = props;

  const [sourceColumn, setSourceColumn] = useState<string>('');

  const [targetColumn, setTargetColumn] = useState<string>('');

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
    <DataTableDragToggleColumnsContextProvider
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
      }}
    >
      {children}
    </DataTableDragToggleColumnsContextProvider>
  );
};
