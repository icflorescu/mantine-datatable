import { DataTable } from '__PACKAGE__';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export function DisablingTextSelectionExample({ textSelectionDisabled }: { textSelectionDisabled: boolean }) {
  // example-start
  return (
    // prettier-ignore
    <DataTable
      textSelectionDisabled={textSelectionDisabled}
      // example-skip
      withTableBorder
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
