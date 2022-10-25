import { Button, Center, Paper } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { useState } from 'react';
import { Trash } from 'tabler-icons-react';
import { companies, Company } from '~/data';

export function RecordsSelectionExample() {
  // example-start standard
  const [selectedRecords, setSelectedRecords] = useState<Company[]>([]);

  return (
    <>
      <DataTable
        withBorder
        withColumnBorders
        records={companies}
        columns={[
          { accessor: 'name', width: '40%' },
          { accessor: 'streetAddress', width: '60%' },
          { accessor: 'city', width: 160 },
          { accessor: 'state', width: 80 },
        ]}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
      <Paper my="xl" py="xl" withBorder radius={0}>
        <Center>
          <Button
            uppercase
            leftIcon={<Trash size={16} />}
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
    </>
  );
  // example-end
}

export function RecordsSelectionWithDisabledItemsExample() {
  // example-start disabled-records
  const [selectedRecords, setSelectedRecords] = useState<Company[]>([]);

  return (
    <DataTable
      withBorder
      withColumnBorders
      records={companies}
      columns={[
        { accessor: 'name', width: '40%' },
        { accessor: 'streetAddress', width: '60%' },
        { accessor: 'city', width: 160 },
        { accessor: 'state', width: 80 },
      ]}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      isRecordSelectable={(record) => record.name.length < 18}
    />
  );
  // example-end
}
