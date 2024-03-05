'use client';

import { Button, Grid, GridCol } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { useRef } from 'react';
import { employees } from '~/data';

export function ScrollIntoViewExample() {
  // example-start scroll-into-view
  const scrollRowIntoView = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    // 👇 if you don't want smooth scrolling, you could simply use this instead:
    // document.querySelector(selector)?.scrollIntoView(false);
  };

  return (
    <>
      <Grid mb="md">
        <GridCol span={{ md: 4, lg: 3 }}>
          <Button fullWidth onClick={() => scrollRowIntoView('[data-row-index="0"]')}>
            Scroll to first row
          </Button>
        </GridCol>
        <GridCol span={{ md: 4, lg: 6 }}>
          <Button fullWidth onClick={() => scrollRowIntoView('[data-row-first-name="Alicia"]')}>
            Scroll to first “Alicia”
          </Button>
        </GridCol>
        <GridCol span={{ md: 4, lg: 3 }}>
          <Button fullWidth onClick={() => scrollRowIntoView(`[data-row-index="${employees.length - 1}"]`)}>
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

export function ScrollToExample() {
  const viewportRef = useRef<HTMLDivElement>(null);

  // example-start scroll-to

  const scrollToRow = (selector: string) => {
    const el = document.querySelector<HTMLElement>(selector)!;
    viewportRef.current?.scrollTo({
      top: el.offsetTop - el.clientHeight - 1,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Grid mb="md">
        <GridCol span={{ md: 4, lg: 3 }}>
          <Button fullWidth onClick={() => scrollToRow('[data-row-index="0"]')}>
            Scroll to first row
          </Button>
        </GridCol>
        <GridCol span={{ md: 4, lg: 6 }}>
          <Button fullWidth onClick={() => scrollToRow('[data-row-first-name="Alicia"]')}>
            Scroll to first “Alicia”
          </Button>
        </GridCol>
        <GridCol span={{ md: 4, lg: 3 }}>
          <Button fullWidth onClick={() => scrollToRow(`[data-row-index="${employees.length - 1}"]`)}>
            Scroll to last row
          </Button>
        </GridCol>
      </Grid>
      <DataTable
        scrollViewportRef={viewportRef}
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
