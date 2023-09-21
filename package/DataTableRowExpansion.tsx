import { Collapse } from '@mantine/core';
import type { ReactNode } from 'react';
import { useRowExpansionStatus } from './hooks';
import type { DataTableRowExpansionCollapseProps } from './types';
import classes from './styles/DataTableRowExpansion.css';
import cx from 'clsx';

type DataTableRowExpansionProps = {
  open: boolean;
  colSpan: number;
  content: () => ReactNode;
  collapseProps?: DataTableRowExpansionCollapseProps;
};

export default function DataTableRowExpansion({ open, colSpan, content, collapseProps }: DataTableRowExpansionProps) {
  const { expanded, visible } = useRowExpansionStatus(open, collapseProps?.transitionDuration);

  return visible ? (
    <>
      {/* add an empty row to maintain striped rows consistency */}
      <tr />
      <tr>
        <td className={cx(classes.cell, { [classes.expandedCell]: expanded })} colSpan={colSpan}>
          <Collapse in={expanded} {...collapseProps}>
            {content()}
          </Collapse>
        </td>
      </tr>
    </>
  ) : null;
}
