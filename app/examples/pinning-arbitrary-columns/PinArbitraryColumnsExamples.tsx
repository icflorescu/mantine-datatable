'use client';

import { ActionIcon, Box, Button, DirectionProvider, Group, SegmentedControl, Stack, Text } from '@mantine/core';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable, useDataTableColumns } from '__PACKAGE__';
import { useState } from 'react';
import { employees, type Employee } from '~/data';

const records = employees.slice(0, 5);

// example-start multiple-left-pinned
export function PinMultipleLeftColumnsExample() {
  return (
    <DataTable
      withTableBorder
      columns={[
        { accessor: 'firstName', noWrap: true, pinned: 'left' },
        { accessor: 'lastName', noWrap: true, pinned: 'left' },
        { accessor: 'department.name', title: 'Department' },
        { accessor: 'department.company.name', title: 'Company', noWrap: true },
        { accessor: 'department.company.city', title: 'City', noWrap: true },
        { accessor: 'department.company.state', title: 'State' },
        { accessor: 'department.company.streetAddress', title: 'Address', noWrap: true },
        { accessor: 'department.company.missionStatement', title: 'Mission statement', noWrap: true },
      ]}
      records={records}
    />
  );
}
// example-end

// example-start left-and-right-pinned
export function PinLeftAndRightColumnsExample() {
  const [selectedRecords, setSelectedRecords] = useState<Employee[]>([]);

  return (
    <DataTable
      withTableBorder
      columns={[
        { accessor: 'firstName', noWrap: true, pinned: 'left' },
        { accessor: 'lastName', noWrap: true, pinned: 'left' },
        { accessor: 'department.name', title: 'Department' },
        { accessor: 'department.company.name', title: 'Company', noWrap: true },
        { accessor: 'department.company.city', title: 'City', noWrap: true },
        { accessor: 'department.company.state', title: 'State' },
        { accessor: 'department.company.streetAddress', title: 'Address', noWrap: true },
        { accessor: 'department.company.missionStatement', title: 'Mission statement', noWrap: true },
        {
          accessor: 'actions',
          title: <Box mr={6}>Row actions</Box>,
          textAlign: 'right',
          pinned: 'right',
          render: () => (
            <Group gap={4} justify="right" wrap="nowrap">
              <ActionIcon size="sm" variant="subtle" color="green">
                <IconEye size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="blue">
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon size="sm" variant="subtle" color="red">
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={records}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
    />
  );
}
// example-end

// example-start interactive-pinning
export function InteractivePinningExample() {
  const key = 'interactive-pinning-example';
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  const { effectiveColumns, resetColumnsPinning } = useDataTableColumns<Employee>({
    key,
    columns: [
      { accessor: 'firstName', noWrap: true, pinnable: true, pinned: 'left' },
      { accessor: 'lastName', noWrap: true, pinnable: true },
      { accessor: 'department.name', title: 'Department', pinnable: true },
      { accessor: 'department.company.name', title: 'Company', noWrap: true, pinnable: true },
      { accessor: 'department.company.city', title: 'City', noWrap: true, pinnable: true },
      { accessor: 'department.company.state', title: 'State', pinnable: true },
      { accessor: 'department.company.streetAddress', title: 'Address', noWrap: true, pinnable: true },
      { accessor: 'department.company.missionStatement', title: 'Mission statement', noWrap: true, pinnable: true },
    ],
  });

  return (
    <Stack gap="xs">
      <Group justify="space-between">
        <Group gap="xs">
          <Text size="sm" fw={500}>
            Direction:
          </Text>
          <SegmentedControl
            size="xs"
            value={direction}
            onChange={(value) => setDirection(value as 'ltr' | 'rtl')}
            data={[
              { label: 'LTR', value: 'ltr' },
              { label: 'RTL', value: 'rtl' },
            ]}
          />
        </Group>
        <Button size="xs" variant="light" onClick={resetColumnsPinning}>
          Reset pinning
        </Button>
      </Group>
      <DirectionProvider key={`interactive-pinning-${direction}`} initialDirection={direction} detectDirection={false}>
        <Box dir={direction}>
          <DataTable withTableBorder storeColumnsKey={key} columns={effectiveColumns} records={records} />
        </Box>
      </DirectionProvider>
    </Stack>
  );
}
// example-end

// example-start pinning-and-toggling
export function PinningAndTogglingExample() {
  const key = 'pinning-and-toggling-example';

  const { effectiveColumns, resetColumnsPinning, resetColumnsToggle } = useDataTableColumns<Employee>({
    key,
    columns: [
      { accessor: 'firstName', noWrap: true, pinnable: true, toggleable: true, pinned: 'left' },
      { accessor: 'lastName', noWrap: true, pinnable: true, toggleable: true },
      { accessor: 'email', noWrap: true, pinnable: true, toggleable: true },
      { accessor: 'birthDate', title: 'Birth date', pinnable: true, toggleable: true },
      { accessor: 'department.name', title: 'Department', pinnable: true, toggleable: true },
      { accessor: 'department.company.name', title: 'Company', noWrap: true, pinnable: true, toggleable: true },
      { accessor: 'department.company.city', title: 'City', noWrap: true, pinnable: true, toggleable: true },
      { accessor: 'department.company.state', title: 'State', pinnable: true, toggleable: true },
      {
        accessor: 'department.company.streetAddress',
        title: 'Address',
        noWrap: true,
        pinnable: true,
        toggleable: true,
      },
      {
        accessor: 'department.company.missionStatement',
        title: 'Mission statement',
        noWrap: true,
        width: 300,
        pinnable: true,
        toggleable: true,
      },
    ],
  });

  return (
    <>
      <DataTable withTableBorder storeColumnsKey={key} columns={effectiveColumns} records={records} />
      <Group justify="right" mt="xs">
        <Button size="xs" variant="light" onClick={resetColumnsToggle}>
          Reset visibility
        </Button>
        <Button size="xs" variant="light" onClick={resetColumnsPinning}>
          Reset pinning
        </Button>
      </Group>
    </>
  );
}
// example-end

// example-start pinning-with-column-groups
export function PinningWithColumnGroupsExample() {
  const key = 'pinning-with-column-groups-example';

  const { effectiveColumns, resetColumnsPinning } = useDataTableColumns<Employee>({
    key,
    columns: [
      { accessor: 'firstName', noWrap: true, pinnable: true, pinned: 'left' },
      { accessor: 'lastName', noWrap: true, pinnable: true, pinned: 'left' },
      { accessor: 'department.name', title: 'Department', pinnable: true },
      { accessor: 'department.company.name', title: 'Company', noWrap: true, pinnable: true },
      { accessor: 'department.company.city', title: 'City', noWrap: true, pinnable: true },
      { accessor: 'department.company.state', title: 'State', pinnable: true },
      { accessor: 'department.company.streetAddress', title: 'Address', noWrap: true, pinnable: true },
      { accessor: 'department.company.missionStatement', title: 'Mission statement', noWrap: true, pinnable: true },
    ],
  });

  // Build groups from effectiveColumns, preserving pinning state
  const employeeColumns = effectiveColumns.filter(
    (c) => c.accessor === 'firstName' || c.accessor === 'lastName'
  );
  const workplaceColumns = effectiveColumns.filter(
    (c) =>
      c.accessor === 'department.name' ||
      c.accessor === 'department.company.name' ||
      c.accessor === 'department.company.city' ||
      c.accessor === 'department.company.state' ||
      c.accessor === 'department.company.streetAddress' ||
      c.accessor === 'department.company.missionStatement'
  );

  return (
    <Stack gap="xs">
      <DataTable
        withTableBorder
        withColumnBorders
        storeColumnsKey={key}
        groups={[
          { id: 'employee', title: 'Employee', columns: employeeColumns },
          { id: 'workplace', title: 'Workplace', columns: workplaceColumns },
        ]}
        records={records}
      />
      <Group justify="right">
        <Button size="xs" variant="light" onClick={resetColumnsPinning}>
          Reset pinning
        </Button>
      </Group>
    </Stack>
  );
}
// example-end
