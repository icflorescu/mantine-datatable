'use client';

import { DataTable } from '__PACKAGE__';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export function RowStylingWithColorPropertiesExample() {
  // example-start
  return (
    <DataTable
      rowColor={({ state }) => {
        if (state === 'MA') return 'violet';
      }}
      rowBackgroundColor={({ state }) => {
        if (state === 'MA') return { dark: '#232b25', light: '#f0f7f1' };
      }}
      // example-skip other table props
      withTableBorder
      columns={[
        { accessor: 'name' },
        { accessor: 'missionStatement', width: 150 },
        { accessor: 'streetAddress' },
        { accessor: 'city' },
        { accessor: 'state' },
      ]}
      records={records}
      // example-resume
    />
  );
  // example-end
}
