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
          style: { fontStyle: 'italic' },
          columns: [
            { accessor: 'name' },
            { accessor: 'missionStatement', visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md})` },
          ],
        },
        {
          id: 'contact-info',
          title: 'Contact information',
          textAlign: 'center',
          style: (theme) => ({ color: theme.colors.blue[6] }),
          columns: [{ accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state', textAlign: 'right' }],
        },
        // 👇 all columns in this group are hidden, so it will not be rendered
        {
          id: 'other',
          columns: [{ accessor: 'id', hidden: true }],
        },
        // 👇 this group has no columns, so it will not be rendered
        {
          id: 'empty-group',
          title: 'Empty group',
          columns: [],
        },
      ]}
    />
  );
}
