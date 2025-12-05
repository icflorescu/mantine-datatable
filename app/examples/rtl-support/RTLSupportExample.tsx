'use client';

import {
  ActionIcon,
  Box,
  Button,
  DirectionProvider,
  Group,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core';
import { IconColumns3, IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { DataTable, useDataTableColumns, type DataTableSortStatus } from '__PACKAGE__';
import { useMemo, useState } from 'react';
import { companies, employees, type Employee } from '~/data';

// Example 1: Basic table without pinned columns
export function RTLBasicExample({ direction }: { direction: 'ltr' | 'rtl' }) {
  return (
    <DirectionProvider key={`basic-${direction}`} initialDirection={direction} detectDirection={false}>
      <Box dir={direction}>
        <DataTable
          withTableBorder
          withColumnBorders
          records={companies.slice(0, 5)}
          columns={[
            { accessor: 'name', width: 200 },
            { accessor: 'streetAddress', width: 200 },
            { accessor: 'city', width: 150 },
            { accessor: 'state', width: 100 },
          ]}
        />
      </Box>
    </DirectionProvider>
  );
}

// Example 2: With column dragging
export function RTLDraggingExample({ direction }: { direction: 'ltr' | 'rtl' }) {
  const key = 'rtl-dragging-example';

  const { effectiveColumns, resetColumnsOrder } = useDataTableColumns({
    key,
    columns: [
      { accessor: 'name', width: 200, draggable: true },
      { accessor: 'streetAddress', width: 250, draggable: true },
      { accessor: 'city', width: 150, draggable: true },
      { accessor: 'state', width: 100 },
    ],
  });

  return (
    <DirectionProvider key={`dragging-${direction}`} initialDirection={direction} detectDirection={false}>
      <Box dir={direction}>
        <Stack gap="xs">
          <Group gap="xs">
            <Button
              size="xs"
              variant="light"
              leftSection={<IconColumns3 size={16} />}
              onClick={resetColumnsOrder}
            >
              Reset order
            </Button>
          </Group>
          <DataTable
            withTableBorder
            withColumnBorders
            storeColumnsKey={key}
            records={companies.slice(0, 8)}
            columns={effectiveColumns}
          />
        </Stack>
      </Box>
    </DirectionProvider>
  );
}

// Example 3: With pinned columns, selection, sorting, pagination, and resizing
export function RTLFullFeaturedExample({ direction }: { direction: 'ltr' | 'rtl' }) {
  const PAGE_SIZES = [5, 10, 20];
  const [page, setPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(PAGE_SIZES[0]);
  const [selectedRecords, setSelectedRecords] = useState<Employee[]>([]);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Employee>>({
    columnAccessor: 'firstName',
    direction: 'asc',
  });

  const sortedRecords = useMemo(() => {
    const sorted = [...employees].sort((a, b) => {
      const accessor = sortStatus.columnAccessor as keyof Employee;
      const aValue = a[accessor];
      const bValue = b[accessor];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortStatus.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });
    return sorted;
  }, [sortStatus]);

  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * recordsPerPage;
    return sortedRecords.slice(start, start + recordsPerPage);
  }, [sortedRecords, page, recordsPerPage]);

  return (
    <DirectionProvider key={`full-${direction}`} initialDirection={direction} detectDirection={false}>
      <Box dir={direction}>
        <DataTable
          withTableBorder
          withColumnBorders
          striped
          highlightOnHover
          pinFirstColumn
          pinLastColumn
          minHeight={300}
          columns={[
            {
              accessor: 'firstName',
              title: 'First Name',
              sortable: true,
              resizable: true,
              width: 120,
            },
            {
              accessor: 'lastName',
              title: 'Last Name',
              sortable: true,
              resizable: true,
              width: 120,
            },
            {
              accessor: 'email',
              sortable: true,
              resizable: true,
              width: 220,
            },
            {
              accessor: 'department.name',
              title: 'Department',
              resizable: true,
              width: 150,
            },
            {
              accessor: 'department.company.name',
              title: 'Company',
              resizable: true,
              width: 180,
            },
            {
              accessor: 'department.company.city',
              title: 'City',
              resizable: true,
              width: 120,
            },
            {
              accessor: 'actions',
              title: 'Actions',
              width: 100,
              render: () => (
                <Group gap={4} justify="center" wrap="nowrap">
                  <ActionIcon size="sm" variant="subtle" color="blue">
                    <IconEye size={16} />
                  </ActionIcon>
                  <ActionIcon size="sm" variant="subtle" color="green">
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon size="sm" variant="subtle" color="red">
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
          records={paginatedRecords}
          totalRecords={employees.length}
          recordsPerPage={recordsPerPage}
          onRecordsPerPageChange={setRecordsPerPage}
          recordsPerPageOptions={PAGE_SIZES}
          page={page}
          onPageChange={setPage}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
        />
      </Box>
    </DirectionProvider>
  );
}

// Main example component with direction toggle
export function RTLSupportExample() {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  return (
    <Stack gap="xl">
      <Group justify="center">
        <Text size="sm" fw={500}>
          Direction:
        </Text>
        <SegmentedControl
          value={direction}
          onChange={(value) => setDirection(value as 'ltr' | 'rtl')}
          data={[
            { label: 'LTR (Left to Right)', value: 'ltr' },
            { label: 'RTL (Right to Left)', value: 'rtl' },
          ]}
        />
      </Group>

      <Stack gap="md">
        <Text fw={500}>Basic table</Text>
        <RTLBasicExample direction={direction} />
      </Stack>

      <Stack gap="md">
        <Text fw={500}>Column dragging</Text>
        <RTLDraggingExample direction={direction} />
      </Stack>

      <Stack gap="md">
        <Text fw={500}>Full-featured: pinned columns, selection, sorting, pagination, resizing</Text>
        <RTLFullFeaturedExample direction={direction} />
      </Stack>
    </Stack>
  );
}
