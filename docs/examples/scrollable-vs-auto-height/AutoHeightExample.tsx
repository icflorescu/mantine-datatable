import { DataTable } from 'mantine-datatable';
import employees from '~/data/employees.json';

const records = employees.slice(0, 20);

export default function AutoHeightExample() {
  return (
    <DataTable
      striped
      withVerticalBorders
      records={records}
      columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
    />
  );
}
