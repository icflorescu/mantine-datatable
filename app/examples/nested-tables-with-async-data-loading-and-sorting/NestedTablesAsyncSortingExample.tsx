'use client';

import { Box } from '@mantine/core';
import { IconBuilding, IconChevronRight, IconUser, IconUsers } from '@tabler/icons-react';
import { DataTable, DataTableSortStatus } from '__PACKAGE__';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  useCompaniesAsync,
  useDepartmentsAsync,
  useEmployeesAsync,
  type CompanyWithEmployeeCount,
} from '~/data/nestedAsync';
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
          noWrap: true,
          render: ({ firstName, lastName }) => (
            <Box component="span" ml={40}>
              <IconUser className={classes.icon} />
              <span>
                {firstName} {lastName}
              </span>
            </Box>
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
          noWrap: true,
          render: ({ id, name }) => (
            <Box component="span" ml={20}>
              <IconChevronRight
                className={clsx(classes.icon, classes.expandIcon, {
                  [classes.expandIconRotated]: expandedRecordIds.includes(id),
                })}
              />
              <IconUsers className={classes.icon} />
              <span>{name}</span>
            </Box>
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
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<CompanyWithEmployeeCount>>({
    columnAccessor: 'name',
    direction: 'asc',
  });
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
          noWrap: true,
          render: ({ id, name }) => (
            <>
              <IconChevronRight
                className={clsx(classes.icon, classes.expandIcon, {
                  [classes.expandIconRotated]: expandedRecordIds.includes(id),
                })}
              />
              <IconBuilding className={classes.icon} />
              <span>{name}</span>
            </>
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
        content: ({ record }) => (
          <DepartmentsTable companyId={record.id} sortStatus={sortStatus as DataTableSortStatus} />
        ),
      }}
    />
  );
}
