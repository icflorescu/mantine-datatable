import { DataTable } from 'mantine-datatable';
import { companies } from '~/data';

export default function ColumnGroupingExample() {
  return (
    <DataTable
      withBorder
      withColumnBorders
      records={companies}
      groups={[
        {
          id: 'company',
          columns: [
            { accessor: 'name' },
            { accessor: 'missionStatement', visibleMediaQuery: (theme) => `(min-width: ${theme.breakpoints.md})` },
          ],
        },
        {
          id: 'contact-info',
          title: <i>Contact info</i>,
          columns: [{ accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }],
        },
        {
          id: 'other',
          columns: [{ accessor: 'id', hidden: true }],
        },
        {
          id: 'empty-group',
          title: 'Empty group',
          columns: [],
        },
      ]}
    />
  );
}
