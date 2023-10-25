'use client';

import { Box, Button, ButtonGroup, Group, Stack } from '@mantine/core';
import { DataTable } from '__PACKAGE__';
import { useState } from 'react';
import { companies } from '~/data';
import classes from './RowExpansionExampleControlledMode.module.css';

const records = companies.slice(0, 5);

export function RowExpansionExampleControlledMode() {
  const [firstRowId, secondRowId, thirdRowId, fourthRowId] = records.slice(0, 4).map((r) => r.id);

  // example-start
  const [expandedRecordIds, setExpandedRecordIds] = useState<string[]>([]);

  const expandFirstAndThirdRow = () => {
    setExpandedRecordIds([firstRowId, thirdRowId]);
  };

  const expandSecondAndFourthRow = () => {
    setExpandedRecordIds([secondRowId, fourthRowId]);
  };

  const collapseAllRows = () => {
    setExpandedRecordIds([]);
  };

  return (
    <>
      {/* example-skip buttons triggering the above callbacks */}
      <ButtonGroup className={classes.buttonGroup}>
        <Button
          className={classes.button}
          variant="subtle"
          onClick={expandFirstAndThirdRow}
          disabled={expandedRecordIds.includes(firstRowId) && expandedRecordIds.includes(thirdRowId)}
        >
          Expand first and third row
        </Button>
        <Button
          className={classes.button}
          variant="subtle"
          onClick={expandSecondAndFourthRow}
          disabled={expandedRecordIds.includes(secondRowId) && expandedRecordIds.includes(fourthRowId)}
        >
          Expand second and fourth row
        </Button>
        <Button
          className={classes.button}
          variant="subtle"
          onClick={collapseAllRows}
          disabled={expandedRecordIds.length === 0}
        >
          Collapse all rows
        </Button>
      </ButtonGroup>
      {/* example-resume */}
      <DataTable
        mt="md"
        withTableBorder
        withColumnBorders
        columns={[
          { accessor: 'number', title: '#', render: (_, index) => index + 1 },
          { accessor: 'name', width: '100%' },
          { accessor: 'city', ellipsis: true },
          { accessor: 'state' },
        ]}
        records={records}
        rowExpansion={{
          // trigger: 'never', // 👈 uncomment this if you want to disable expanding/collapsing on click
          allowMultiple: true,
          expanded: {
            recordIds: expandedRecordIds,
            onRecordIdsChange: setExpandedRecordIds,
          },
          content: ({ record }) => (
            // example-skip expansion content
            <Stack className={classes.details} p="xs" gap={6}>
              <Group gap={6}>
                <div className={classes.label}>Postal address:</div>
                <div>
                  {record.streetAddress}, {record.city}, {record.state}
                </div>
              </Group>
              <Group gap={6}>
                <div className={classes.label}>Mission statement:</div>
                <Box fs="italic">“{record.missionStatement}”</Box>
              </Group>
            </Stack>
            // example-resume
          ),
        }}
      />
    </>
  );
  // example-end
}
