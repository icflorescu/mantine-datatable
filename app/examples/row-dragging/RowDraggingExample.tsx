'use client';

import { DragDropContext, Draggable, DropResult, Droppable } from '@hello-pangea/dnd';
import { Table } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';
import { DataTable, DataTableColumn, DraggableRow } from '__PACKAGE__';
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
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRecords(items);
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
        styles={{
          table: {
            tableLayout: 'fixed',
          },
        }}
        rowFactory={({ record, index, rowProps, children }) => (
          <Draggable key={record.id} draggableId={record.id} index={index}>
            {(provided, snapshot) => (
              <DraggableRow isDragging={snapshot.isDragging} {...rowProps} {...provided.draggableProps}>
                {/** custom drag handle */}
                <Table.Td {...provided.dragHandleProps} ref={provided.innerRef}>
                  <IconGripVertical size={16} />
                </Table.Td>

                {children}
              </DraggableRow>
            )}
          </Draggable>
        )}
      />
    </DragDropContext>
  );
}
