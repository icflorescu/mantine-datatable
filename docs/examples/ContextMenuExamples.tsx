import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { Edit, Send, Trash, X } from 'tabler-icons-react';
import companies from '~/data/companies.json';

export function ContextMenuExample1() {
  // example-start 1
  // ...
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: [
          {
            key: 'edit',
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
        ],
      }}
    />
  );
  // example-end
}

export function ContextMenuExample2() {
  // example-start 2
  // ...
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        disabled: true,
        items: [
          // example-skip
          {
            key: 'edit',
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
          // example-resume
        ],
      }}
    />
  );
  // example-end
}

export function ContextMenuExample3() {
  // example-start 3
  // ...
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        disabled: (record) => companies.indexOf(record) === 0,
        items: [
          // example-skip
          {
            key: 'edit',
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
          // example-resume
        ],
      }}
    />
  );
  // example-end
}

export function ContextMenuExample4() {
  // example-start 4
  // ...
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: [
          {
            key: 'edit',
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            disabled: (record) => companies.indexOf(record) === 0,
            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
        ],
      }}
    />
  );
  // example-end
}

export function ContextMenuExample5() {
  // example-start 5
  // ...
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: [
          {
            key: 'edit',
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            hidden: (record) => companies.indexOf(record) === 0,
            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
        ],
      }}
    />
  );
  // example-end
}

export function ContextMenuExample6() {
  // example-start 6
  // ...
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: [
          {
            key: 'edit',
            icon: <Edit size={16} />,
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            icon: <Trash size={16} />,
            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            icon: <Send size={16} />,
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
        ],
      }}
    />
  );
  // example-end
}

export function ContextMenuExample7() {
  // example-start 7
  // ...
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: [
          {
            key: 'edit',
            icon: <Edit size={16} />,
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            icon: (record) => (companies.indexOf(record) === 0 ? <X size={16} /> : <Trash size={16} />),
            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            icon: <Send size={16} />,
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
        ],
      }}
    />
  );
  // example-end
}

export function ContextMenuExample8() {
  // example-start 8
  // ...
  return (
    <DataTable
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: [
          {
            key: 'edit',
            icon: <Edit size={16} />,
            onClick: (record) => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: (record) => (companies.indexOf(record) === 0 ? 'orange' : 'red'),
            icon: <Trash size={16} />,
            title: (record) => `Delete company ${record.name}`,
            onClick: (record) => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            icon: <Send size={16} />,
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
        ],
      }}
    />
  );
  // example-end
}
