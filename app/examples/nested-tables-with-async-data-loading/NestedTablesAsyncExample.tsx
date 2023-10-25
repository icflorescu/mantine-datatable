'use client';

import { Group } from '@mantine/core';
import { IconBuilding, IconChevronRight, IconUser, IconUsers } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import { companies } from '~/data/nested';
import { useDepartmentsAsync, useEmployeesAsync } from '~/data/nestedAsync';
import classes from './NestedTablesAsyncExample.module.css';

function EmployeesTable({ departmentId }: { departmentId: string }) {
  const { records, loading } = useEmployeesAsync({ departmentId });

  return (
    <DataTable
      noHeader
      minHeight={100}
      withColumnBorders
      columns={[
        {
          accessor: 'name',
          render: ({ firstName, lastName }) => (
            <Group gap="xs" wrap="nowrap" className={classes.employeeName}>
              <IconUser className={classes.icon} />
              <div>
                {firstName} {lastName}
              </div>
            </Group>
          ),
        },
        {
          accessor: 'birthDate',
          render: ({ birthDate }) => dayjs(birthDate).format('DD MMM YYYY'),
          textAlign: 'right',
          width: 200,
        },
      ]}
      records={records}
      fetching={loading}
    />
  );
}

function DepartmentsTable({ companyId }: { companyId: string }) {
  const { records, loading } = useDepartmentsAsync({ companyId });
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  return (
    <DataTable
      noHeader
      minHeight={100}
      withColumnBorders
      columns={[
        {
          accessor: 'name',
          render: ({ id, name }) => (
            <Group ml="lg" gap="xs" wrap="nowrap">
              <IconChevronRight
                className={clsx(classes.icon, classes.expandIcon, {
                  [classes.expandIconRotated]: expandedRecordIds.includes(id),
                })}
              />
              <IconUsers className={classes.icon} />
              <div>{name}</div>
            </Group>
          ),
        },
        { accessor: 'employees', textAlign: 'right', width: 200 },
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

export function NestedTablesAsyncExample() {
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      highlightOnHover
      columns={[
        {
          accessor: 'name',
          title: 'Company / Department / Employee',
          render: ({ id, name }) => (
            <Group gap="xs">
              <IconChevronRight
                className={clsx(classes.icon, classes.expandIcon, {
                  [classes.expandIconRotated]: expandedRecordIds.includes(id),
                })}
              />
              <IconBuilding className={classes.icon} />
              <div>{name}</div>
            </Group>
          ),
        },
        { accessor: 'employees', title: 'Employees / Birth date', textAlign: 'right', width: 200 },
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
