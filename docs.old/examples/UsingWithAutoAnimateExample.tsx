import { faker } from '@faker-js/faker';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ActionIcon, Box, Button, Center, Group } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconArrowsUpDown, IconTrash, IconTrashX } from '@tabler/icons-react';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';

type User = {
  id: string;
  name: string;
  age: number;
};

const createUser = (): User => ({
  id: faker.datatype.uuid(),
  name: faker.name.fullName(),
  age: faker.datatype.number({ min: 18, max: 65 }),
});

export default function UsingWithAutoAnimateExample() {
  const [records, setRecords] = useState<User[]>([]);

  useEffect(() => {
    setRecords(Array.from({ length: 3 }, createUser));
  }, []);

  const handleAdd = () => {
    setRecords((current) => [...current, createUser()]);
  };

  const moveUserUp = (index: number) => {
    setRecords((current) => {
      const copy = [...current];
      const user = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = user;
      return copy;
    });
  };

  const moveUserDown = (index: number) => {
    setRecords((current) => {
      const copy = [...current];
      const user = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = user;
      return copy;
    });
  };

  const deleteUser = (id: string) => {
    setRecords((current) => current.filter((user) => user.id !== id));
  };

  const handleSortByAge = () => {
    setRecords((current) => [...current].sort((a, b) => a.age - b.age));
  };

  const handleSortByName = () => {
    setRecords((current) => [...current].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleDeleteAll = () => {
    setRecords([]);
  };

  // example-start
  // ...

  const [bodyRef] = useAutoAnimate<HTMLTableSectionElement>();

  return (
    <>
      <DataTable
        mb="xl"
        withBorder
        minHeight={160}
        columns={[
          {
            accessor: 'move',
            title: (
              <Center>
                <IconArrowsUpDown size={14} />
              </Center>
            ),
            render: (_, index) => (
              <Box display="flex">
                <ActionIcon
                  variant="transparent"
                  color="green"
                  disabled={index === 0}
                  onClick={() => moveUserUp(index)}
                >
                  <IconArrowUp size={18} />
                </ActionIcon>
                <ActionIcon
                  variant="transparent"
                  color="green"
                  disabled={index === records.length - 1}
                  onClick={() => moveUserDown(index)}
                >
                  <IconArrowDown size={18} />
                </ActionIcon>
              </Box>
            ),
          },
          { accessor: 'name', width: '100%' },
          { accessor: 'age', textAlignment: 'right' },
          {
            accessor: 'delete',
            title: (
              <ActionIcon variant="transparent" color="red" disabled={records.length === 0} onClick={handleDeleteAll}>
                <IconTrashX size={18} />
              </ActionIcon>
            ),
            render: ({ id }) => (
              <ActionIcon variant="transparent" color="red" onClick={() => deleteUser(id)}>
                <IconTrash size={18} />
              </ActionIcon>
            ),
          },
        ]}
        records={records}
        bodyRef={bodyRef}
      />
      {/* example-skip */}
      <Group>
        <Button onClick={handleAdd}>Add new user</Button>
        <Button color="green" onClick={handleSortByName}>
          Sort by name
        </Button>
        <Button color="green" onClick={handleSortByAge}>
          Sort by age
        </Button>
        <Button color="red" onClick={handleDeleteAll}>
          Delete all
        </Button>
      </Group>
      {/* example-resume */}
    </>
  );
  // example-end
}
