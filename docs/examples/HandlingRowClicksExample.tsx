import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { companies } from '~/data';

export default function HandlingRowClicksExample() {
  return (
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      onRowClick={({ name }) => showNotification({ message: `You clicked on row showing company ${name}` })}
    />
  );
}
