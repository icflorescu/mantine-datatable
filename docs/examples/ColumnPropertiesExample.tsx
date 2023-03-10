import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { employees } from '~/data';

const records = employees.slice(0, 10);

export default function ColumnPropertiesExample() {
  return (
    <DataTable
      withBorder
      withColumnBorders
      striped
      records={records}
      columns={[
        {
          accessor: 'index',
          title: '#',
          textAlignment: 'right',
          width: 40,
          render: (record) => records.indexOf(record) + 1,
        },
        {
          accessor: 'name',
          title: 'Full name',
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
          width: 160,
        },
        { accessor: 'email' },
        { accessor: 'department.name', width: 150 },
        {
          // using dot-notation to access nested object property
          accessor: 'department.company.name',
          title: 'Company',
          width: 150,
          // truncate with ellipsis if text overflows the available width
          ellipsis: true,
        },
        {
          accessor: 'birthDate',
          title: 'Birthday',
          width: 100,
          render: ({ birthDate }) => dayjs(birthDate).format('MMM D'),
          // column is only visible when screen width is over `theme.breakpoints.xs`
          visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.xs})`,
        },
        {
          // "virtual column"
          accessor: 'age',
          width: 60,
          textAlignment: 'right',
          // column is only visible when screen width is over `theme.breakpoints.xs`
          visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.xs})`,
          render: ({ birthDate }) => dayjs().diff(birthDate, 'years'),
        },
      ]}
    />
  );
}
