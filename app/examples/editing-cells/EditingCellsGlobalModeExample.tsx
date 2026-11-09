'use client';

import { DataTable } from '__PACKAGE__';
import { Button, Group } from '@mantine/core';
import { useState } from 'react';
import { type Company, companies } from '~/data';

const initialRecords = companies.slice(0, 5);

export function EditingCellsGlobalModeExample() {
  const [records, setRecords] = useState<Company[]>(initialRecords);
  const [editMode, setEditMode] = useState<'cell' | 'global'>('cell');

  return (
    // example-start
    <div>
      <Group mb="sm">
        <Button
          variant={editMode === 'global' ? 'filled' : 'outline'}
          onClick={() => setEditMode((m) => (m === 'global' ? 'cell' : 'global'))}
        >
          {editMode === 'global' ? 'Exit edit mode' : 'Edit all'}
        </Button>
      </Group>
      <DataTable
        withTableBorder
        withColumnBorders
        editMode={editMode}
        editingCellStyle={{ boxShadow: 'inset 0 0 0 2px var(--mantine-color-blue-5)' }}
        columns={[
          { accessor: 'name', editable: true },
          { accessor: 'streetAddress' },
          { accessor: 'city', editable: true },
          { accessor: 'state', editable: true },
        ]}
        records={records}
        onCellEdit={({ record, accessor, value }) => {
          setRecords((current) =>
            current.map((r) => (r.id === record.id ? { ...r, [accessor as keyof Company]: value } : r))
          );
        }}
      />
    </div>
    // example-end
  );
}
