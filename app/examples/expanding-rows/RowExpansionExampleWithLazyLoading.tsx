'use client';

import { Box, Center, Group, LoadingOverlay, Stack } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { useEffect, useState } from 'react';
import { companies } from '~/data';
import { countCompanyDepartmentsAsync, countCompanyEmployeesAsync } from '~/data/async';
import { useIsMounted } from '~/lib/examples';
import classes from './RowExpansionExampleWithLazyLoading.module.css';

const records = companies.slice(0, 5);

// example-start
function CompanyDetails({ companyId }: { companyId: string }) {
  const isMounted = useIsMounted();
  const [loading, setLoading] = useState(true);
  const [numberOfDepartments, setNumberOfDepartments] = useState<number | null>(null);
  const [numberOfEmployees, setNumberOfEmployees] = useState<number | null>(null);

  useEffect(() => {
    // simulate expensive async loading operation
    (async () => {
      setLoading(true);
      const delay = { min: 800, max: 1200 };
      const [departments, employees] = await Promise.all([
        countCompanyDepartmentsAsync({ companyId, delay }),
        countCompanyEmployeesAsync({ companyId, delay }),
      ]);
      if (isMounted()) {
        setNumberOfDepartments(departments);
        setNumberOfEmployees(employees);
        setLoading(false);
      }
    })();
  }, [companyId, isMounted]);

  return (
    <Center className={classes.details} p="sm">
      <Stack gap={6}>
        <LoadingOverlay visible={loading} />
        <Group gap={6}>
          <Box className={classes.label}>Number of departments:</Box>
          <Box className={classes.number} ta="right">
            {numberOfDepartments ?? 'loading...'}
          </Box>
        </Group>
        <Group gap={6}>
          <Box className={classes.label}>Number of employees:</Box>
          <Box className={classes.number} ta="right">
            {numberOfEmployees ?? 'loading...'}
          </Box>
        </Group>
      </Stack>
    </Center>
  );
}

export function RowExpansionExampleWithLazyLoading() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      rowExpansion={{ content: ({ record }) => <CompanyDetails companyId={record.id} /> }}
    />
  );
}
// example-end
