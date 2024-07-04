'use client';

import React, { useState, type Dispatch, type PropsWithChildren, type SetStateAction } from 'react';
import { DataTableColumnsContextProvider } from './DataTableColumns.context';
import { DataTableColumnToggle } from './hooks';
import { DragDropContext, Droppable, OnDragEndResponder } from '@hello-pangea/dnd';

type DataTableColumnsProviderProps = PropsWithChildren<{
  columnsOrder: string[];
  setColumnsOrder: Dispatch<SetStateAction<string[]>>;
  resetColumnsOrder: () => void;

  columnsToggle: DataTableColumnToggle[];
  setColumnsToggle: Dispatch<SetStateAction<DataTableColumnToggle[]>>;
  resetColumnsToggle: () => void;

  setColumnWidth: (accessor: string, width: string | number) => void;
  resetColumnsWidth: () => void;

  draggableRows?: boolean;
  onDragEnd?: OnDragEndResponder;
}>;

function DraggableWrapper(
  props: React.PropsWithChildren<Pick<DataTableColumnsProviderProps, 'draggableRows' | 'onDragEnd'>>
) {
  if (!props.draggableRows) {
    return props.children;
  }

  return (
    <DragDropContext
      onDragEnd={(result, provided) => {
        props.onDragEnd?.(result, provided);
      }}
    >
      <Droppable droppableId="dnd-table" direction="vertical">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {props.children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

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
    <DraggableWrapper onDragEnd={props.onDragEnd} draggableRows={props.draggableRows}>
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
    </DraggableWrapper>
  );
};
