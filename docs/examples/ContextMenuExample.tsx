import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import companies from '~/data/companies.json';

export default function ContextMenuExample() {
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        // we could entirely disable the context menu for a specific record
        // hidden: (record) => companies.indexOf(record) === 0,
        items: [
          // this item doesn't have an expressly specified title, so one will be created automatically
          // based on item's key
          {
            key: 'edit',

            // we could also set an icon if we wanted
            // icon: <Edit size={16} />,
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },

          {
            key: 'Delete',
            color: 'red',
            // we could also customize the icon based on record's attributes
            // icon: (record) => (companies.indexOf(record) === 1 ? <Trash size={16} /> : <TrashX size={16} />),

            // we could hide an item based on record's attributes
            // hidden: (record) => companies.indexOf(record) === 2,

            // we could disable the item for all records
            // disabled: true,
            // ...or based on the current record's attributes
            // disabled: (record) => companies.indexOf(record) === 3,

            title: (record) => `Delete company ${record.name}`,

            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
        ],
      }}
    />
  );
}
