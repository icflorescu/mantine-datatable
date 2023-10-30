'use client';

import { DataTable } from '__PACKAGE__';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export function StylingWithStyleObjectsAndFunctionsExample() {
  // example-start
  return (
    <DataTable
      styles={{
        // 👇 this is a function that receives the current theme as argument
        root: (theme) => ({
          border: `1px solid ${theme.colors.orange[6]}`,
        }),
        table: {
          color: '#666',
        },
        header: {
          color: '#A30',
          fontSize: '125%',
        },
      }}
      // example-skip
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
