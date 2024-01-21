'use client';

import { ActionIcon, Box, Button, Grid, GridCol, Group, Stack, Text } from '@mantine/core';
import { closeModal, openModal } from '@mantine/modals';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { useState } from 'react';
import { employees, type Employee } from '~/data';

const records = employees.slice(0, 5);

const showModal = ({ employee, action }: { employee: Employee; action: 'view' | 'edit' | 'delete' }) => {
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
          <GridCol span={10}>{employee.id}</GridCol>
          <GridCol span={2}>First name</GridCol>
          <GridCol span={10}>{employee.firstName}</GridCol>
          <GridCol span={2}>Last name</GridCol>
          <GridCol span={10}>{employee.lastName}</GridCol>
        </Grid>
        <Button onClick={() => closeModal(action)}>Close</Button>
      </Stack>
    ),
  });
};

export function PinLastColumnExample() {
  const [selectedRecord, setSelectedRecord] = useState<Employee[]>([]);

  // example-start default
  return (
    <DataTable
      pinLastColumn // 👈 make sure the last column is always visible
      // example-skip other table props
      withTableBorder
      columns={[
        { accessor: 'firstName', noWrap: true },
        { accessor: 'lastName', noWrap: true },
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
          render: (employee) => (
            <Group gap={4} justify="right" wrap="nowrap">
              <ActionIcon
                size="sm"
                variant="subtle"
                color="green"
                onClick={() => showModal({ employee, action: 'view' })}
              >
                <IconEye size={16} />
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="subtle"
                color="blue"
                onClick={() => showModal({ employee, action: 'edit' })}
              >
                <IconEdit size={16} />
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="subtle"
                color="red"
                onClick={() => showModal({ employee, action: 'delete' })}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={records}
      selectedRecords={selectedRecord}
      onSelectedRecordsChange={setSelectedRecord}
      // example-resume
    />
  );
  // example-end
}

export function PinLastColumnExampleWithColumnGroups() {
  const [selectedRecord, setSelectedRecord] = useState<Employee[]>([]);

  // example-start with-column-groups
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      pinLastColumn
      groups={[
        // example-skip other column groups
        {
          id: 'name',
          columns: [
            { accessor: 'firstName', noWrap: true },
            { accessor: 'lastName', noWrap: true },
          ],
        },
        {
          id: 'workplaceInformation',
          columns: [
            { accessor: 'department.company.name', title: 'Company', noWrap: true },
            { accessor: 'department.name', title: 'Department' },
            { accessor: 'department.company.missionStatement', title: 'Mission statement', noWrap: true },
          ],
        },
        {
          id: 'workplaceLocation',
          columns: [
            { accessor: 'department.company.city', title: 'City', noWrap: true },
            { accessor: 'department.company.state', title: 'State' },
            { accessor: 'department.company.streetAddress', title: 'Address', noWrap: true },
          ],
        },
        // example-resume
        // 👇 this group has only one column, so it will be pinned to the right side of the table
        {
          id: 'actions',
          title: '', // 👈 empty title
          style: { borderBottomColor: 'transparent' }, // 👈 hide the group bottom border
          columns: [
            {
              accessor: 'actions',
              title: (
                // 👇 use an absolutely positioned custom title component
                //    to center the title vertically
                <Text inherit pos="absolute" mt={-28} ml={12}>
                  Actions
                </Text>
              ),
              render: (employee) => (
                <Group gap={4} wrap="nowrap">
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="green"
                    onClick={() => showModal({ employee, action: 'view' })}
                  >
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="blue"
                    onClick={() => showModal({ employee, action: 'edit' })}
                  >
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="red"
                    onClick={() => showModal({ employee, action: 'delete' })}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              ),
            },
          ],
          // example-resume
        },
      ]}
      // example-skip other table props
      records={records}
      selectedRecords={selectedRecord}
      onSelectedRecordsChange={setSelectedRecord}
      // example-resume
    />
  );
  // example-end
}
