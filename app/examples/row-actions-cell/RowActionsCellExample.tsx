'use client';

import { ActionIcon, Box, Button, Grid, GridCol, Group, Stack, Text } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { companies, type Company } from '~/data';

const records = companies.slice(0, 5);

const showModal = ({ company, action }: { company: Company; action: 'view' | 'edit' | 'delete' }) => {
  openModal({
    modalId: action,
    title:
      action === 'view'
        ? 'Showing company information'
        : action === 'edit'
        ? 'Editing company information'
        : 'Deleting company',
    children: (
      <Stack>
        <Text>
          {action === 'view'
            ? 'Here’s where you could show more information...'
            : action === 'edit'
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

export function RowActionsCellExample() {
  // example-start
  return (
    <DataTable
      withTableBorder
      columns={[
        { accessor: 'name' },
        { accessor: 'city' },
        { accessor: 'state' },
        {
          accessor: 'actions',
          title: <Box mr="xs">Row actions</Box>,
          textAlign: 'right',
          render: (company) => (
            <Group gap={4} justify="right" wrap="nowrap">
              <ActionIcon variant="subtle" color="green" onClick={() => showModal({ company, action: 'view' })}>
                <IconEye size={16} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="blue" onClick={() => showModal({ company, action: 'edit' })}>
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon variant="subtle" color="red" onClick={() => showModal({ company, action: 'delete' })}>
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={records}
    />
  );
  // example-end
}
