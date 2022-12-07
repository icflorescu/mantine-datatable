import { DataTable } from 'mantine-datatable';
import { companies } from '~/data';

const records = companies.slice(0, 5);

export default function CustomRowOrCellAttributesExample() {
  // example-start
  return (
    <DataTable
      withBorder
      shadow="xs"
      columns={[
        { accessor: 'name' },
        { accessor: 'city', customCellAttributes: ({ city }) => ({ 'data-cy-city': city }) },
        { accessor: 'state', customCellAttributes: ({ state }) => ({ 'data-cy-state': state }) },
      ]}
      records={records}
      customRowAttributes={({ id, name }, recordIndex) => ({
        'data-cy-id': id,
        'data-cy-name': name,
        'data-cy-index': recordIndex,
      })}
    />
  );
  // example-end
}
