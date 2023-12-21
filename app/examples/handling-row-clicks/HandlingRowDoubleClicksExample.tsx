'use client';

import { Button, Center, Code, Stack, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';

export function HandlingRowDoubleClicksExample() {
  return (
    // example-start
    <DataTable
      textSelectionDisabled
      withTableBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      onRowDoubleClick={({ record, index, event }) => {
        // example-skip process double-click event
        openModal({
          title: 'Company information',
          children: (
            <Stack>
              <Text size="sm">
                You double-clicked on row[{index}], referring to company <em>{record.name}</em>.
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
                <Button fullWidth onClick={() => closeAllModals()}>
                  OK
                </Button>
              </Center>
            </Stack>
          ),
        });
        // example-resume
      }}
    />
    // example-end
  );
}
