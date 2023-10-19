import { Group, Text, createStyles, px } from '@mantine/core';
import { IconBuilding, IconChevronRight, IconUser, IconUsers } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useState } from 'react';
import { companies, useDepartmentsAsync, useEmployeesAsync } from '~/data/nested';

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
function EmployeesTable({ departmentId }: { departmentId: string }) {
  const { records, loading } = useEmployeesAsync({ departmentId });
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
      fetching={loading}
    />
  );
}
// example-end

// example-start DepartmentsTable
function DepartmentsTable({ companyId }: { companyId: string }) {
  const { records, loading } = useDepartmentsAsync({ companyId });
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
      fetching={loading}
      rowExpansion={{
        allowMultiple: true,
        expanded: { recordIds: expandedRecordIds, onRecordIdsChange: setExpandedRecordIds },
        content: ({ record }) => <EmployeesTable departmentId={record.id} />,
      }}
    />
  );
}
// example-end

// example-start Example
export default function NestedTablesExampleAsync() {
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  const { cx, classes } = useStyles();

  return (
    <DataTable
      withBorder
      withColumnBorders
      highlightOnHover
      columns={[
        {
          accessor: 'name',
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
        { accessor: 'employees', title: 'Employees › Birth date', textAlignment: 'right', width: 200 },
      ]}
      records={companies}
      rowExpansion={{
        allowMultiple: true,
        expanded: { recordIds: expandedRecordIds, onRecordIdsChange: setExpandedRecordIds },
        content: ({ record }) => <DepartmentsTable companyId={record.id} />,
      }}
    />
  );
}
// example-end
