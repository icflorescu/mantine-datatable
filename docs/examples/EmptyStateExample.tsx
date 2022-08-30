import { DataTable } from 'mantine-datatable';

export default function EmptyStateExample() {
  return (
    <DataTable
      minHeight={150}
      records={[]}
      // Uncomment the next line to customize the displayed text
      // noRecordsText="No records to show"
      // example-skip
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
}
