import { createStyles } from '@mantine/core';
import { DataTable, uniqBy } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import companies from '~/data/companies.json';

const PAGE_SIZE = 4;

// example-start
const useStyles = createStyles((theme) => ({
  root: {
    border: `1px dashed ${theme.colors.red[6]}`,
    borderRadius: theme.radius.md,
  },
  header: {
    fontStyle: 'italic',
    '&& th': { color: theme.colors.red[6] },
  },
  footer: {
    fontStyle: 'italic',
    '&& th': { color: theme.colors.red[6] },
  },
  pagination: {
    color: theme.colors.orange[6],
    'button[data-active="true"]': {
      background: theme.colors.orange[4],
    },
    'button[data-active="true"]:not([data-disabled="true"]):hover': {
      background: theme.colors.orange[5],
    },
  },
}));

export default function AdditionalStylingExampleWithClassNames() {
  // example-skip
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(companies.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(companies.slice(from, to));
  }, [page]);

  // example-resume
  const { classes } = useStyles();
  return (
    <DataTable
      classNames={classes}
      // example-skip
      columns={[
        { accessor: 'name', footer: `${companies.length} companies` },
        {
          accessor: 'missionStatement',
          width: 150,
          footer: `Avg. chars: ${
            companies.map((c) => c.missionStatement.length).reduce((acc, len) => acc + len) / companies.length
          }`,
        },
        { accessor: 'streetAddress' },
        { accessor: 'city' },
        { accessor: 'state', footer: `${uniqBy(companies, (c) => c.state).length} states` },
      ]}
      records={records}
      totalRecords={companies.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      // example-resume
    />
  );
}
// example-end
