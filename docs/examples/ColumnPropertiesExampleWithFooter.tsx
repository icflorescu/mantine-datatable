import { Group, Text } from '@mantine/core';
import { IconSum } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { DataTable, uniqBy } from 'mantine-datatable';
import { employees } from '~/data';

const records = employees.slice(0, 10);

export default function ColumnPropertiesExampleWithFooter() {
  return (
    // example-start
    <DataTable
      withBorder
      withColumnBorders
      striped
      records={records}
      columns={[
        {
          accessor: 'name',
          title: 'Full name',
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
          width: 160,
          footer: (
            <Group spacing="xs">
              <IconSum size="1.25em" />
              <Text mb={-2}>{records.length} employees</Text>
            </Group>
          ),
        },
        { accessor: 'department.name', width: 150 },
        {
          accessor: 'department.company.name',
          title: 'Company',
          width: 150,
          ellipsis: true,
          footer: (
            <Group spacing="xs">
              <IconSum size="1.25em" />
              <Text mb={-2}>{uniqBy(records, (record) => record.department.company.name).length} companies</Text>
            </Group>
          ),
        },
        {
          accessor: 'age',
          width: 60,
          textAlignment: 'right',
          visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.xs})`,
          render: ({ birthDate }) => dayjs().diff(birthDate, 'years'),
          footer: `Avg: ${Math.round(
            records.map((record) => dayjs().diff(record.birthDate, 'years')).reduce((a, b) => a + b, 0) / records.length
          )}`,
        },
      ]}
    />
    // example-end
  );
}
