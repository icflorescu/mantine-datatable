import { Group, Text, createStyles, px } from '@mantine/core';
import { IconBuilding, IconChevronRight, IconUser, IconUsers } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import { useCompaniesAsync, useDepartmentsAsync, useEmployeesAsync } from '~/data/nested';

// example-start useStyles
const useStyles = createStyles((theme) => ({
  expandIcon: {
    transition: 'transform 0.2s ease',
  },
  expandIconRotated: {
    transform: 'rotate(90deg)',
  },
  employeeName: {
    marginLeft: px(theme.spacing.xl) * 2,
  },
}));
// example-end

// example-start EmployeesTable
function EmployeesTable({ departmentId, sortStatus }: { departmentId: string; sortStatus: DataTableSortStatus }) {
  const { records, loading } = useEmployeesAsync({ departmentId, sortStatus });
  const { classes } = useStyles();

  return (
    <DataTable
      noHeader
      minHeight={100}
      columns={[
        {
          accessor: 'name',
          render: ({ firstName, lastName }) => (
            <Group spacing="xs" noWrap className={classes.employeeName}>
              <IconUser size="0.9em" />
              <Text>
                {firstName} {lastName}
              </Text>
            </Group>
          ),
        },
        {
          accessor: 'birthDate',
          render: ({ birthDate }) => dayjs(birthDate).format('DD MMM YYYY'),
          textAlignment: 'right',
          width: 200,
        },
      ]}
      records={records}
      fetching={loading && !records.length}
    />
  );
}
// example-end

// example-start DepartmentsTable
function DepartmentsTable({ companyId, sortStatus }: { companyId: string; sortStatus: DataTableSortStatus }) {
  const { records, loading } = useDepartmentsAsync({ companyId, sortStatus });
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);
  const { cx, classes } = useStyles();

  return (
    <DataTable
      noHeader
      minHeight={100}
      columns={[
        {
          accessor: 'name',
          render: ({ id, name }) => (
            <Group ml="lg" spacing="xs" noWrap>
              <IconChevronRight
                size="0.9em"
                className={cx(classes.expandIcon, {
                  [classes.expandIconRotated]: expandedRecordIds.includes(id),
                })}
              />
              <IconUsers size="0.9em" />
              <Text>{name}</Text>
            </Group>
          ),
        },
        { accessor: 'employees', textAlignment: 'right', width: 200 },
      ]}
      records={records}
      fetching={loading && !records.length}
      rowExpansion={{
        allowMultiple: true,
        expanded: { recordIds: expandedRecordIds, onRecordIdsChange: setExpandedRecordIds },
        content: ({ record }) => <EmployeesTable departmentId={record.id} sortStatus={sortStatus} />,
      }}
    />
  );
}
// example-end

// example-start Example
export default function NestedTablesExampleAsyncWithSorting() {
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });
  const { records, loading } = useCompaniesAsync({ sortStatus });

  const { cx, classes } = useStyles();

  return (
    <DataTable
      minHeight={160}
      withBorder
      withColumnBorders
      highlightOnHover
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      columns={[
        {
          accessor: 'name',
          sortable: true,
          title: 'Company › Department › Employee',
          render: ({ id, name }) => (
            <Group spacing="xs">
              <IconChevronRight
                size="0.9em"
                className={cx(classes.expandIcon, {
                  [classes.expandIconRotated]: expandedRecordIds.includes(id),
                })}
              />
              <IconBuilding size="0.9em" />
              <Text>{name}</Text>
            </Group>
          ),
        },
        {
          accessor: 'details',
          sortable: true,
          title: 'Employees › Birth date',
          render: ({ employees }) => employees,
          textAlignment: 'right',
          width: 200,
        },
      ]}
      records={records}
      fetching={loading}
      rowExpansion={{
        allowMultiple: true,
        expanded: { recordIds: expandedRecordIds, onRecordIdsChange: setExpandedRecordIds },
        content: ({ record }) => <DepartmentsTable companyId={record.id} sortStatus={sortStatus} />,
      }}
    />
  );
}
// example-end
