'use client';

import { Group } from '@mantine/core';
import { IconBuilding, IconChevronRight, IconUser, IconUsers } from '@tabler/icons-react';
import { DataTable, DataTableSortStatus } from '__PACKAGE__';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useCompaniesAsync, useDepartmentsAsync, useEmployeesAsync } from '~/data/nestedAsync';
import classes from './NestedTablesAsyncSortingExample.module.css';

function EmployeesTable({ departmentId, sortStatus }: { departmentId: string; sortStatus: DataTableSortStatus }) {
  const { records, loading } = useEmployeesAsync({ departmentId, sortStatus });

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
      fetching={loading && !records.length}
    />
  );
}

function DepartmentsTable({ companyId, sortStatus }: { companyId: string; sortStatus: DataTableSortStatus }) {
  const { records, loading } = useDepartmentsAsync({ companyId, sortStatus });
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
      fetching={loading && !records.length}
      rowExpansion={{
        allowMultiple: true,
        expanded: { recordIds: expandedRecordIds, onRecordIdsChange: setExpandedRecordIds },
        content: ({ record }) => <EmployeesTable departmentId={record.id} sortStatus={sortStatus} />,
      }}
    />
  );
}
export function NestedTablesAsyncSortingExample() {
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });
  const { records, loading } = useCompaniesAsync({ sortStatus });

  return (
    <DataTable
      minHeight={160}
      withTableBorder
      highlightOnHover
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
      withColumnBorders
      columns={[
        {
          accessor: 'name',
          sortable: true,
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
        {
          accessor: 'details',
          sortable: true,
          title: 'Employees / Birth date',
          render: ({ employees }) => employees,
          textAlign: 'right',
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
