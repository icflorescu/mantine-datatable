import { Collapse, createStyles } from '@mantine/core';
import type { ReactNode } from 'react';
import { useRowExpansionStatus } from './hooks';
import type { DataTableRowExpansionCollapseProps } from './types';

const useStyles = createStyles({
  cell: {
    '&&': {
      borderBottomWidth: 0,
      padding: 0,
    },
  },
  expandedCell: {
    '&&': {
      borderBottomWidth: 1,
    },
  },
});

type DataTableRowExpansionProps = {
  open: boolean;
  colSpan: number;
  content: () => ReactNode;
  collapseProps?: DataTableRowExpansionCollapseProps;
};

export default function DataTableRowExpansion({ open, colSpan, content, collapseProps }: DataTableRowExpansionProps) {
  const { expanded, visible } = useRowExpansionStatus(open, collapseProps?.transitionDuration);

  const { cx, classes } = useStyles();

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
