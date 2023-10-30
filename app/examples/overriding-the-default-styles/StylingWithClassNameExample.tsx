import { DataTable } from '__PACKAGE__';
import classes from './StylingWithClassNameExample.module.css';
// example-skip
import companies from '~/data/companies.json';

const records = companies.slice(0, 5);
// example-resume

export function StylingWithClassNameExample() {
  return (
    <DataTable
      className={classes.root}
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
