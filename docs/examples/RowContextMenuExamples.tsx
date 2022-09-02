import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { Edit, Send, Trash, X } from 'tabler-icons-react';
import companies from '~/data/companies.json';

export function RowContextMenuExample1() {
  return (
    // example-start 1
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: (record) => [
          {
            key: 'edit',
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
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
    // example-end
  );
}

export function RowContextMenuExample2() {
  return (
    // example-start 2
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        trigger: 'click',
        items: (record) => [
          // example-skip
          {
            key: 'edit',
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
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
    // example-end
  );
}

export function RowContextMenuExample3() {
  return (
    // example-start 3
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        hidden: true,
        items: (record) => [
          // example-skip
          {
            key: 'edit',
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
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
    // example-end
  );
}

export function RowContextMenuExample4() {
  return (
    // example-start 4
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        // hide the context menu for the 1st row
        hidden: (record) => companies.indexOf(record) === 0,
        items: (record) => [
          // example-skip
          {
            key: 'edit',
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
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
    // example-end
  );
}

export function RowContextMenuExample5() {
  return (
    // example-start 5
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: (record) => [
          // example-skip
          {
            key: 'edit',
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          // example-resume
          {
            key: 'delete',
            color: 'red',
            // disable this item for the 1st row
            disabled: companies.indexOf(record) === 0,
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          // example-skip
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
    // example-end
  );
}

export function RowContextMenuExample6() {
  return (
    // example-start 6
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: (record) => [
          // example-skip
          {
            key: 'edit',
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          // example-resume
          {
            key: 'delete',
            color: 'red',
            // hide this item for the 1st row
            hidden: companies.indexOf(record) === 0,
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          // example-skip
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
    // example-end
  );
}

export function RowContextMenuExample7() {
  return (
    // example-start 7
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: (record) => [
          {
            key: 'edit',
            icon: <Edit size={16} />,
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            icon: <Trash size={16} />,
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
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
    // example-end
  );
}

export function RowContextMenuExample8() {
  return (
    // example-start 8
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: (record) => [
          // example-skip
          {
            key: 'edit',
            icon: <Edit size={16} />,
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          // example-resume
          {
            key: 'delete',
            color: 'red',
            // set a specific icon for the 1st row
            icon: companies.indexOf(record) === 0 ? <X size={16} /> : <Trash size={16} />,
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          // example-skip
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            icon: <Send size={16} />,
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
          // example-resume
        ],
      }}
    />
    // example-end
  );
}

export function RowContextMenuExample9() {
  return (
    // example-start 9
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        items: (record) => [
          // example-skip
          {
            key: 'edit',
            icon: <Edit size={16} />,
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          // example-resume
          {
            key: 'delete',
            // set a specific color for the 1st row
            color: companies.indexOf(record) === 0 ? 'orange' : 'red',
            icon: <Trash size={16} />,
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          // example-skip
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            icon: <Send size={16} />,
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
          // example-resume
        ],
      }}
    />
    // example-end
  );
}

export function RowContextMenuExample10() {
  return (
    // example-start 10
    <DataTable
      withBorder
      columns={[{ accessor: 'name' }, { accessor: 'streetAddress' }, { accessor: 'city' }, { accessor: 'state' }]}
      records={companies}
      rowContextMenu={{
        shadow: 'xl', // custom shadow
        borderRadius: 'md', // custom border radius
        items: (record) => [
          {
            key: 'edit',
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          // add a divider between `delete` and `sendMessage` items
          { key: 'divider1', divider: true },
          {
            key: 'sendMessage',
            onClick: () => {
              showNotification({ message: 'Should send a message to this company' });
            },
          },
        ],
      }}
    />
    // example-end
  );
}
