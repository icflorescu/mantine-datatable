'use client';

import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';

export function ColumnGroupingExample() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      records={companies}
      groups={[
        {
          id: 'company',
          columns: [
            { accessor: 'name' },
            { accessor: 'missionStatement', visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md})` },
          ],
        },
        {
          id: 'contact-info',
          title: <em>Contact info</em>,
          columns: [{ accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }],
        },
        {
          id: 'other',
          columns: [{ accessor: 'id', hidden: true }],
        },
        {
          id: 'empty-group',
          title: 'Empty group',
          columns: [],
        },
      ]}
    />
  );
}
