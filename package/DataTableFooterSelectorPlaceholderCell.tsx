import { TableTh } from '@mantine/core';

type DataTableFooterSelectorPlaceholderCellProps = {
  shadowVisible: boolean;
};

export function DataTableFooterSelectorPlaceholderCell({ shadowVisible }: DataTableFooterSelectorPlaceholderCellProps) {
  return (
    <TableTh
      className="mantine-datatable-footer-selector-placeholder-cell"
      data-shadow-visible={shadowVisible || undefined}
    />
  );
}
