'use client';

import { DataTable, reorderRecords } from '__PACKAGE__';
import { useState } from 'react';
import companies from '~/data/companies.json';

export function RowDraggingExample() {
  const [records, setRecords] = useState(companies);

  return (
    <DataTable
      columns={[
        {
          accessor: 'name',
          width: '150px',
        },
        { accessor: 'streetAddress', width: '150px' },
        { accessor: 'city', width: '150px' },
        { accessor: 'state', width: '150px' },
      ]}
      records={records}
      height={400}
      withTableBorder
      withColumnBorders
      draggableRows
      dragKey="row-drag-example"
      onDragEnd={(dragResult) => {
        const array = reorderRecords(dragResult, records);
        // you can also swap elements using swapRecords helper from mantine-datatable
        setRecords(array);
      }}
    />
  );
}
