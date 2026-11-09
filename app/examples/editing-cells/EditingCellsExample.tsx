'use client';

import { DataTable } from '__PACKAGE__';
import { useState } from 'react';
import { type Company, companies } from '~/data';

const initialRecords = companies.slice(0, 5);

export function EditingCellsExample() {
  const [records, setRecords] = useState<Company[]>(initialRecords);

  return (
    // example-start
    <DataTable
      withTableBorder
      withColumnBorders
      columns={[
        { accessor: 'name', editable: true },
        { accessor: 'streetAddress' },
        { accessor: 'city', editable: true },
        { accessor: 'state', editable: true },
      ]}
      records={records}
      onCellEdit={({ record, accessor, value }) => {
        setRecords((current) =>
          current.map((r) => (r.id === record.id ? { ...r, [accessor as keyof Company]: value } : r))
        );
      }}
    />
    // example-end
  );
}
