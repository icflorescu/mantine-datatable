import { type MantineStyleProp, type MantineTheme, TableTh } from '@mantine/core';
import clsx from 'clsx';
import type { PinnedColumnInfo } from './hooks';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTableColumn } from './types';
import { ELLIPSIS, NOWRAP, TEXT_ALIGN_CENTER, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT } from './utilityClasses';

type DataTableFooterCellProps<T> = {
  className: string | undefined;
  style: MantineStyleProp | undefined;
  pinnedInfo: PinnedColumnInfo | undefined;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: React.ReactNode | undefined;
} & Pick<DataTableColumn<T>, 'noWrap' | 'ellipsis' | 'textAlign' | 'width'>;

export function DataTableFooterCell<T>({
  className,
  style,
  pinnedInfo,
  visibleMediaQuery,
  title,
  noWrap,
  ellipsis,
  textAlign,
  width,
}: DataTableFooterCellProps<T>) {
  if (!useMediaQueryStringOrFunction(visibleMediaQuery)) return null;
  return (
    <TableTh
      data-pinned={pinnedInfo?.position}
      data-pinned-shadow={pinnedInfo?.isBoundary ? pinnedInfo.position : undefined}
      className={clsx(
        {
          [NOWRAP]: noWrap || ellipsis,
          [ELLIPSIS]: ellipsis,
          [TEXT_ALIGN_LEFT]: textAlign === 'left',
          [TEXT_ALIGN_CENTER]: textAlign === 'center',
          [TEXT_ALIGN_RIGHT]: textAlign === 'right',
        },
        className
      )}
      style={[
        {
          width,
          minWidth: width,
          maxWidth: width,
        },
        style,
        pinnedInfo && {
          position: 'sticky',
          [pinnedInfo.position]: pinnedInfo.offset,
          overflow: 'visible',
        },
      ]}
    >
      {title}
    </TableTh>
  );
}
