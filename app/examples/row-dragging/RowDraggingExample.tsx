'use client';

import { DataTable, swapRecords } from '__PACKAGE__';
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
      draggableRows
      onDragEnd={(dragResult) => {
        const array = swapRecords(dragResult, records);
        // const array = reorderRecords(reorderResult, records);
        setRecords(array);
      }}
      dragKey="row-drag-example"
    />
  );
}
