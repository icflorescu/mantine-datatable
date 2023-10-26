import { Collapse, TableTd, TableTr } from '@mantine/core';
import { useRowExpansionStatus } from './hooks';
import type { DataTableRowExpansionCollapseProps } from './types';

type DataTableRowExpansionProps = {
  open: boolean;
  colSpan: number;
  content: () => React.ReactNode;
  collapseProps: DataTableRowExpansionCollapseProps | undefined;
};

export function DataTableRowExpansion({ open, colSpan, content, collapseProps }: DataTableRowExpansionProps) {
  const { expanded, visible } = useRowExpansionStatus(open, collapseProps?.transitionDuration);

  return visible ? (
    <>
      {/* add an empty row to maintain striped rows consistency */}
      <TableTr />
      <TableTr>
        <TableTd className="mantine-datatable-row-expansion-cell" colSpan={colSpan}>
          <Collapse in={expanded} {...collapseProps}>
            <div className="mantine-datatable-row-expansion-cell-content">{content()}</div>
          </Collapse>
        </TableTd>
      </TableTr>
    </>
  ) : null;
}
