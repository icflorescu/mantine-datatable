'use client';

import { DataTable, type DataTableColumn } from '__PACKAGE__';
import { employees, type Employee } from '~/data';

const records = employees.slice(0, 15);

const columns: DataTableColumn<Employee>[] = [
  { accessor: 'firstName' },
  { accessor: 'lastName' },
  { accessor: 'email' },
  { accessor: 'department.name', title: 'Department' },
  { accessor: 'department.company.name', title: 'Company', noWrap: true },
  { accessor: 'department.company.streetAddress', title: 'Address', noWrap: true },
  { accessor: 'department.company.city', title: 'City' },
  { accessor: 'department.company.state', title: 'State', textAlign: 'right' },
];

export function ScrollableExample() {
  // example-start scrollable
  return (
    <DataTable
      height={300}
      // example-skip more table props
      withTableBorder
      withColumnBorders
      striped
      records={records}
      columns={columns}
      // example-resume
    />
  );
  // example-end
}

export function AutoHeightExample() {
  // example-start auto-height
  return (
    <DataTable
      // example-skip table props
      withTableBorder
      withColumnBorders
      striped
      records={records}
      columns={columns}
      // example-resume
    />
  );
  // example-end
}

export function ScrollAreaPropsExample() {
  return (
    // example-start scroll-area-props
    <DataTable
      height={300}
      // example-skip other props
      withTableBorder
      withColumnBorders
      striped
      records={records}
      columns={columns}
      // example-resume
      scrollAreaProps={{ type: 'never' }}
    />
    // example-end
  );
}
