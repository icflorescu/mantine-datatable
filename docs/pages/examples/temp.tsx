import { Box, Center, Container, SegmentedControl, useMantineTheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useState } from 'react';
import { Edit, Eye, Mouse, Table, Trash, TrashX } from 'tabler-icons-react';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageTitle from '~/components/PageTitle';
import { EmployeeData, getEmployees } from '~/data';

const PATH = 'examples/temp';
const recordsPerPage = 100;

export default function TempExamplePage() {
  const [scrollable, setScrollable] = useLocalStorage({
    key: 'table-scrollable',
    defaultValue: true,
    getInitialValueInEffect: true,
  });

  const [page, setPage] = useState(1);
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ propertyName: 'name', direction: 'asc' });

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    setPage(1);
    setSortStatus(status);
  };

  const { data, isFetching } = useQuery(['employees', sortStatus.propertyName, sortStatus.direction, page], async () =>
    getEmployees({ recordsPerPage, page, sortStatus })
  );

  const [selectedRecords, setSelectedRecords] = useState<EmployeeData[]>([]);

  const now = dayjs();

  const {
    breakpoints: { xs: xsBreakpoint },
  } = useMantineTheme();
  const aboveXsMediaQuery = `(min-width: ${xsBreakpoint}px)`;

  return (
    <Container>
      <PageTitle of={PATH} />
      <SegmentedControl
        value={scrollable ? 'yes' : 'no'}
        onChange={() => setScrollable((s) => !s)}
        data={[
          {
            value: 'yes',
            label: (
              <Center>
                <Mouse size={16} />
                <Box ml={10}>Scrollable</Box>
              </Center>
            ),
          },
          {
            value: 'no',
            label: (
              <Center>
                <Table size={16} />
                <Box ml={10}>Auto-height</Box>
              </Center>
            ),
          },
        ]}
      />
      <ExampleContainer>
        <Box sx={{ height: scrollable ? 600 : undefined }}>
          <DataTable
            minHeight={300}
            striped
            withVerticalBorders
            fetching={isFetching}
            columns={[
              {
                propertyName: 'name',
                ellipsis: true,
                sortable: true,
                render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
              },
              {
                propertyName: 'email',
                sortable: true,
                width: 200,
                ellipsis: true,
                visibleMediaQuery: aboveXsMediaQuery,
              },
              {
                propertyName: 'department.company.name',
                title: 'Company',
                width: 150,
                ellipsis: true,
                sortable: true,
                visibleMediaQuery: aboveXsMediaQuery,
              },
              {
                propertyName: 'department.name',
                title: 'Department',
                width: 100,
                sortable: true,
                visibleMediaQuery: aboveXsMediaQuery,
              },
              {
                propertyName: 'age',
                textAlign: 'right',
                sortable: true,
                render: ({ birthDate }) => now.diff(birthDate, 'y'),
              },
            ]}
            expandedColumnPropertyName="name"
            records={data?.employees}
            page={page}
            onPageChange={setPage}
            totalRecords={data?.total}
            recordsPerPage={recordsPerPage}
            sortStatus={sortStatus}
            onSortStatusChange={handleSortStatusChange}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={setSelectedRecords}
            rowMenu={{
              items: [
                {
                  key: 'edit',
                  icon: <Edit size={14} />,
                  title: ({ firstName, lastName }) => `Edit ${firstName} ${lastName}`,
                  onClick: console.log,
                },
                { key: 'view', icon: <Eye size={14} />, onClick: console.log },
                {
                  key: 'delete',
                  title: ({ firstName, lastName }) => `Delete ${firstName} ${lastName}`,
                  icon: <TrashX size={14} />,
                  color: 'red',
                  onClick: console.log,
                },
                {
                  key: 'deleteAll',
                  hidden: ({ id }) => selectedRecords.length <= 1 || !selectedRecords.map((r) => r.id).includes(id),
                  title: () => `Delete ${selectedRecords.length} selected records`,
                  icon: <Trash size={14} />,
                  color: 'red',
                  onClick: console.log,
                },
              ],
            }}
          />
        </Box>
      </ExampleContainer>
      <PageNavigation of={PATH} />
    </Container>
  );
}
