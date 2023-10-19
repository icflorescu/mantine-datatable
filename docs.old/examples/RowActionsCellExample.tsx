import { ActionIcon, Button, Grid, Group, Stack, Text } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { Company, companies } from '~/data';

const records = companies.slice(0, 5);

const showInfo = (company: Company) => {
  openModal({
    modalId: 'view',
    title: 'Showing company information',
    children: (
      <Stack>
        <Text>Here’s where you could show more information...</Text>
        <Grid gutter="xs">
          <Grid.Col span={2}>ID</Grid.Col>
          <Grid.Col span={10}>{company.id}</Grid.Col>
          <Grid.Col span={2}>Name</Grid.Col>
          <Grid.Col span={10}>{company.name}</Grid.Col>
        </Grid>
        <Button onClick={() => closeModal('view')}>Close</Button>
      </Stack>
    ),
  });
};

const editInfo = (company: Company) => {
  openModal({
    modalId: 'edit',
    title: 'Editing company information',
    children: (
      <Stack>
        <Text>Here’s where you could put an edit form...</Text>
        <Grid gutter="xs">
          <Grid.Col span={2}>ID</Grid.Col>
          <Grid.Col span={10}>{company.id}</Grid.Col>
          <Grid.Col span={2}>Name</Grid.Col>
          <Grid.Col span={10}>{company.name}</Grid.Col>
        </Grid>
        <Button onClick={() => closeModal('edit')}>Close</Button>
      </Stack>
    ),
  });
};

const deleteCompany = (company: Company) => {
  openModal({
    modalId: 'delete',
    title: 'Delete company',
    children: (
      <Stack>
        <Text>Here’s where you could ask for confirmation before deleting...</Text>
        <Grid gutter="xs">
          <Grid.Col span={2}>ID</Grid.Col>
          <Grid.Col span={10}>{company.id}</Grid.Col>
          <Grid.Col span={2}>Name</Grid.Col>
          <Grid.Col span={10}>{company.name}</Grid.Col>
        </Grid>
        <Button onClick={() => closeModal('delete')}>Close</Button>
      </Stack>
    ),
  });
};

export default function RowActionsCellExample() {
  // example-start
  return (
    <DataTable
      withBorder
      shadow="xs"
      columns={[
        { accessor: 'name' },
        { accessor: 'city' },
        { accessor: 'state' },
        {
          accessor: 'actions',
          title: <Text mr="xs">Row actions</Text>,
          textAlignment: 'right',
          render: (company) => (
            <Group spacing={4} position="right" noWrap>
              <ActionIcon color="green" onClick={() => showInfo(company)}>
                <IconEye size={16} />
              </ActionIcon>
              <ActionIcon color="blue" onClick={() => editInfo(company)}>
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon color="red" onClick={() => deleteCompany(company)}>
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
