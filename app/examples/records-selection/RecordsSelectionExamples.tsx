'use client';

import { Button, Center, Paper } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { DataTable, type DataTableColumn } from '__PACKAGE__';
import { differenceBy, uniqBy } from 'lodash';
import { useEffect, useState } from 'react';
import { companies, employees, type Company, type Employee } from '~/data';

// example-start columns.ts
const columns: DataTableColumn<Company>[] = [
  { accessor: 'name', width: '40%' },
  { accessor: 'streetAddress', width: '60%' },
  { accessor: 'city', width: 160 },
  { accessor: 'state', width: 80, textAlign: 'right' },
];
// example-end

export function RecordsSelectionExample() {
  // example-start RecordsSelectionExample.tsx
  const [selectedRecords, setSelectedRecords] = useState<Company[]>([]);

  return (
    <>
      <DataTable
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        records={companies}
        columns={columns}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
      {/* example-skip delete button */}
      <Paper p="md" mt="sm" withBorder>
        <Center>
          <Button
            leftSection={<IconTrash size={16} />}
            color="red"
            disabled={!selectedRecords.length}
            onClick={() => showNotification({ color: 'red', message: 'Deleting data is dangerous!' })}
          >
            {selectedRecords.length
              ? `Delete ${
                  selectedRecords.length === 1 ? 'one selected record' : `${selectedRecords.length} selected records`
                }`
              : 'Select records to delete'}
          </Button>
        </Center>
      </Paper>
      {/* example-resume */}
    </>
  );
  // example-end
}

export function DisabledRecordsExample() {
  // example-start DisabledRecordsExample.tsx
  const [selectedRecords, setSelectedRecords] = useState<Company[]>([]);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      records={companies}
      columns={columns}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      isRecordSelectable={(record) => record.name.length < 14}
    />
  );
  // example-end
}

export function CheckboxPropsExample() {
  // example-start CheckboxPropsExample.tsx
  const [selectedRecords, setSelectedRecords] = useState<Company[]>([]);

  return (
    <DataTable
      // example-skip other props
      withTableBorder
      withColumnBorders
      records={companies}
      columns={columns}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      // example-resume
      allRecordsSelectionCheckboxProps={{ 'aria-label': 'Select all records' }}
      getRecordSelectionCheckboxProps={(record) => ({ 'aria-label': `Select ${record.name}` })}
    />
  );
  // example-end
}

export function SelectAllRecordsOnAllPagesExample() {
  // example-start SelectAllRecordsOnAllPagesExample.tsx
  const PAGE_SIZE = 10;

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(employees.slice(0, PAGE_SIZE));
  const [allRecordsSelected, setAllRecordsSelected] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState<Employee[]>([]);
  const [unselectedRecords, setUnselectedRecords] = useState<Employee[]>([]);

  const handleSelectedRecordsChange = (newSelectedRecords: Employee[]) => {
    if (allRecordsSelected) {
      const recordsToUnselect = records.filter((record) => !newSelectedRecords.includes(record));
      setUnselectedRecords(
        // 👇 `uniqBy` from `lodash`
        uniqBy([...unselectedRecords, ...recordsToUnselect], 'id').filter((r) => !newSelectedRecords.includes(r))
      );
    } else {
      setSelectedRecords(newSelectedRecords);
    }
  };

  const handleAllRecordsSelectionCheckboxChange = () => {
    if (allRecordsSelected) {
      setAllRecordsSelected(false);
      setSelectedRecords([]);
      setUnselectedRecords([]);
    } else {
      setAllRecordsSelected(true);
    }
  };

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    const currentRecords = employees.slice(from, to);
    setRecords(currentRecords);
    if (allRecordsSelected) {
      setSelectedRecords(
        // 👇 `differenceBy` from `lodash`
        differenceBy(currentRecords, unselectedRecords, 'id')
      );
    }
  }, [allRecordsSelected, page, unselectedRecords]);

  return (
    <>
      <DataTable
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={handleSelectedRecordsChange}
        allRecordsSelectionCheckboxProps={{
          indeterminate: allRecordsSelected && !!unselectedRecords.length,
          checked: allRecordsSelected,
          onChange: handleAllRecordsSelectionCheckboxChange,
          title: allRecordsSelected ? 'Unselect all records' : `Select ${employees.length} records`,
        }}
        records={records}
        totalRecords={employees.length}
        recordsPerPage={PAGE_SIZE}
        page={page}
        onPageChange={(p) => setPage(p)}
        // example-skip other table props
        columns={[
          { accessor: 'firstName' },
          { accessor: 'lastName' },
          { accessor: 'email' },
          { accessor: 'department.name', title: 'Department' },
          { accessor: 'department.company.name', title: 'Company' },
        ]}
        withTableBorder
        withColumnBorders
        // example-resume
      />
      <Paper p="md" mt="sm" withBorder>
        <Center>
          You have selected {allRecordsSelected ? employees.length - unselectedRecords.length : selectedRecords.length}{' '}
          records of a total of {employees.length}.
        </Center>
      </Paper>
    </>
  );
  // example-end
}

const fiveEmployees = employees.slice(0, 5);

export function RecordsSelectionHorizontalScrollingBehaviorExample() {
  // example-start RecordsSelectionHorizontalScrollingBehaviorExample.tsx
  const [selectedRecords, setSelectedRecords] = useState<Employee[]>([]);

  return (
    <DataTable
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      // 👇 these columns take up more horizontal space
      columns={[
        { accessor: 'firstName' },
        { accessor: 'lastName' },
        { accessor: 'email' },
        { accessor: 'department.name', title: 'Department' },
        { accessor: 'department.company.name', title: 'Company', noWrap: true },
        { accessor: 'department.company.missionStatement', title: 'Company mission statement', noWrap: true },
        { accessor: 'department.company.streetAddress', title: 'Street address', noWrap: true },
        { accessor: 'department.company.city', title: 'City', noWrap: true },
        { accessor: 'department.company.state', title: 'State', textAlign: 'right' },
      ]}
      // example-skip other table props
      withTableBorder
      withColumnBorders
      records={fiveEmployees}
      // example-resume
    />
  );
  // example-end
}
