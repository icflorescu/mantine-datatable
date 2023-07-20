import { DataTable } from 'mantine-datatable';
import { companies } from '~/data';

const records = companies.slice(0, 5);

export function CustomRowOrCellAttributesExample() {
  // example-start custom-row-or-cell-attributes
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

export function CustomRowOrCellAttributesMiddleClickExample() {
  // example-start middle-click
  return (
    <DataTable
      withBorder
      shadow="xs"
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      customRowAttributes={({ name }) => ({
        onMouseDown: (e: MouseEvent) => {
          if (e.button === 1) {
            alert(`Middle-click on row ${name}`);
          }
        },
      })}
    />
  );
  // example-end
}
