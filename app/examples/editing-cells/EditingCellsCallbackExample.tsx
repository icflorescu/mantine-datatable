'use client';

import { DataTable } from '__PACKAGE__';
import { Code, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import { type Company, companies } from '~/data';

const initialRecords = companies.slice(0, 3);

type EditEvent = { accessor: string; value: string; recordId: number };

export function EditingCellsCallbackExample() {
  const [records, setRecords] = useState<Company[]>(initialRecords);
  const [log, setLog] = useState<EditEvent[]>([]);

  return (
    // example-start
    <Stack>
      <DataTable
        withTableBorder
        withColumnBorders
        columns={[
          { accessor: 'name', editable: true },
          { accessor: 'city', editable: true },
          { accessor: 'state', editable: true },
        ]}
        records={records}
        onCellEdit={({ record, accessor, value }) => {
          setRecords((current) =>
            current.map((r) => (r.id === record.id ? { ...r, [accessor as keyof Company]: value } : r))
          );
          setLog((current) => [{ accessor: String(accessor), value, recordId: record.id }, ...current].slice(0, 5));
        }}
      />
      {log.length > 0 && (
        <Stack gap={4}>
          <Text size="xs" c="dimmed">
            Last commits (newest first):
          </Text>
          {log.map((entry, i) => (
            <Code key={i} block>
              {`{ accessor: "${entry.accessor}", value: "${entry.value}", record.id: ${entry.recordId} }`}
            </Code>
          ))}
        </Stack>
      )}
    </Stack>
    // example-end
  );
}
