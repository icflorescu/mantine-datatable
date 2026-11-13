import { TableTh } from '@mantine/core';
import clsx from 'clsx';
import type { JSX } from 'react';
import type { PinnedColumnInfo } from './hooks';
import type { DataTableColumnGroup } from './types';
import { TEXT_ALIGN_CENTER, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT } from './utilityClasses';
import { humanize } from './utils';

type DataTableColumnGroupHeaderCellProps<T> = {
  group: DataTableColumnGroup<T>;
  colSpan: number;
  rowSpan: number;
  pinnedInfo: PinnedColumnInfo | undefined;
  needsBorder: boolean;
};

export function DataTableColumnGroupHeaderCell<T>({
  group: { id, title, textAlign, className, style },
  colSpan,
  rowSpan,
  pinnedInfo,
  needsBorder,
}: DataTableColumnGroupHeaderCellProps<T>): JSX.Element {
  return (
    <TableTh
      colSpan={colSpan}
      rowSpan={rowSpan > 1 ? rowSpan : undefined}
      data-pinned={pinnedInfo?.position}
      data-pinned-shadow={pinnedInfo?.isBoundary ? pinnedInfo.position : undefined}
      className={clsx(
        'mantine-datatable-column-group-header-cell',
        {
          [TEXT_ALIGN_LEFT]: textAlign === 'left',
          [TEXT_ALIGN_CENTER]: textAlign === 'center',
          [TEXT_ALIGN_RIGHT]: textAlign === 'right',
          'mantine-datatable-column-group-header-cell--needs-border': needsBorder,
        },
        className
      )}
      style={[
        style,
        pinnedInfo && {
          position: 'sticky',
          [pinnedInfo.position]: pinnedInfo.offset,
          overflow: 'visible',
        },
      ]}
    >
      {title ?? humanize(id)}
    </TableTh>
  );
}
