import { Collapse } from '@mantine/core';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useRowExpansionStatus } from './hooks';
import type { DataTableRowExpansionCollapseProps } from './types';

type DataTableRowExpansionProps = {
  open: boolean;
  colSpan: number;
  content: () => ReactNode;
  collapseProps?: DataTableRowExpansionCollapseProps;
};

export function DataTableRowExpansion({ open, colSpan, content, collapseProps }: DataTableRowExpansionProps) {
  const { expanded, visible } = useRowExpansionStatus(open, collapseProps?.transitionDuration);

  return visible ? (
    <>
      {/* add an empty row to maintain striped rows consistency */}
      <tr />
      <tr>
        <td
          className={clsx('mantine-datatable-row-expansion-cell', {
            'mantine-datatable-row-expansion-expanded': expanded,
          })}
          colSpan={colSpan}
        >
          <Collapse in={expanded} {...collapseProps}>
            {content()}
          </Collapse>
        </td>
      </tr>
    </>
  ) : null;
}
