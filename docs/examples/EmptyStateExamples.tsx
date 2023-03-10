import { Box, Image, Stack, Text } from '@mantine/core';
import { IconMoodSad } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';

export function EmptyStateExampleStandard() {
  // example-start standard
  return (
    <DataTable
      minHeight={150}
      records={[]}
      // example-skip
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}

export function EmptyStateExampleCustomText() {
  // example-start custom-text
  return (
    <DataTable
      minHeight={150}
      records={[]}
      noRecordsText="No records to show"
      // example-skip
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}

export function EmptyStateExampleCustomIconAndText() {
  // example-start custom-icon-and-text
  return (
    <DataTable
      minHeight={150}
      records={[]}
      noRecordsIcon={
        <Box
          p={4}
          mb={4}
          sx={(theme) => ({
            fontSize: 0,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
            border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4]}`,
            borderRadius: theme.radius.md,
            background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
          })}
        >
          <IconMoodSad size={36} strokeWidth={1.5} />
        </Box>
      }
      noRecordsText="No records found"
      // example-skip
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}

export function EmptyStateExampleCustomContent() {
  // example-start custom-content
  return (
    <DataTable
      minHeight={280}
      records={[]}
      emptyState={
        <Stack align="center" spacing="xs">
          <Text color="dimmed" size="sm">
            No data found...
          </Text>
          <Image
            width={200}
            radius="md"
            src="https://images.unsplash.com/photo-1577460551100-907ba84418ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
            alt="No data found"
            sx={{ filter: 'grayscale(1)' }}
          />
        </Stack>
      }
      // example-skip
      withBorder
      withColumnBorders
      columns={[{ accessor: 'name' }, { accessor: 'email' }]}
      // example-resume
    />
  );
  // example-end
}
