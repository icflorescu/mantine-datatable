import { Button, createStyles, Group, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { DataTable } from 'mantine-datatable';
import { useState } from 'react';
import { companies } from '~/data';

const records = companies.slice(0, 5);

const useStyles = createStyles((theme) => ({
  details: { background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0] },
  label: { width: 130 },
  horizontalButton: { flex: '1 1 33%' },
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
        initiallyExpanded: (record) => record.name === 'Johnston LLC',
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

export function RowExpansionExampleControlledMode() {
  const { theme, classes, cx } = useStyles();
  const horizontalButtons = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);
  const [firstRowId, secondRowId, thirdRowId, fourthRowId] = records.slice(0, 4).map((r) => r.id);

  // example-start controlled-mode
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  const expandFirstAndThirdRow = () => {
    setExpandedRecordIds([firstRowId, thirdRowId]);
  };

  const expandSecondAndFourthRow = () => {
    setExpandedRecordIds([secondRowId, fourthRowId]);
  };

  const collapseAllRows = () => {
    setExpandedRecordIds([]);
  };

  return (
    <>
      {/* example-skip buttons triggering the above callbacks */}
      <Button.Group orientation={horizontalButtons ? 'horizontal' : 'vertical'}>
        <Button
          className={cx({ [classes.horizontalButton]: horizontalButtons })}
          variant="default"
          onClick={expandFirstAndThirdRow}
          disabled={expandedRecordIds.includes(firstRowId) && expandedRecordIds.includes(thirdRowId)}
        >
          Expand first and third row
        </Button>
        <Button
          className={cx({ [classes.horizontalButton]: horizontalButtons })}
          variant="default"
          onClick={expandSecondAndFourthRow}
          disabled={expandedRecordIds.includes(secondRowId) && expandedRecordIds.includes(fourthRowId)}
        >
          Expand second and fourth row
        </Button>
        <Button
          className={cx({ [classes.horizontalButton]: horizontalButtons })}
          variant="default"
          onClick={collapseAllRows}
          disabled={expandedRecordIds.length === 0}
        >
          Collapse all rows
        </Button>
      </Button.Group>
      {/* example-resume */}
      <DataTable
        mt="md"
        withBorder
        withColumnBorders
        columns={[
          { accessor: 'number', title: '#', render: (_, index) => index + 1 },
          { accessor: 'name', width: '100%' },
          { accessor: 'city', ellipsis: true },
          { accessor: 'state' },
        ]}
        records={records}
        rowExpansion={{
          // trigger: 'never', // 👈 uncomment this if you want to disable expanding/collapsing on click
          allowMultiple: true,
          expanded: {
            recordIds: expandedRecordIds,
            onRecordIdsChange: setExpandedRecordIds,
          },
          content: ({ record }) => (
            // example-skip expansion content
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
    </>
  );
  // example-end
}
