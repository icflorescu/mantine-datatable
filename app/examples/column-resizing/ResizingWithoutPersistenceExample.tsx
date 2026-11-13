'use client';

import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';

export default function ResizingWithoutPersistenceExample() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      records={companies}
      // 👇 no `storeColumnsKey` and no `useDataTableColumns()` hook needed
      columns={[
        { accessor: 'name', resizable: true },
        { accessor: 'streetAddress', resizable: true, ellipsis: true },
        { accessor: 'city', resizable: true, ellipsis: true },
        { accessor: 'state', resizable: true },
        { accessor: 'missionStatement', ellipsis: true },
      ]}
    />
  );
}
