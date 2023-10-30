'use client';

import { DataTable } from '__PACKAGE__';
import companies from '~/data/companies.json';
import classes from './RowStylingWithClassNameExample.module.css';

const records = companies.slice(0, 5);

export function RowStylingWithClassNameExample() {
  // example-start
  return (
    <DataTable
      rowClassName={({ state }) => (state === 'WY' ? classes.redRow : undefined)}
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
