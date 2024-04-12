'use client';

import { ActionIcon, Button, Center, Flex, Group, Image, MantineTheme, Text, TextInput, rem } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconClick, IconEdit, IconMessage, IconTrash, IconTrashX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { DataTable, DataTableColumn, DataTableProps, DataTableSortStatus } from '__PACKAGE__';
import dayjs from 'dayjs';
import { useContextMenu } from 'mantine-contextmenu';
import { useCallback, useState } from 'react';
import { Employee } from '~/data';
import { getEmployeesAsync } from '~/data/async';
import classes from './ComplexUsageExample.module.css';

const PAGE_SIZE = 100;

export function ComplexUsageExample() {
  const { showContextMenu, hideContextMenu } = useContextMenu();

  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Employee>>({
    columnAccessor: 'name',
    direction: 'asc',
  });

  const { data, isFetching } = useQuery({
    queryKey: ['employees', sortStatus.columnAccessor, sortStatus.direction, page],
    queryFn: () => getEmployeesAsync({ recordsPerPage: PAGE_SIZE, page, sortStatus, delay: { min: 300, max: 500 } }),
  });

  const [selectedRecords, setSelectedRecords] = useState<Employee[]>([]);

  const handleSortStatusChange = (status: DataTableSortStatus<Employee>) => {
    setPage(1);
    setSortStatus(status);
  };

  const editRecord = useCallback(({ firstName, lastName }: Employee) => {
    showNotification({
      withBorder: true,
      title: 'Editing record',
      message: `In a real application we could show a popup to edit ${firstName} ${lastName}, but this is just a demo, so we're not going to do that`,
    });
  }, []);

  const deleteRecord = useCallback(({ firstName, lastName }: Employee) => {
    showNotification({
      withBorder: true,
      color: 'red',
      title: 'Deleting record',
      message: `Should delete ${firstName} ${lastName}, but we're not going to, because this is just a demo`,
    });
  }, []);

  const deleteSelectedRecords = useCallback(() => {
    showNotification({
      withBorder: true,
      color: 'red',
      title: 'Deleting multiple records',
      message: `Should delete ${selectedRecords.length} records, but we're not going to do that because deleting data is bad... and this is just a demo anyway`,
    });
  }, [selectedRecords.length]);

  const sendMessage = useCallback(({ firstName, lastName }: Employee) => {
    showNotification({
      withBorder: true,
      title: 'Sending message',
      message: `A real application could send a message to ${firstName} ${lastName}, but this is just a demo and we're not going to do that because we don't have a backend`,
      color: 'green',
    });
  }, []);

  const renderActions: DataTableColumn<Employee>['render'] = (record) => (
    <Group gap={4} justify="right" wrap="nowrap">
      <ActionIcon
        size="sm"
        variant="transparent"
        color="green"
        onClick={(e) => {
          e.stopPropagation(); // 👈 prevent triggering the row click function
          openModal({
            title: `Send message to ${record.firstName} ${record.lastName}`,
            classNames: { header: classes.modalHeader, title: classes.modalTitle },
            children: (
              <>
                <TextInput mt="md" placeholder="Your message..." />
                <Group mt="md" gap="sm" justify="flex-end">
                  <Button variant="transparent" c="dimmed" onClick={() => closeAllModals()}>
                    Cancel
                  </Button>
                  <Button
                    color="green"
                    onClick={() => {
                      sendMessage(record);
                      closeAllModals();
                    }}
                  >
                    Send
                  </Button>
                </Group>
              </>
            ),
          });
        }}
      >
        <IconMessage size={16} />
      </ActionIcon>
      <ActionIcon
        size="sm"
        variant="transparent"
        onClick={(e) => {
          e.stopPropagation(); // 👈 prevent triggering the row click function
          editRecord(record);
        }}
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Group>
  );

  const rowExpansion: DataTableProps<Employee>['rowExpansion'] = {
    allowMultiple: true,
    content: ({ record: { id, sex, firstName, lastName, birthDate, department } }) => (
      <Flex p="xs" pl={rem(50)} gap="md" align="center">
        <Image
          radius="sm"
          w={50}
          h={50}
          alt={`${firstName} ${lastName}`}
          src={`https://xsgames.co/randomusers/avatar.php?g=${sex}&q=${id}`}
        />
        <Text size="sm" fs="italic">
          {firstName} {lastName}, born on {dayjs(birthDate).format('MMM D YYYY')}, works in {department.name} department
          at {department.company.name}.
          <br />
          His office address is {department.company.streetAddress}, {department.company.city},{' '}
          {department.company.state}.
        </Text>
      </Flex>
    ),
  };

  const handleContextMenu: DataTableProps<Employee>['onRowContextMenu'] = ({ record, event }) =>
    showContextMenu([
      {
        key: 'edit',
        icon: <IconEdit size={14} />,
        title: `Edit ${record.firstName} ${record.lastName}`,
        onClick: () => editRecord(record),
      },
      {
        key: 'delete',
        title: `Delete ${record.firstName} ${record.lastName}`,
        icon: <IconTrashX size={14} />,
        color: 'red',
        onClick: () => deleteRecord(record),
      },
      { key: 'divider' },
      {
        key: 'deleteMany',
        hidden: selectedRecords.length <= 1 || !selectedRecords.map((r) => r.id).includes(record.id),
        title: `Delete ${selectedRecords.length} selected records`,
        icon: <IconTrash size={14} />,
        color: 'red',
        onClick: deleteSelectedRecords,
      },
    ])(event);

  const now = dayjs();
  const aboveXs = (theme: MantineTheme) => `(min-width: ${theme.breakpoints.xs})`;

  const columns: DataTableProps<Employee>['columns'] = [
    {
      accessor: 'name',
      noWrap: true,
      sortable: true,
      render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
    {
      accessor: 'email',
      sortable: true,
    },
    {
      accessor: 'department.company.name',
      title: 'Company',
      noWrap: true,
      sortable: true,
      visibleMediaQuery: aboveXs,
    },
    {
      accessor: 'department.name',
      title: 'Department',
      sortable: true,
      visibleMediaQuery: aboveXs,
    },
    {
      accessor: 'department.company.city',
      title: 'City',
      noWrap: true,
      visibleMediaQuery: aboveXs,
    },
    {
      accessor: 'department.company.state',
      title: 'State',
      visibleMediaQuery: aboveXs,
    },
    {
      accessor: 'age',
      width: 80,
      textAlign: 'right',
      sortable: true,
      render: ({ birthDate }) => now.diff(birthDate, 'years'),
      visibleMediaQuery: aboveXs,
    },
    {
      accessor: 'actions',
      title: (
        <Center>
          <IconClick size={16} />
        </Center>
      ),
      width: '0%', // 👈 use minimal width
      render: renderActions,
    },
  ];

  return (
    <DataTable
      height="70dvh"
      minHeight={400}
      maxHeight={1000}
      withTableBorder
      highlightOnHover
      borderRadius="sm"
      withColumnBorders
      striped
      verticalAlign="top"
      pinLastColumn
      columns={columns}
      fetching={isFetching}
      records={data?.employees}
      page={page}
      onPageChange={setPage}
      totalRecords={data?.total}
      recordsPerPage={PAGE_SIZE}
      sortStatus={sortStatus}
      onSortStatusChange={handleSortStatusChange}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      rowExpansion={rowExpansion}
      onRowContextMenu={handleContextMenu}
      onScroll={hideContextMenu}
    />
  );
}
