import { ActionIcon, Button, createStyles, Grid, Group, Stack, Text } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { DataTable } from 'mantine-datatable';
import { MouseEvent } from 'react';
import { Edit, Trash } from 'tabler-icons-react';
import { companies, Company } from '~/data';

const records = companies.slice(0, 5);

const useStyles = createStyles((theme) => ({
  details: { background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0] },
  label: { width: 130 },
}));

export function RowExpansionExampleSimple() {
  const { classes } = useStyles();
  // example-start simple
  return (
    <DataTable
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      rowExpansion={{
        content: ({ record }) => (
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
        ),
      }}
    />
  );
  // example-end
}

export function RowExpansionExampleCollapseProps() {
  const { classes } = useStyles();
  // example-start collapse-props
  return (
    <DataTable
      // example-skip
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      // example-resume
      rowExpansion={{
        collapseProps: {
          transitionDuration: 500,
          animateOpacity: false,
          transitionTimingFunction: 'ease-out',
        },
        // example-skip
        content: ({ record }) => (
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
        ),
        // example-resume
      }}
    />
  );
  // example-end
}

export function RowExpansionExampleInitiallyExpandedRows() {
  const { classes } = useStyles();
  // example-start initially-expanded-rows
  return (
    <DataTable
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      rowExpansion={{
        initiallyExpanded: (record) => record.name === 'Pfeffer and Sons',
        // example-skip
        content: ({ record }) => (
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
        ),
        // example-resume
      }}
    />
  );
  // example-end
}

export function RowExpansionExampleMultipleExpandedRows() {
  const { classes } = useStyles();
  // example-start multiple-expanded-rows
  return (
    <DataTable
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      rowExpansion={{
        allowMultiple: true,
        // example-skip
        content: ({ record }) => (
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
        ),
        // example-resume
      }}
    />
  );
  // example-end
}

export function RowExpansionExampleTriggerAlways() {
  const { classes } = useStyles();
  // example-start trigger-always
  return (
    <DataTable
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      rowExpansion={{
        trigger: 'always',
        // example-skip
        content: ({ record }) => (
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
        ),
        // example-resume
      }}
    />
  );
  // example-end
}

export function RowExpansionExampleWithClickableCellComponents() {
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

  const { classes } = useStyles();
  // example-start with-clickable-cell-components
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
                <Edit size={16} />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  deleteCompany(company);
                }}
              >
                <Trash size={16} />
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
