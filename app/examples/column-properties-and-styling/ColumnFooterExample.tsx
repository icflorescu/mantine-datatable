'use client';

import { Box, Group } from '@mantine/core';
import { IconSum } from '@tabler/icons-react';
import { DataTable, uniqBy } from '__PACKAGE__';
import dayjs from 'dayjs';
import { employees } from '~/data';

const records = employees.slice(0, 10);

export function ColumnFooterExample() {
  return (
    // example-start
    <DataTable
      withTableBorder
      withColumnBorders
      striped
      records={records}
      columns={[
        {
          accessor: 'name',
          title: 'Full name',
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
          width: 160,
          // 👇 this column has a footer
          footer: (
            <Group gap="xs">
              <Box mb={-4}>
                <IconSum size="1.25em" />
              </Box>
              <div>{records.length} employees</div>
            </Group>
          ),
        },
        // 👇 this column has NO footer
        { accessor: 'department.name', width: 150 },
        {
          accessor: 'department.company.name',
          title: 'Company',
          width: 150,
          ellipsis: true,
          // 👇 this column has a footer
          footer: (
            <Group gap="xs">
              <Box mb={-4}>
                <IconSum size={16} />
              </Box>
              <div>{uniqBy(records, (record) => record.department.company.name).length} companies</div>
            </Group>
          ),
        },
        {
          accessor: 'age',
          width: 60,
          textAlign: 'right',
          visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.xs})`,
          render: ({ birthDate }) => dayjs().diff(birthDate, 'years'),
          // 👇 this column has a footer
          footer: `Avg: ${Math.round(
            records.map((record) => dayjs().diff(record.birthDate, 'years')).reduce((a, b) => a + b, 0) / records.length
          )}`,
        },
      ]}
    />
    // example-end
  );
}
