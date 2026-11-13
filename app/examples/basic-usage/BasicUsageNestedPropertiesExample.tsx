import { DataTable } from '__PACKAGE__';
import { employees } from '~/data';

const records = employees.slice(0, 5);

export function BasicUsageNestedPropertiesExample() {
  // example-start
  return (
    <DataTable
      columns={[
        { accessor: 'firstName' },
        { accessor: 'lastName' },
        // 👇 the generated title will be “Department name”
        { accessor: 'department.name' },
        // 👇 the generated title will be “Department company name”
        { accessor: 'department.company.name' },
      ]}
      records={records}
    />
  );
  // example-end
}
