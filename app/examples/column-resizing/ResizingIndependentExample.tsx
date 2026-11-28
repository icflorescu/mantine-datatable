'use client';

import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';

export default function ResizingIndependentExample() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      // 👇 resizing a column doesn't affect the other columns
      independentColumnResizing
      records={companies}
      columns={[
        { accessor: 'name', resizable: true },
        { accessor: 'streetAddress', resizable: true, ellipsis: true },
        { accessor: 'city', resizable: true, ellipsis: true },
        { accessor: 'state', resizable: true },
        { accessor: 'missionStatement', resizable: true, ellipsis: true },
      ]}
    />
  );
}
