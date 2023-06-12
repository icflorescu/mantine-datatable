import { DataTable } from 'mantine-datatable';
import employees from '~/data/employees.json';

const records = employees.slice(0, 15);

export function ScrollableExample() {
  // example-start scrollable
  return (
    <DataTable
      height={300}
      // example-skip other props
      withBorder
      withColumnBorders
      striped
      records={records}
      columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
      // example-resume
    />
    // example-end
  );
}

export function AutoHeightExample() {
  // example-start auto-height
  return (
    <DataTable
      // example-skip props
      withBorder
      withColumnBorders
      striped
      records={records}
      columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
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
      withBorder
      withColumnBorders
      striped
      records={records}
      columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
      // example-resume
      scrollAreaProps={{ type: 'never' }}
    />
    // example-end
  );
}
