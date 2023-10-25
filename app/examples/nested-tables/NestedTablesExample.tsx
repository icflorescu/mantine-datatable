'use client';

import { Group } from '@mantine/core';
import { IconBuilding, IconChevronRight, IconUser, IconUsers } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';
import { employees } from '~/data';
import { companies, departments } from '~/data/nested';
import classes from './NestedTablesExample.module.css';

export function NestedTablesExample() {
  const [expandedCompanyIds, setExpandedCompanyIds] = useState<string[]>([]);
  const [expandedDepartmentIds, setExpandedDepartmentIds] = useState<string[]>([]);

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
                  [classes.expandIconRotated]: expandedCompanyIds.includes(id),
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
        expanded: { recordIds: expandedCompanyIds, onRecordIdsChange: setExpandedCompanyIds },
        content: (company) => (
          <DataTable
            noHeader
            withColumnBorders
            columns={[
              {
                accessor: 'name',
                render: ({ id, name }) => (
                  <Group ml="lg" gap="xs" wrap="nowrap">
                    <IconChevronRight
                      className={clsx(classes.icon, classes.expandIcon, {
                        [classes.expandIconRotated]: expandedDepartmentIds.includes(id),
                      })}
                    />
                    <IconUsers size="0.9em" />
                    <div>{name}</div>
                  </Group>
                ),
              },
              { accessor: 'employees', textAlign: 'right', width: 200 },
            ]}
            records={departments.filter((department) => department.company.id === company.record.id)}
            rowExpansion={{
              allowMultiple: true,
              expanded: { recordIds: expandedDepartmentIds, onRecordIdsChange: setExpandedDepartmentIds },
              content: (department) => (
                <DataTable
                  noHeader
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
                  records={employees.filter((employee) => employee.department.id === department.record.id)}
                />
              ),
            }}
          />
        ),
      }}
    />
  );
}
