'use client';

import { DataTable } from '__PACKAGE__';
import { useState } from 'react';
import { type Company, companies } from '~/data';
import classes from './CssVariablesExample.module.css';

const records = companies.slice(0, 5);

export function CssVariablesExample() {
  const [selectedRecords, setSelectedRecords] = useState<Company[]>([records[1], records[2]]);

  return (
    <DataTable
      className={classes.root}
      withTableBorder
      highlightOnHover
      // example-skip
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      // example-resume
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
    />
  );
}
