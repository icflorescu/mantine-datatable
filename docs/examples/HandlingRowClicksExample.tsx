import { Button, Center, Code, Stack, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { DataTable } from 'mantine-datatable';
import { companies } from '~/data';

export default function HandlingRowClicksExample() {
  return (
    // example-start
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      onRowClick={(company, rowIndex, event) => {
        openModal({
          title: 'Company information',
          children: (
            <Stack>
              <Text size="sm">
                You clicked on row[{rowIndex}], referring to company <em>{company.name}</em>.
                <br />
                {event.shiftKey && (
                  <>
                    You pressed the <Code>Shift</Code> key when clicking.
                    <br />
                  </>
                )}
                {event.ctrlKey && (
                  <>
                    You pressed the <Code>Ctrl</Code> key when clicking.
                    <br />
                  </>
                )}
                {event.altKey && (
                  <>
                    You pressed the <Code>Alt</Code> key when clicking.
                    <br />
                  </>
                )}
                {event.metaKey && (
                  <>
                    You pressed the <Code>Meta</Code> key when clicking.
                    <br />
                  </>
                )}
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
