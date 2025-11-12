'use client';

import { DataTable } from '__PACKAGE__';
import { useState } from 'react';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export function InlineEditingExample() {
  const [data, setData] = useState(records);

  return (
    <DataTable
      columns={[
        {
          accessor: 'name',
          editable: true,

          onEdit: (record, index) => {
            const newData = [...data];
            newData[index] = record;
            setData(newData);
          },
        },
        { accessor: 'streetAddress' },
        { accessor: 'city' },
        { accessor: 'state' },
      ]}
      records={data}
    />
  );
}
