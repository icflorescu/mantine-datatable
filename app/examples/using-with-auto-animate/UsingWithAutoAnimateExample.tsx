'use client';

import { faker } from '@faker-js/faker';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ActionIcon, Box, Button, Center, Paper } from '@mantine/core';
import { IconArrowDown, IconArrowUp, IconArrowsUpDown, IconTrash, IconTrashX } from '@tabler/icons-react';
import { DataTable } from '__PACKAGE__';
import { useEffect, useState } from 'react';
import classes from './UsingWithAutoAnimateExample.module.css';

type User = {
  id: string;
  name: string;
  age: number;
};

const createUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  age: faker.number.int({ min: 18, max: 65 }),
});

export function UsingWithAutoAnimateExample() {
  const [records, setRecords] = useState<User[]>([]);

  useEffect(() => {
    setRecords(Array.from({ length: 6 }, createUser));
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
        borderRadius="sm"
        withTableBorder
        minHeight={200}
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
          { accessor: 'age', textAlign: 'right' },
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
      <Paper p="md" mt="sm" withBorder>
        <Center>
          <div className={classes.buttons}>
            <Button className={classes.button} color="green" onClick={handleAdd}>
              Add new user
            </Button>
            <Button className={classes.button} onClick={handleSortByName}>
              Sort by name
            </Button>
            <Button className={classes.button} onClick={handleSortByAge}>
              Sort by age
            </Button>
            <Button className={classes.button} color="red" onClick={handleDeleteAll}>
              Delete all
            </Button>
          </div>
        </Center>
      </Paper>
      {/* example-resume */}
    </>
  );
  // example-end
}
