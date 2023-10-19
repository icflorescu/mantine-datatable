import { Group, Text, createStyles, px } from '@mantine/core';
import { IconBuilding, IconChevronRight, IconUser, IconUsers } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useState } from 'react';
import { companies, departments, employees } from '~/data/nested';

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

export default function NestedTablesExample() {
  const [expandedCompanyIds, setExpandedCompanyIds] = useState<string[]>([]);
  const [expandedDepartmentIds, setExpandedDepartmentIds] = useState<string[]>([]);

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
                  [classes.expandIconRotated]: expandedCompanyIds.includes(id),
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
        expanded: { recordIds: expandedCompanyIds, onRecordIdsChange: setExpandedCompanyIds },
        content: (company) => (
          <DataTable
            noHeader
            columns={[
              {
                accessor: 'name',
                render: ({ id, name }) => (
                  <Group ml="lg" spacing="xs" noWrap>
                    <IconChevronRight
                      size="0.9em"
                      className={cx(classes.expandIcon, {
                        [classes.expandIconRotated]: expandedDepartmentIds.includes(id),
                      })}
                    />
                    <IconUsers size="0.9em" />
                    <Text>{name}</Text>
                  </Group>
                ),
              },
              { accessor: 'employees', textAlignment: 'right', width: 200 },
            ]}
            records={departments.filter((department) => department.company.id === company.record.id)}
            rowExpansion={{
              allowMultiple: true,
              expanded: { recordIds: expandedDepartmentIds, onRecordIdsChange: setExpandedDepartmentIds },
              content: (department) => (
                <DataTable
                  noHeader
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
