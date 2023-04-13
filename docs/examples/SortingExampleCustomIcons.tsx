import { IconChevronUp, IconSelector } from '@tabler/icons-react';
import sortBy from 'lodash/sortBy';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { companies, type Company } from '~/data';

export default function SortingExampleCustomIcons() {
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });
  const [records, setRecords] = useState(sortBy(companies, 'name'));

  useEffect(() => {
    const data = sortBy(companies, sortStatus.columnAccessor) as Company[];
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
  }, [sortStatus]);

  return (
    <DataTable
      withBorder
      withColumnBorders
      records={records}
      columns={[
        { accessor: 'name', width: '40%', sortable: true },
        { accessor: 'streetAddress', width: '60%' },
        { accessor: 'city', width: 160, sortable: true },
        { accessor: 'state', sortable: true },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      sortIcons={{
        sorted: <IconChevronUp size={14} />,
        unsorted: <IconSelector size={14} />,
      }}
    />
  );
}
