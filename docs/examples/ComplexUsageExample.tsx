import { Button, createStyles, Group, Stack, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconTrash, IconTrashX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import { Employee, getEmployeesAsync } from '~/data';

const useStyles = createStyles((theme) => ({
  modalHeader: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[8],
    fontWeight: 700,
  },
  modalContent: {
    maxWidth: 300,
  },
  modalLabel: { width: 80 },
}));

const PAGE_SIZE = 100;

export default function ComplexUsageExample() {
  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    setPage(1);
    setSortStatus(status);
  };

  const { data, isFetching } = useQuery(
    ['employees', sortStatus.columnAccessor, sortStatus.direction, page],
    async () => getEmployeesAsync({ recordsPerPage: PAGE_SIZE, page, sortStatus }),
    { refetchOnWindowFocus: false }
  );

  const [selectedRecords, setSelectedRecords] = useState<Employee[]>([]);

  const {
    classes,
    theme: {
      breakpoints: { xs: xsBreakpoint },
    },
  } = useStyles();
  const aboveXsMediaQuery = `(min-width: ${xsBreakpoint})`;
  const now = dayjs();

  return (
    <DataTable
      height={320}
      withBorder
      borderRadius="sm"
      withColumnBorders
      striped
      verticalAlignment="top"
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
      onRowClick={({ firstName, lastName, birthDate }) =>
        openModal({
          title: `${firstName} ${lastName}`,
          classNames: { header: classes.modalHeader, title: classes.modalTitle, content: classes.modalContent },
          children: (
            <Stack>
              <Group>
                <Text className={classes.modalLabel} size="sm">
                  First name
                </Text>
                <Text size="sm">{firstName}</Text>
              </Group>
              <Group>
                <Text className={classes.modalLabel} size="sm">
                  Last name
                </Text>
                <Text size="sm">{lastName}</Text>
              </Group>
              <Group>
                <Text className={classes.modalLabel} size="sm">
                  Birth date
                </Text>
                <Text size="sm">{dayjs(birthDate).format('MMMM DD, YYYY')}</Text>
              </Group>
              <Button onClick={() => closeAllModals()}>Close</Button>
            </Stack>
          ),
        })
      }
      rowContextMenu={{
        items: ({ id, firstName, lastName }) => [
          {
            key: 'edit',
            icon: <IconEdit size={14} />,
            title: `Edit ${firstName} ${lastName}`,
            onClick: () => showNotification({ color: 'orange', message: `Should edit ${firstName} ${lastName}` }),
          },
          {
            key: 'delete',
            title: `Delete ${firstName} ${lastName}`,
            icon: <IconTrashX size={14} />,
            color: 'red',
            onClick: () => showNotification({ color: 'red', message: `Should delete ${firstName} ${lastName}` }),
          },
          { key: 'divider-1', divider: true },
          {
            key: 'deleteMany',
            hidden: selectedRecords.length <= 1 || !selectedRecords.map((r) => r.id).includes(id),
            title: `Delete ${selectedRecords.length} selected records`,
            icon: <IconTrash size={14} />,
            color: 'red',
            onClick: () =>
              showNotification({ color: 'red', message: `Should delete ${selectedRecords.length} records` }),
          },
        ],
      }}
    />
  );
}
