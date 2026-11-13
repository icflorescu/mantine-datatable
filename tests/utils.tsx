import { MantineProvider } from '@mantine/core';
import { render } from 'vitest-browser-react';
import { DataTable, type DataTableColumn, type DataTableProps } from '../package/index';

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: { city: string };
};

export const people: Person[] = [
  { id: 1, firstName: 'Ada', lastName: 'Lovelace', age: 36, address: { city: 'London' } },
  { id: 2, firstName: 'Alan', lastName: 'Turing', age: 41, address: { city: 'Wilmslow' } },
  { id: 3, firstName: 'Grace', lastName: 'Hopper', age: 85, address: { city: 'Arlington' } },
  { id: 4, firstName: 'Linus', lastName: 'Torvalds', age: 56, address: { city: 'Portland' } },
  { id: 5, firstName: 'Margaret', lastName: 'Hamilton', age: 89, address: { city: 'Boston' } },
];

export const columns: DataTableColumn<Person>[] = [
  { accessor: 'firstName' },
  { accessor: 'lastName' },
  { accessor: 'age', textAlign: 'right' },
  { accessor: 'address.city', title: 'City' },
];

export function renderDataTable(props: Partial<DataTableProps<Person>> = {}) {
  // DataTableProps is a union (columns vs. groups, with/without pagination, selection...),
  // so props are assembled loosely here and each test passes a valid combination
  const tableProps = { records: people, columns, ...props } as DataTableProps<Person>;
  return render(
    <MantineProvider>
      <DataTable {...tableProps} />
    </MantineProvider>
  );
}
