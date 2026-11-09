import { TableTh } from '@mantine/core';
import type { JSX } from 'react';

type DataTableFooterSelectorPlaceholderCellProps = {
  shadowVisible: boolean;
};

export function DataTableFooterSelectorPlaceholderCell({
  shadowVisible,
}: DataTableFooterSelectorPlaceholderCellProps): JSX.Element {
  return (
    <TableTh
      className="mantine-datatable-footer-selector-placeholder-cell"
      data-shadow-visible={shadowVisible || undefined}
    />
  );
}
