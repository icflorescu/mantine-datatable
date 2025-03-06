'use client';

import { faker } from '@faker-js/faker';
import { Button, Center, Paper } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { useState } from 'react';
import classes from './VirtualizationExample.module.css';

type User = {
  id: string;
  name: string;
  age: number;
};

const userData: User[] = Array.from({ length: 2000 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  age: faker.number.int({ min: 18, max: 65 }),
}));

export function VirtualizationExample() {
  const [virtualized, setVirtualized] = useState(false);

  const toggleVirtualized = () => setVirtualized((current) => !current);

  // example-start
  // ...

  return (
    <>
      <DataTable
        virtualize={virtualized}
        borderRadius="sm"
        withTableBorder
        minHeight={200}
        columns={[{ accessor: 'id' }, { accessor: 'name' }, { accessor: 'age' }]}
        records={userData}
        height={400}
        rowExpansion={{
          content: ({ record }) => (
            <div style={{ padding: 10 }}>
              <div>ID: {record.id}</div>
              <div>Name: {record.name}</div>
              <div>Age: {record.age}</div>
            </div>
          ),
        }}
      />
      {/* example-skip */}
      <Paper p="md" mt="sm" withBorder>
        <Center>
          <div className={classes.buttons}>
            <Button className={classes.button} color="green" onClick={toggleVirtualized}>
              {virtualized ? 'Disable' : 'Enable'} virtualization
            </Button>
          </div>
        </Center>
      </Paper>
      {/* example-resume */}
    </>
  );
  // example-end
}
