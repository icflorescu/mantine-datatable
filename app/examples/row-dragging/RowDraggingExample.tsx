'use client';

import { DragDropContext, Draggable, type DropResult, Droppable } from '@hello-pangea/dnd';
import { TableTd } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconGripVertical } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DataTableDraggableRow } from '__PACKAGE__';
import { useState } from 'react';
import companies from '~/data/companies.json';

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
              <DataTableDraggableRow isDragging={snapshot.isDragging} {...rowProps} {...provided.draggableProps}>
                {/** custom drag handle */}
                <TableTd {...provided.dragHandleProps} ref={provided.innerRef}>
                  <IconGripVertical size={16} />
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
