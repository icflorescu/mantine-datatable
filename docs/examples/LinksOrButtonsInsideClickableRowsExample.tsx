import { ActionIcon, Button, createStyles, Grid, Group, Stack, Text } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { MouseEvent } from 'react';
import { companies, Company } from '~/data';

const records = companies.slice(0, 5);

const useStyles = createStyles((theme) => ({
  details: { background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0] },
  label: { width: 130 },
}));

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

export default function LinksOrButtonsInsideClickableRowsExample() {
  const { classes } = useStyles();
  // example-start
  return (
    <DataTable
      withBorder
      withColumnBorders
      records={records}
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
              <ActionIcon
                color="blue"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  editInfo(company);
                }}
              >
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  deleteCompany(company);
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
          <Stack className={classes.details} p="xs" spacing={6}>
            <Group spacing={6}>
              <Text className={classes.label}>Postal address:</Text>
              <Text>
                {record.streetAddress}, {record.city}, {record.state}
              </Text>
            </Group>
            <Group spacing={6}>
              <Text className={classes.label}>Mission statement:</Text>
              <Text italic>“{record.missionStatement}”</Text>
            </Group>
          </Stack>
          // example-resume
        ),
      }}
    />
  );
  // example-end
}
