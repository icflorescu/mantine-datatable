import { Box, createStyles, Group, Stack, Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { companies, departments, employees } from '~/data';

const useStyles = createStyles({ detailsLabel: { width: 80 } });

export default function ExpandingRowsExample() {
  const { classes } = useStyles();
  return (
    <DataTable
      withBorder
      withColumnBorders
      striped
      records={companies}
      columns={[
        { accessor: 'name', width: 250 },
        { accessor: 'cityAndState', render: ({ city, state }) => `${city}, ${state}` },
      ]}
      expandedRow={{
        // expandRowOn: ({ name }) => name === 'Champlin - Spencer',
        // expandRowOn: 'always',
        // expandFirst: 'ab1e3aa6-3116-4e0d-a33d-9262aac86747',
        expandMultiple: true,
        item: ({ id, streetAddress }) => (
          <Box p="sm">
            <Stack>
              <Group>
                <Text size="xs" color="dimmed" className={classes.detailsLabel}>
                  Street address:
                </Text>
                <Text size="xs">{streetAddress}</Text>
              </Group>
              <Group>
                <Text size="xs" color="dimmed" className={classes.detailsLabel}>
                  Departments:
                </Text>
                <Text size="xs">{departments.filter((department) => department.company.id === id).length}</Text>
              </Group>
              <Group>
                <Text size="xs" color="dimmed" className={classes.detailsLabel}>
                  Employees:
                </Text>
                <Text size="xs">{employees.filter((employee) => employee.department.company.id === id).length}</Text>
              </Group>
            </Stack>
          </Box>
        ),
      }}
    />
  );
}
