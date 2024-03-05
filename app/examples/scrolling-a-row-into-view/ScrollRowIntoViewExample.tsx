'use client';

import { Button, Grid, GridCol } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { employees } from '~/data';

export function ScrollRowIntoViewExample() {
  // example-start
  const scrollToFirstRow = () => {
    document.querySelector('[data-row-index="1"]')?.scrollIntoView(false);
  };

  const scrollToFirstAlicia = () => {
    document.querySelector('[data-row-first-name="Alicia"]')?.scrollIntoView(false);
  };

  const scrollToLastRow = () => {
    document.querySelector(`[data-row-index="${employees.length - 1}"]`)?.scrollIntoView(false);
  };

  return (
    <>
      <Grid mb="md">
        <GridCol span={{ md: 4, lg: 3 }}>
          <Button fullWidth onClick={scrollToFirstRow}>
            Scroll to first row
          </Button>
        </GridCol>
        <GridCol span={{ md: 4, lg: 6 }}>
          <Button fullWidth onClick={scrollToFirstAlicia}>
            Scroll to first “Alicia”
          </Button>
        </GridCol>
        <GridCol span={{ md: 4, lg: 3 }}>
          <Button fullWidth onClick={scrollToLastRow}>
            Scroll to last row
          </Button>
        </GridCol>
      </Grid>
      <DataTable
        records={employees}
        customRowAttributes={({ firstName }, recordIndex) => ({
          'data-row-first-name': firstName,
          'data-row-index': recordIndex,
        })}
        // example-skip more table props
        height={500}
        withTableBorder
        withColumnBorders
        striped
        columns={[
          { accessor: 'firstName' },
          { accessor: 'lastName' },
          { accessor: 'email' },
          { accessor: 'department.name', title: 'Department' },
          { accessor: 'department.company.name', title: 'Company', noWrap: true },
          { accessor: 'department.company.streetAddress', title: 'Address', noWrap: true },
          { accessor: 'department.company.city', title: 'City' },
          { accessor: 'department.company.state', title: 'State', textAlign: 'right' },
        ]}
        rowColor={({ firstName }, index) =>
          index === 0 || index === employees.length - 1 || firstName === 'Alicia' ? 'red' : undefined
        }
        // example-resume
      />
    </>
  );
  // example-end
}
