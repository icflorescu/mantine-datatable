import { sortBy } from 'lodash';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { companies } from '~/data';

const PAGE_SIZE = 4;

const initialRecords = sortBy(companies, 'name');

export function CustomizingBorderColorsWithStringsExample() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(initialRecords.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(initialRecords.slice(from, to));
  }, [page]);

  return (
    // example-start strings
    <DataTable
      withBorder
      withColumnBorders
      borderColor="#40C057"
      rowBorderColor="#FAB005"
      // example-skip
      records={records}
      columns={[
        { accessor: 'name', width: '40%' },
        { accessor: 'streetAddress', width: '60%' },
        { accessor: 'city', width: 160 },
        { accessor: 'state', width: 80 },
      ]}
      totalRecords={initialRecords.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      // example-resume
    />
    // example-end
  );
}

export function CustomizingBorderColorsWithFunctionsExample() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(initialRecords.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(initialRecords.slice(from, to));
  }, [page]);

  return (
    // example-start functions
    <DataTable
      withBorder
      withColumnBorders
      borderColor={(theme) =>
        theme.colorScheme === 'dark' ? theme.fn.darken(theme.colors.orange[8], 0.2) : theme.colors.red[8]
      }
      rowBorderColor={(theme) =>
        theme.colorScheme === 'dark' ? theme.fn.darken(theme.colors.orange[8], 0.4) : theme.colors.red[2]
      }
      // example-skip
      records={records}
      columns={[
        { accessor: 'name', width: '40%' },
        { accessor: 'streetAddress', width: '60%' },
        { accessor: 'city', width: 160 },
        { accessor: 'state', width: 80 },
      ]}
      totalRecords={initialRecords.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      // example-resume
    />
    // example-end
  );
}
