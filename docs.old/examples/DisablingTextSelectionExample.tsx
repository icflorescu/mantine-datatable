import { DataTable } from 'mantine-datatable';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export default function DisablingTextSelectionExample({ textSelectionDisabled }: { textSelectionDisabled: boolean }) {
  // example-start
  return (
    // prettier-ignore
    <DataTable
      textSelectionDisabled={textSelectionDisabled}
      // example-skip
      withBorder
      withColumnBorders
      columns={[
        { accessor: 'name' },
        { accessor: 'city' },
        { accessor: 'state' }
      ]}
      records={records}
      // example-resume
    />
  );
  // example-end
}
