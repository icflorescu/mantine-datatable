'use client';

import React, { useState } from 'react';
import { Table, rem } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons-react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { DataTable, DataTableColumn } from '__PACKAGE__';
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
    {
      accessor: 'drag',
      title: '',
      render: () => <IconGripVertical style={{ width: rem(18), height: rem(18) }} stroke={1.5} />,
      width: 30,
    },
    { accessor: 'name', width: 150 },
    { accessor: 'streetAddress', width: 150 },
    { accessor: 'city', width: 150 },
    { accessor: 'state', width: 150 },
  ];

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="datatable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <DataTable<RecordData>
              columns={columns}
              records={records}
              height={400}
              withTableBorder
              withColumnBorders
              rowFactory={({ record, index, rowProps, children }) => (
                <Draggable key={record.id} draggableId={record.id} index={index}>
                  {(provided) => (
                    <Table.Tr
                      ref={provided.innerRef}
                      {...rowProps}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {children}
                    </Table.Tr>
                  )}
                </Draggable>
              )}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
