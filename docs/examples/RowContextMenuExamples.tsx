import { Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { showNotification } from '@mantine/notifications';
import { IconAppWindow, IconEdit, IconSend, IconTrash, IconX } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
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
        // 👇 hide the context menu for the 1st row
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
            // 👇 hide this item for the 1st row
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
            icon: <IconEdit size={16} />,
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          {
            key: 'delete',
            color: 'red',
            icon: <IconTrash size={16} />,
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            icon: <IconSend size={16} />,
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
            icon: <IconEdit size={16} />,
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          // example-resume
          {
            key: 'delete',
            color: 'red',
            // 👇 set a specific icon for the 1st row
            icon: companies.indexOf(record) === 0 ? <IconX size={16} /> : <IconTrash size={16} />,
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          // example-skip
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            icon: <IconSend size={16} />,
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
            icon: <IconEdit size={16} />,
            onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
          },
          // example-resume
          {
            key: 'delete',
            // 👇 set a specific color for the 1st row
            color: companies.indexOf(record) === 0 ? 'orange' : 'red',
            icon: <IconTrash size={16} />,
            title: `Delete company ${record.name}`,
            onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
          },
          // example-skip
          {
            key: 'sendMessage',
            title: 'Send message to company HQ',
            icon: <IconSend size={16} />,
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
        shadow: 'xl', // 👈 custom shadow
        borderRadius: 'md', // 👈 custom border radius
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
          // 👇 add a divider between `delete` and `sendMessage` items
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

export function RowContextMenuExampleInsideModal() {
  return (
    // example-start inside-modal
    <Button
      leftIcon={<IconAppWindow size={16} />}
      onClick={() =>
        modals.open({
          title: 'Right-click on a row',
          children: (
            <DataTable
              height={300}
              withBorder
              borderRadius="sm"
              columns={[
                { accessor: 'name', title: 'Company name' },
                { accessor: 'city', textAlignment: 'right' },
              ]}
              records={companies}
              rowContextMenu={{
                zIndex: 202, // 👈 make sure the context menu is above the modal
                // example-skip items
                items: (record) => [
                  {
                    key: 'edit',
                    icon: <IconEdit size={16} />,
                    onClick: () => showNotification({ message: `Should edit company ${record.name}` }),
                  },
                  {
                    key: 'delete',
                    icon: <IconTrash size={16} />,
                    color: 'red',
                    onClick: () => showNotification({ color: 'red', message: `Should delete company ${record.name}` }),
                  },
                  { key: 'divider', divider: true },
                  {
                    key: 'sendMessage',
                    icon: <IconSend size={16} />,
                    onClick: () => {
                      showNotification({ message: 'Should send a message to this company' });
                    },
                  },
                ],
              }}
              // example-resume
            />
          ),
        })
      }
    >
      Open modal
    </Button>
    // example-end
  );
}
