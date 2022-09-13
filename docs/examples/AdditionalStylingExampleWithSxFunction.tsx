import { DataTable } from 'mantine-datatable';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

export default function AdditionalStylingExampleWithSxFunction() {
  // example-start
  return (
    <DataTable
      sx={(theme) => ({
        border: `1px solid ${theme.colors.blue[6]}`,
        borderRadius: theme.radius.md,
      })}
      // example-skip
      columns={[
        { accessor: 'name' },
        { accessor: 'missionStatement', width: 150 },
        { accessor: 'streetAddress' },
        { accessor: 'city' },
        { accessor: 'state' },
      ]}
      records={records}
      // example-resume
    />
  );
  // example-end
}
