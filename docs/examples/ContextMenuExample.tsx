import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { Edit, Send, Trash } from 'tabler-icons-react';
import companies from '~/data/companies.json';

export enum ContextMenuExampleStatus {
  enabled = 'enabled',
  disabled = 'disabled',
  disabledForTheFirstRow = 'disabledForTheFirstRow',
}

export default function ContextMenuExample({ exampleStatus }: { exampleStatus: ContextMenuExampleStatus }) {
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        disabled:
          exampleStatus === ContextMenuExampleStatus.disabled
            ? true
            : exampleStatus === ContextMenuExampleStatus.disabledForTheFirstRow
            ? (record) => companies.indexOf(record) === 0
            : false,
        items: [
          // this item doesn't have an expressly specified title, so one will be created automatically
          // based on item's key
          {
            key: 'edit',
            // the item icon is optional
            icon: <Edit size={16} />,
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },

          {
            key: 'delete',
            color: 'red',
            icon: <Trash size={16} />,
            // we could also customize the icon based on record's attributes
            // icon: (record) => (companies.indexOf(record) === 1 ? <Trash size={16} /> : <TrashX size={16} />),

            // we could hide an item based on record's attributes
            // hidden: (record) => companies.indexOf(record) === 2,

            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },

          {
            key: 'sendMessage',
            // disabled item
            disabled: true,
            icon: <Send size={16} />,
            // ...or we could disable the item based on the current record's attributes
            // disabled: (record) => companies.indexOf(record) === 3,
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
        ],
      }}
    />
  );
}
