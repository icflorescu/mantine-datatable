import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import companies from '~/data/companies.json';

const PAGE_SIZE = 4;

export default function AdditionalStylingExampleWithStylesObject() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(companies.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(companies.slice(from, to));
  }, [page]);

  // example-start
  return (
    <DataTable
      styles={{
        root: {
          border: '1px solid yellowgreen',
          borderRadius: 5,
        },
        header: {
          fontStyle: 'italic',
        },
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
      totalRecords={companies.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      // example-resume
    />
  );
  // example-end
}
