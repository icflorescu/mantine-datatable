import { Button, Center, Stack, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { DataTable } from 'mantine-datatable';
import { companies } from '~/data';

export default function HandlingRowClicksExample() {
  return (
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      onRowClick={(company) =>
        openModal({
          title: 'Company information',
          styles: {
            modal: { maxWidth: 300 },
          },
          children: (
            <Stack>
              <Text size="sm">
                You clicked on row showing company <em>{company.name}</em>.
              </Text>
              <Center>
                <Button sx={{ width: '100%', maxWidth: 100 }} onClick={() => closeAllModals()}>
                  OK
                </Button>
              </Center>
            </Stack>
          ),
        })
      }
    />
  );
}
