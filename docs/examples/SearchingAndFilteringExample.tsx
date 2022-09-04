import { Box, Checkbox, Grid, TextInput } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { Search } from 'tabler-icons-react';
import { employees } from '~/data';

const initialRecords = employees.slice(0, 100);

export default function SearchingAndFilteringExample() {
  const [records, setRecords] = useState(initialRecords);

  const [query, setQuery] = useState('');
  const [veteransOnly, setVeteransOnly] = useState(false);
  const [debouncedQuery] = useDebouncedValue(query, 200);

  useEffect(() => {
    const now = dayjs();
    setRecords(
      initialRecords.filter(({ firstName, lastName, department, birthDate }) => {
        if (veteransOnly && now.diff(birthDate, 'years') < 40) {
          return false;
        }
        if (
          debouncedQuery !== '' &&
          !`${firstName} ${lastName} ${department.name} ${department.company.name}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false;
        }
        return true;
      })
    );
  }, [debouncedQuery, veteransOnly]);

  return (
    <>
      <Grid align="center" mb="md">
        <Grid.Col xs={8} sm={9}>
          <TextInput
            sx={{ flexBasis: '60%' }}
            placeholder="Search employees..."
            icon={<Search size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col xs={4} sm={3}>
          <Checkbox
            label="Over 40 years old"
            checked={veteransOnly}
            onChange={(e) => setVeteransOnly(e.currentTarget.checked)}
          />
        </Grid.Col>
      </Grid>
      <Box sx={{ height: 300 }}>
        <DataTable
          withBorder
          records={records}
          columns={[
            { accessor: 'name', render: ({ firstName, lastName }) => `${firstName} ${lastName}` },
            { accessor: 'department.name' },
            { accessor: 'department.company.name' },
            { accessor: 'birthDate', render: ({ birthDate }) => dayjs(birthDate).format('MMM DD YYYY') },
            { accessor: 'age', render: ({ birthDate }) => dayjs().diff(birthDate, 'y') },
          ]}
        />
      </Box>
    </>
  );
}
