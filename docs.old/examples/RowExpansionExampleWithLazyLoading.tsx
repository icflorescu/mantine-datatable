import { Center, createStyles, Group, LoadingOverlay, Stack, Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { companies, countCompanyDepartmentsAsync, countCompanyEmployeesAsync } from '~/data';
import useIsMounted from '~/lib/useIsMounted';

const records = companies.slice(0, 5);

// example-start with-lazy-loading-row-expansion
const useStyles = createStyles((theme) => ({
  details: {
    position: 'relative',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },
  label: { width: 180 },
  number: { width: 50 },
}));

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

  const { classes } = useStyles();
  return (
    <Center className={classes.details} p="sm">
      <Stack spacing={6}>
        <LoadingOverlay visible={loading} />
        <Group spacing={6}>
          <Text className={classes.label}>Number of departments:</Text>
          <Text className={classes.number} align="right">
            {numberOfDepartments ?? 'loading...'}
          </Text>
        </Group>
        <Group spacing={6}>
          <Text className={classes.label}>Number of employees:</Text>
          <Text className={classes.number} align="right">
            {numberOfEmployees ?? 'loading...'}
          </Text>
        </Group>
      </Stack>
    </Center>
  );
}
// example-end

export default function RowExpansionExampleWithLazyLoading() {
  // example-start with-lazy-loading-table
  return (
    <DataTable
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={records}
      rowExpansion={{ content: ({ record }) => <CompanyDetails companyId={record.id} /> }}
    />
  );
  // example-end
}
