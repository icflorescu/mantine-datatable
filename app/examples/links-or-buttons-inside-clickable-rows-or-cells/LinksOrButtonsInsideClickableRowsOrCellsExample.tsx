'use client';

import { ActionIcon, Box, Button, Grid, GridCol, Group, Stack, Text } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { Company, companies } from '~/data';

const records = companies.slice(0, 5);

const showModal = ({ company, action }: { company: Company; action: 'edit' | 'delete' }) => {
  openModal({
    modalId: action,
    title: action === 'edit' ? 'Editing company information' : 'Deleting company',
    children: (
      <Stack>
        <Text>
          {action === 'edit'
            ? 'Here’s where you could put an edit form...'
            : 'Here’s where you could ask for confirmation before deleting...'}
        </Text>
        <Grid gutter="xs">
          <GridCol span={2}>ID</GridCol>
          <GridCol span={10}>{company.id}</GridCol>
          <GridCol span={2}>Name</GridCol>
          <GridCol span={10}>{company.name}</GridCol>
        </Grid>
        <Button onClick={() => closeModal(action)}>Close</Button>
      </Stack>
    ),
  });
};

export function LinksOrButtonsInsideClickableRowsOrCellsExample() {
  // example-start
  return (
    <DataTable
      striped
      withTableBorder
      withColumnBorders
      records={records}
      columns={[
        { accessor: 'name', noWrap: true },
        { accessor: 'city' },
        { accessor: 'state' },
        {
          accessor: 'actions',
          width: '0%',
          title: <Box mx={6}>Row actions</Box>,
          textAlign: 'right',
          render: (company) => (
            <Group gap={4} justify="right" wrap="nowrap">
              <ActionIcon
                size="sm"
                variant="subtle"
                color="blue"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  showModal({ company, action: 'edit' });
                }}
              >
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="subtle"
                color="red"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  showModal({ company, action: 'delete' });
                }}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      rowExpansion={{
        content: ({ record }) => (
          // example-skip
          <Stack fz="sm" p="xs" pl="lg" gap={6}>
            <Group gap={6}>
              <Text inherit w={130}>
                Postal address:
              </Text>
              <Text inherit>
                {record.streetAddress}, {record.city}, {record.state}
              </Text>
            </Group>
            <Group gap={6}>
              <Text inherit w={130}>
                Mission statement:
              </Text>
              <Text inherit fs="italic">
                “{record.missionStatement}”
              </Text>
            </Group>
          </Stack>
          // example-resume
        ),
      }}
    />
  );
  // example-end
}
