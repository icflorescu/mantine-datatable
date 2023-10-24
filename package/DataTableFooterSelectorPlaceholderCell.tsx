import { TableTh } from '@mantine/core';

export function DataTableFooterSelectorPlaceholderCell({ shadowVisible }: { shadowVisible: boolean }) {
  return (
    <TableTh
      className="mantine-datatable-footer-selector-placeholder-cell"
      data-shadow-visible={shadowVisible || undefined}
    />
  );
}
