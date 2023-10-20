import clsx from 'clsx';

export function DataTableFooterSelectorPlaceholderCell({ shadowVisible }: { shadowVisible: boolean }) {
  return (
    <th
      className={clsx('mantine-datatable-footer-selector-placeholder-cell', {
        'mantine-datatable-footer-selector-placeholder-cell-shadow-visible': shadowVisible,
      })}
    ></th>
  );
}
