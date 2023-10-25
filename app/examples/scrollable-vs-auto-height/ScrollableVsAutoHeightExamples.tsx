'use client';

import { DataTable } from '__PACKAGE__';
import { employees } from '~/data';

const records = employees.slice(0, 15);

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
      columns={[{ accessor: 'firstName' }, { accessor: 'lastName' }, { accessor: 'email' }]}
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
      withTableBorder
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
