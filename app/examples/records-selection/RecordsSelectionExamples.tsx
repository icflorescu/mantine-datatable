'use client';

import { Button, Center, Paper } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { DataTable, DataTableColumn } from '__PACKAGE__';
import { useState } from 'react';
import { companies, employees as employeeData, type Company, type Employee } from '~/data';

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

export function AdditionalCheckboxPropsExample() {
  // example-start AdditionalCheckboxPropsExample.tsx
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

const employees = employeeData.slice(0, 15);

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
      records={employees}
      // example-resume
    />
  );
  // example-end
}
