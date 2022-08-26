import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { employees } from '~/data';

const records = employees.slice(0, 10);

export default function ColumnPropertiesExample() {
  return (
    <DataTable
      striped
      withVerticalBorders
      records={records}
      columns={[
        {
          accessor: 'index',
          title: '#',
          textAlign: 'right',
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
        { accessor: 'department.company.name', title: 'Company', width: 150, ellipsis: true },
        {
          accessor: 'birthDate',
          title: 'Birthday',
          width: 100,
          render: ({ birthDate }) => dayjs(birthDate).format('MMM D'),
        },
        {
          accessor: 'age',
          width: 60,
          textAlign: 'right',
          render: ({ birthDate }) => dayjs().diff(birthDate, 'years'),
        },
      ]}
    />
  );
}
