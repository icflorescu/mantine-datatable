import { useMantineTheme } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import { Edit, Trash, TrashX } from 'tabler-icons-react';
import { Employee, getEmployeesAsync } from '~/data';

const PAGE_SIZE = 30;

export default function ComplexUsageExample() {
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    setPage(1);
    setSortStatus(status);
  };

  const { data, isFetching } = useQuery(
    ['employees', sortStatus.columnAccessor, sortStatus.direction, page],
    async () => getEmployeesAsync({ recordsPerPage: PAGE_SIZE, page, sortStatus })
  );

  const [selectedRecords, setSelectedRecords] = useState<Employee[]>([]);

  const {
    breakpoints: { xs: xsBreakpoint },
  } = useMantineTheme();
  const aboveXsMediaQuery = `(min-width: ${xsBreakpoint}px)`;

  const now = dayjs();

  return (
    <DataTable
      verticalAlignment="top"
      striped
      withVerticalBorders
      fetching={isFetching}
      columns={[
        {
          accessor: 'name',
          width: 150,
          ellipsis: true,
          sortable: true,
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
        },
        {
          accessor: 'email',
          sortable: true,
          visibleMediaQuery: aboveXsMediaQuery,
        },
        {
          accessor: 'department.company.name',
          title: 'Company',
          width: 150,
          sortable: true,
          visibleMediaQuery: aboveXsMediaQuery,
        },
        {
          accessor: 'department.name',
          title: 'Department',
          width: 130,
          sortable: true,
          visibleMediaQuery: aboveXsMediaQuery,
        },
        {
          accessor: 'age',
          width: 80,
          textAlignment: 'right',
          sortable: true,
          render: ({ birthDate }) => now.diff(birthDate, 'years'),
        },
      ]}
      records={data?.employees}
      page={page}
      onPageChange={setPage}
      totalRecords={data?.total}
      recordsPerPage={PAGE_SIZE}
      sortStatus={sortStatus}
      onSortStatusChange={handleSortStatusChange}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      onRowClick={({ firstName, lastName }) => showNotification({ message: `Should edit ${firstName} ${lastName}` })}
      rowContextMenu={{
        items: [
          {
            key: 'edit',
            icon: <Edit size={14} />,
            title: ({ firstName, lastName }) => `Edit ${firstName} ${lastName}`,
            onClick: ({ firstName, lastName }) =>
              showNotification({ color: 'orange', message: `Should edit ${firstName} ${lastName}` }),
          },
          {
            key: 'delete',
            title: ({ firstName, lastName }) => `Delete ${firstName} ${lastName}`,
            icon: <TrashX size={14} />,
            color: 'red',
            onClick: ({ firstName, lastName }) =>
              showNotification({ color: 'red', message: `Should delete ${firstName} ${lastName}` }),
          },
          {
            key: 'deleteMany',
            hidden: ({ id }) => selectedRecords.length <= 1 || !selectedRecords.map((r) => r.id).includes(id),
            title: () => `Delete ${selectedRecords.length} selected records`,
            icon: <Trash size={14} />,
            color: 'red',
            onClick: () =>
              showNotification({ color: 'red', message: `Should delete ${selectedRecords.length} records` }),
          },
        ],
      }}
    />
  );
}
