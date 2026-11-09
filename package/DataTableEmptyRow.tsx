import type { JSX } from 'react';
export function DataTableEmptyRow(): JSX.Element {
  return (
    <tr className="mantine-datatable-empty-row">
      <td />
    </tr>
  );
}
