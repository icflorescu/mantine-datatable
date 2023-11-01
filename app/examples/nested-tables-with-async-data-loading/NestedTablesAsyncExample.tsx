'use client';

import { Box } from '@mantine/core';
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
