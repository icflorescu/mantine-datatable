'use client';

import { DataTable } from '__PACKAGE__';
import { Select } from '@mantine/core';
import { useState } from 'react';
import { type Company, companies } from '~/data';

const initialRecords = companies.slice(0, 5);

const US_STATES = [
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'MD',
  'ME',
  'MI',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NV',
  'NY',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY',
];

export function EditingCellsCustomRenderExample() {
  const [records, setRecords] = useState<Company[]>(initialRecords);

  return (
    // example-start
    <DataTable
      withTableBorder
      withColumnBorders
      columns={[
        { accessor: 'name', editable: true },
        { accessor: 'city', editable: true },
        {
          accessor: 'state',
          editable: true,
          editRender: (_record, _index, { value, onCommit, onCancel }) => (
            <Select
              autoFocus
              variant="unstyled"
              data={US_STATES}
              value={value}
              onChange={(val) => {
                if (val) onCommit(val);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') onCancel();
              }}
              styles={{ input: { padding: 0, minHeight: 'unset', height: 'auto' } }}
            />
          ),
        },
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
