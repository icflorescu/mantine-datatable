import { DataTable } from 'mantine-datatable';
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);

// example-start
export default function AdditionalStylingExampleWithStyleObject() {
  return (
    <DataTable
      style={{
        border: '1px solid yellowgreen',
        borderRadius: 5,
      }}
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
}
// example-end
