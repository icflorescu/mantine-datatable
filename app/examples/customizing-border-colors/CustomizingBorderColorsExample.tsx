'use client';

import { DataTable, uniqBy } from '__PACKAGE__';
import sortBy from 'lodash/sortBy';
import { useEffect, useState } from 'react';
import { companies } from '~/data';

const PAGE_SIZE = 4;

const allCompanies = sortBy(companies, 'name');

export function CustomizingBorderColorsExample() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(allCompanies.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(allCompanies.slice(from, to));
  }, [page]);

  return (
    // example-start
    <DataTable
      withTableBorder
      withColumnBorders
      borderColor="#40C057"
      rowBorderColor="#FAB005"
      // example-skip
      records={records}
      columns={[
        { accessor: 'name', width: '40%', footer: `${allCompanies.length} companies` },
        { accessor: 'streetAddress', width: '60%' },
        { accessor: 'city', width: 160, footer: `${uniqBy(allCompanies, (c) => c.city).length} cities` },
        { accessor: 'state', width: 80, footer: `${uniqBy(allCompanies, (c) => c.state).length} states` },
      ]}
      totalRecords={allCompanies.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      // example-resume
    />
    // example-end
  );
}
