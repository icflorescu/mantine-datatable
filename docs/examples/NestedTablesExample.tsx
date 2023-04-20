import { ActionIcon, Group, Text, createStyles, px } from '@mantine/core';
import { IconChevronRight, IconUser } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useState } from 'react';
import { companies, departments, employees } from '~/data/nested';

const useStyles = createStyles((theme) => {
  return {
    expandIcon: {
      marginBottom: -1,
      transition: 'transform 0.2s ease',
    },
    expandIconRotated: {
      transform: 'rotate(90deg)',
    },
    employeeName: {
      marginLeft: px(theme.spacing.xl) * 2,
    },
  };
});

export default function NestedTablesExample() {
  const [expandedCompanyIds, setExpandedCompanyIds] = useState<string[]>([]);
  const [expandedDepartmentIds, setExpandedDepartmentIds] = useState<string[]>([]);

  const toggleCompanyExpansion = (id: string) => {
    if (expandedCompanyIds.includes(id)) {
      setExpandedCompanyIds(expandedCompanyIds.filter((companyId) => companyId !== id));
    } else {
      setExpandedCompanyIds([...expandedCompanyIds, id]);
    }
  };

  const toggleDepartmentExpansion = (id: string) => {
    if (expandedDepartmentIds.includes(id)) {
      setExpandedDepartmentIds(expandedDepartmentIds.filter((departmentId) => departmentId !== id));
    } else {
      setExpandedDepartmentIds([...expandedDepartmentIds, id]);
    }
  };

  const { cx, classes } = useStyles();

  return (
    <DataTable
      withBorder
      columns={[
        {
          accessor: 'name',
          title: 'Company › department › employee',
          render: ({ id, name }) => (
            <Group spacing="xs">
              <ActionIcon size="sm" variant="default" onClick={() => toggleCompanyExpansion(id)}>
                <IconChevronRight
                  size="0.9em"
                  className={cx(classes.expandIcon, {
                    [classes.expandIconRotated]: expandedCompanyIds.includes(id),
                  })}
                />
              </ActionIcon>
              <Text>{name}</Text>
            </Group>
          ),
        },
        { accessor: 'employees', title: 'Employees › birth date', textAlignment: 'right', width: 200 },
      ]}
      records={companies}
      rowExpansion={{
        allowMultiple: true,
        trigger: 'never',
        expanded: { recordIds: expandedCompanyIds },
        content: (company) => (
          <DataTable
            noHeader
            columns={[
              {
                accessor: 'name',
                render: ({ id, name }) => (
                  <Group ml="lg" spacing="xs" noWrap>
                    <ActionIcon size="sm" variant="default" onClick={() => toggleDepartmentExpansion(id)}>
                      <IconChevronRight
                        size="0.9em"
                        className={cx(classes.expandIcon, {
                          [classes.expandIconRotated]: expandedDepartmentIds.includes(id),
                        })}
                      />
                    </ActionIcon>
                    <Text>{name}</Text>
                  </Group>
                ),
              },
              { accessor: 'employees', textAlignment: 'right', width: 200 },
            ]}
            records={departments.filter((department) => department.company.id === company.record.id)}
            rowExpansion={{
              allowMultiple: true,
              trigger: 'never',
              expanded: { recordIds: expandedDepartmentIds },
              content: (department) => (
                <DataTable
                  striped
                  noHeader
                  withColumnBorders
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
