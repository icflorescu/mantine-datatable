'use client';

import { Box } from '@mantine/core';
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
          noWrap: true,
          render: ({ id, name }) => (
            <>
              <IconChevronRight
                className={clsx(classes.icon, classes.expandIcon, {
                  [classes.expandIconRotated]: expandedCompanyIds.includes(id),
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
        expanded: { recordIds: expandedCompanyIds, onRecordIdsChange: setExpandedCompanyIds },
        content: (company) => (
          <DataTable
            noHeader
            withColumnBorders
            columns={[
              {
                accessor: 'name',
                noWrap: true,
                render: ({ id, name }) => (
                  <Box component="span" ml={20}>
                    <IconChevronRight
                      className={clsx(classes.icon, classes.expandIcon, {
                        [classes.expandIconRotated]: expandedDepartmentIds.includes(id),
                      })}
                    />
                    <IconUsers className={classes.icon} />
                    <span>{name}</span>
                  </Box>
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
