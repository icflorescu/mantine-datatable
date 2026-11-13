'use client';

import { DataTable, type DataTableColumn } from '__PACKAGE__';
import { type Employee, employees } from '~/data';

// 👇 Column definitions declared outside the component are typed explicitly,
//    so that render functions are checked against the Employee type and accessors are autocompleted
const columns: DataTableColumn<Employee>[] = [
  {
    accessor: 'name',
    render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
  { accessor: 'email' },
  // 👇 Dot-notation accessors for nested properties work as well
  { accessor: 'department.name', title: 'Department' },
];

export function TypedColumnsExample() {
  return <DataTable withTableBorder columns={columns} records={employees.slice(0, 5)} />;
}
