import { DataTable } from 'mantine-datatable';
import companies from '~/data/companies.json';

export default function HandlingRowClicksExample() {
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
    />
  );
}
