'use client';

import { ActionIcon, Button, Checkbox, MultiSelect, Stack, TextInput } from '@mantine/core';
import { DatePicker, type DatesRangeValue } from '@mantine/dates';
import { useDebouncedValue } from '@mantine/hooks';
import { IconSearch, IconX } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { employees } from '~/data';

const initialRecords = employees.slice(0, 100);

export function SearchingAndFilteringExample() {
  const [records, setRecords] = useState(initialRecords);

  const departments = useMemo(() => {
    const departments = new Set(employees.map((e) => e.department.name));
    return [...departments];
  }, []);

  const [query, setQuery] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [birthdaySearchRange, setBirthdaySearchRange] = useState<DatesRangeValue>();
  const [seniors, setSeniors] = useState(false);
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    setRecords(
      initialRecords.filter(({ firstName, lastName, department, birthDate }) => {
        if (
          debouncedQuery !== '' &&
          !`${firstName} ${lastName}`.toLowerCase().includes(debouncedQuery.trim().toLowerCase())
        )
          return false;

        if (
          birthdaySearchRange &&
          birthdaySearchRange[0] &&
          birthdaySearchRange[1] &&
          (dayjs(birthdaySearchRange[0]).isAfter(birthDate, 'day') ||
            dayjs(birthdaySearchRange[1]).isBefore(birthDate, 'day'))
        )
          return false;

        if (selectedDepartments.length && !selectedDepartments.some((d) => d === department.name)) return false;

        if (seniors && dayjs().diff(birthDate, 'y') < 70) return false;

        return true;
      })
    );
  }, [debouncedQuery, birthdaySearchRange, selectedDepartments, seniors]);

  return (
    <DataTable
      height={300}
      withTableBorder
      withColumnBorders
      records={records}
      columns={[
        {
          accessor: 'name',
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
          filter: (
            <TextInput
              label="Employees"
              description="Show employees whose names include the specified text"
              placeholder="Search employees..."
              leftSection={<IconSearch size={16} />}
              rightSection={
                <ActionIcon size="sm" variant="transparent" c="dimmed" onClick={() => setQuery('')}>
                  <IconX size={14} />
                </ActionIcon>
              }
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
          ),
          filtering: query !== '',
        },
        {
          accessor: 'department.name',
          filter: (
            <MultiSelect
              label="Departments"
              description="Show all employees working at the selected departments"
              data={departments}
              value={selectedDepartments}
              placeholder="Search departments…"
              onChange={setSelectedDepartments}
              leftSection={<IconSearch size={16} />}
              comboboxProps={{ withinPortal: false }}
              clearable
              searchable
            />
          ),
          filtering: selectedDepartments.length > 0,
        },
        { accessor: 'department.company.name', title: 'Company' },
        {
          accessor: 'birthDate',
          textAlign: 'right',
          render: ({ birthDate }) => dayjs(birthDate).format('MMM DD YYYY'),
          filter: ({ close }) => (
            <Stack>
              <DatePicker
                maxDate={new Date()}
                type="range"
                value={birthdaySearchRange}
                onChange={setBirthdaySearchRange}
              />
              <Button
                disabled={!birthdaySearchRange}
                variant="light"
                onClick={() => {
                  setBirthdaySearchRange(undefined);
                  close();
                }}
              >
                Clear
              </Button>
            </Stack>
          ),
          filtering: Boolean(birthdaySearchRange),
        },
        {
          accessor: 'age',
          textAlign: 'right',
          render: ({ birthDate }) => dayjs().diff(birthDate, 'y'),
          filter: () => (
            <Checkbox
              label="Seniors"
              description="Show employees who are older than 70 years"
              checked={seniors}
              onChange={() => {
                setSeniors((current) => !current);
              }}
            />
          ),
        },
      ]}
    />
  );
}
