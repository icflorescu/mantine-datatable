'use client';

import { DataTable } from '__PACKAGE__';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export function RowStylingWithStyleFunctionExample() {
  // example-start
  return (
    <DataTable
      rowStyle={({ state }) =>
        (theme) => ({ color: state === 'MA' ? theme.colors.violet[6] : theme.colors.gray[6] })}
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
