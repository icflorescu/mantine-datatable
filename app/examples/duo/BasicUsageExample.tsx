'use client';

import { DataTable, reorderRecords, swapRecords } from '__PACKAGE__';
import { useState } from 'react';
import companies from '~/data/companies.json';

export function BasicUsageExample() {
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
      draggableRows
      onReorder={(reorderResult) => {
        const array = swapRecords(reorderResult, records);
        // const array = reorderRecords(reorderResult, records);
        setRecords(array);
      }}
    />
  );
}
