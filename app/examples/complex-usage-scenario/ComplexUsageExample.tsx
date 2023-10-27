'use client';

import {
  ActionIcon,
  Button,
  Center,
  Flex,
  Group,
  Image,
  MantineTheme,
  Stack,
  Text,
  TextInput,
  rem,
} from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconChevronDown, IconClick, IconEdit, IconMessage, IconTrash, IconTrashX } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { DataTable, DataTableSortStatus } from '__PACKAGE__';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useContextMenu } from 'mantine-contextmenu';
import { useState } from 'react';
import { Employee } from '~/data';
import { getEmployeesAsync } from '~/data/async';
import classes from './ComplexUsageExample.module.css';

const PAGE_SIZE = 20;

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
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  const handleSortStatusChange = (status: DataTableSortStatus<Employee>) => {
    setPage(1);
    setSortStatus(status);
  };

  const toggleRecordExpansion = (id: string) => (e: React.MouseEvent) => {
    e.stopPropagation(); // 👈 prevent triggering the row click function
    setExpandedRecordIds((currentIds) =>
      currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [...currentIds, id]
    );
  };

  const now = dayjs();
  const aboveXs = (theme: MantineTheme) => `(min-width: ${theme.breakpoints.xs})`;

  return (
    <DataTable
      height={400}
      withTableBorder
      highlightOnHover
      borderRadius="sm"
      withColumnBorders
      striped
      verticalAlign="top"
      fetching={isFetching}
      columns={[
        {
          accessor: 'name',
          width: 150,
          ellipsis: true,
          sortable: true,
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
        },
        {
          accessor: 'email',
          sortable: true,
          visibleMediaQuery: aboveXs,
        },
        {
          accessor: 'department.company.name',
          title: 'Company',
          width: 150,
          sortable: true,
          visibleMediaQuery: aboveXs,
        },
        {
          accessor: 'department.name',
          title: 'Department',
          width: 130,
          sortable: true,
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
          render: ({ id, firstName, lastName }) => (
            <Group gap={4} justify="right" wrap="nowrap">
              <ActionIcon
                size="sm"
                variant="transparent"
                color="green"
                onClick={(e) => {
                  e.stopPropagation(); // 👈 prevent triggering the row click function
                  openModal({
                    title: `Send message to ${firstName} ${lastName}`,
                    classNames: {
                      header: classes.modalHeader,
                      title: classes.modalTitle,
                      content: classes.modalContent,
                    },
                    children: (
                      <>
                        <TextInput mt="md" placeholder="Your message..." />
                        <Group mt="md" justify="space-between">
                          <Button variant="default" onClick={() => closeAllModals()}>
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              showNotification({
                                withBorder: true,
                                title: 'Sending message',
                                message: `A real application could send a message to ${firstName} ${lastName}, but this is just a demo and we're not going to do that because we don't have a backend`,
                                color: 'green',
                              });
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
              <ActionIcon size="sm" variant="transparent" onClick={toggleRecordExpansion(id)}>
                <IconChevronDown
                  size={16}
                  className={clsx(classes.icon, { [classes.iconReverse]: expandedRecordIds.includes(id) })}
                />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      records={data?.employees}
      page={page}
      onPageChange={setPage}
      totalRecords={data?.total}
      recordsPerPage={PAGE_SIZE}
      sortStatus={sortStatus}
      onSortStatusChange={handleSortStatusChange}
      selectedRecords={selectedRecords}
      onSelectedRecordsChange={setSelectedRecords}
      rowExpansion={{
        trigger: 'never',
        allowMultiple: true,
        expanded: { recordIds: expandedRecordIds },
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
              {firstName} {lastName}, born on {dayjs(birthDate).format('MMM D YYYY')}, works in {department.name}{' '}
              department at {department.company.name}.
              <br />
              His office address is {department.company.streetAddress}, {department.company.city},{' '}
              {department.company.state}.
            </Text>
          </Flex>
        ),
      }}
      onRowClick={({ record: { firstName, lastName, birthDate } }) =>
        openModal({
          title: `${firstName} ${lastName}`,
          classNames: { header: classes.modalHeader, title: classes.modalTitle, content: classes.modalContent },
          children: (
            <>
              <Stack gap={4} my="md">
                <Group>
                  <Text size="sm" fw={700} c="dimmed" w={80}>
                    First name
                  </Text>
                  <Text size="sm">{firstName}</Text>
                </Group>
                <Group>
                  <Text size="sm" fw={700} c="dimmed" w={80}>
                    Last name
                  </Text>
                  <Text size="sm">{lastName}</Text>
                </Group>
                <Group>
                  <Text size="sm" fw={700} c="dimmed" w={80}>
                    Birth date
                  </Text>
                  <Text size="sm">{dayjs(birthDate).format('MMMM DD, YYYY')}</Text>
                </Group>
              </Stack>
              <Button fullWidth onClick={() => closeAllModals()}>
                Close
              </Button>
            </>
          ),
        })
      }
      onRowContextMenu={({ record: { id, firstName, lastName }, event }) =>
        showContextMenu([
          {
            key: 'edit',
            icon: <IconEdit size={14} />,
            title: `Edit ${firstName} ${lastName}`,
            onClick: () =>
              showNotification({
                withBorder: true,
                title: 'Editing record',
                message: `In a real application we should edit ${firstName} ${lastName}, but this is just a demo`,
              }),
          },
          {
            key: 'delete',
            title: `Delete ${firstName} ${lastName}`,
            icon: <IconTrashX size={14} />,
            color: 'red',
            onClick: () =>
              showNotification({
                withBorder: true,
                color: 'red',
                title: 'Deleting record',
                message: `Should delete ${firstName} ${lastName}, but we're not going to, because this is just a demo`,
              }),
          },
          { key: 'divider' },
          {
            key: 'deleteMany',
            hidden: selectedRecords.length <= 1 || !selectedRecords.map((r) => r.id).includes(id),
            title: `Delete ${selectedRecords.length} selected records`,
            icon: <IconTrash size={14} />,
            color: 'red',
            onClick: () =>
              showNotification({
                withBorder: true,
                color: 'red',
                title: 'Deleting multiple records',
                message: `Should delete ${selectedRecords.length} records, but we're not going to do that because deleting data is bad`,
              }),
          },
        ])(event)
      }
      onScroll={hideContextMenu}
    />
  );
}
