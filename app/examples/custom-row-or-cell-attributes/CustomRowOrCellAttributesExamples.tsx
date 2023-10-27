'use client';

import { showNotification } from '@mantine/notifications';
import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';

const records = companies.slice(0, 5);

export function CustomRowOrCellAttributesExample() {
  // example-start custom-row-or-cell-attributes
  return (
    <DataTable
      withTableBorder
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
      withTableBorder
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      customRowAttributes={({ name }) => ({
        onMouseDown: (e: MouseEvent) => {
          if (e.button === 1) {
            showNotification({ message: `Middle-click on row ${name}`, withBorder: true });
          }
        },
      })}
    />
  );
  // example-end
}
