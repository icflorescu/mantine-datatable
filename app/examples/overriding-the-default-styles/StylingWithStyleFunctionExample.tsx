'use client';

import { DataTable } from '__PACKAGE__';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export function StylingWithStyleFunctionExample() {
  // example-start
  return (
    <DataTable
      style={(theme) => ({
        border: `1px solid ${theme.colors.indigo[6]}`,
        borderRadius: theme.radius.md,
        color: theme.colors.violet[6],
      })}
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
