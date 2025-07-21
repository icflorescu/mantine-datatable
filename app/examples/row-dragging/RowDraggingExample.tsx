'use client';

import { DragDropContext, Draggable, type DropResult, Droppable } from '@hello-pangea/dnd';
import { Center, TableTd } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconGripVertical } from '@tabler/icons-react';
import type { DataTableColumn } from '__PACKAGE__';
import { DataTable, DataTableDraggableRow } from '__PACKAGE__';
import clsx from 'clsx';
import { useState } from 'react';
import companies from '~/data/companies.json';
import classes from './RowDraggingExample.module.css';

interface RecordData {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  missionStatement: string;
}

export function RowDraggingExample() {
  const [records, setRecords] = useState<RecordData[]>(companies);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(records);
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);

    setRecords(items);
    notifications.show({
      title: 'Table reordered',
      message: `The company named "${items[sourceIndex].name}" has been moved from position ${sourceIndex + 1} to ${destinationIndex + 1}.`,
      color: 'blue',
    });
  };

  const columns: DataTableColumn<RecordData>[] = [
    // add empty header column for the drag handle
    { accessor: '', hiddenContent: true, width: 30 },
    { accessor: 'name', width: 150 },
    { accessor: 'streetAddress', width: 150 },
    { accessor: 'city', width: 150 },
    { accessor: 'state', width: 150 },
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <DataTable<RecordData>
        columns={columns}
        records={records}
        height={400}
        withTableBorder
        withColumnBorders
        tableWrapper={({ children }) => (
          <Droppable droppableId="datatable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {children}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
        styles={{ table: { tableLayout: 'fixed' } }}
        rowFactory={({ record, index, rowProps, children }) => (
          <Draggable key={record.id} draggableId={record.id} index={index}>
            {(provided, snapshot) => (
              <DataTableDraggableRow
                isDragging={snapshot.isDragging}
                {...rowProps}
                // 👇 custom class name for styling
                className={clsx(rowProps.className, classes.draggableRow)}
                {...provided.draggableProps}
              >
                <TableTd>
                  {/** 👇 custom drag handle */}
                  <Center {...provided.dragHandleProps} ref={provided.innerRef}>
                    <IconGripVertical size={16} />
                  </Center>
                </TableTd>
                {children}
              </DataTableDraggableRow>
            )}
          </Draggable>
        )}
      />
    </DragDropContext>
  );
}
