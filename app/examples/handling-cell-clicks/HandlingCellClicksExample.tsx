'use client';

import { Button, Center, Code, Stack, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { DataTable } from '__PACKAGE__';
import { companies } from '~/data';

export function HandlingCellClicksExample() {
  return (
    // example-start
    <DataTable
      textSelectionDisabled
      withTableBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      onCellClick={({ event, record, index, column, columnIndex }) => {
        openModal({
          title: 'Cell click information',
          children: (
            <Stack>
              <Text size="sm">
                You clicked on row[{index}], column[{columnIndex}] with accessor <Code>{column.accessor}</Code>.
                <br />
                The clicked row refers to company <em>{record.name}</em>.
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
      }}
    />
    // example-end
  );
}
