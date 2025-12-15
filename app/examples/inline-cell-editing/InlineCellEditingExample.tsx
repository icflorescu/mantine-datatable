'use client';

import { DataTable } from '__PACKAGE__';
import { useMemo, useState } from 'react';
import companies from '~/data/companies.json';

type Company = {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  employees: number;
  foundedDate: string;
};

export function InlineCellEditingExample() {
  const initialRecords = useMemo<Company[]>(
    () =>
      companies.slice(0, 5).map((company, index) => ({
        ...company,
        employees: 100 + index * 50,
        foundedDate: new Date(2015 + index, index % 12, 1).toISOString(),
      })),
    []
  );

  const [data, setData] = useState(initialRecords);

  const handleEdit = (record: Company, index: number) => {
    const newData = [...data];
    newData[index] = record;
    setData(newData);
  };

  return (
    <DataTable
      columns={[
        {
          accessor: 'name',
          editable: true,
          editType: 'text',
          onEdit: handleEdit,
        },
        {
          accessor: 'employees',
          editable: true,
          editType: 'number',
          onEdit: handleEdit,
        },
        {
          accessor: 'foundedDate',
          title: 'Founded',
          editable: true,
          editType: 'date',
          onEdit: handleEdit,
        },
        { accessor: 'city' },
        { accessor: 'state' },
      ]}
      records={data}
    />
  );
}
