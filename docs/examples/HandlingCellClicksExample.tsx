import { Button, Center, Code, Stack, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { DataTable } from 'mantine-datatable';
import { companies } from '~/data';

export default function HandlingCellClicksExample() {
  return (
    // example-start
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      onCellClick={({ record, recordIndex, column, columnIndex }) => {
        openModal({
          title: 'Cell click information',
          children: (
            <Stack>
              <Text size="sm">
                You clicked on row[{recordIndex}], column[{columnIndex}] with accessor <Code>{column.accessor}</Code>.
                <br />
                The clicked row refers to company <em>{record.name}</em>.
              </Text>
              <Center>
                <Button sx={{ width: '100%', maxWidth: 100 }} onClick={() => closeAllModals()}>
                  OK
                </Button>
              </Center>
            </Stack>
          ),
        });
      }}
    />
    // example-end
  );
}
