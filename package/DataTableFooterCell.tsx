import { TableTh, type MantineStyleProp, type MantineTheme } from '@mantine/core';
import clsx from 'clsx';
import { useMediaQueryStringOrFunction } from './hooks';
import type { DataTableColumn } from './types';
import { ELLIPSIS, NOWRAP, TEXT_ALIGN_CENTER, TEXT_ALIGN_LEFT, TEXT_ALIGN_RIGHT } from './utilityClasses';

type DataTableFooterCellProps<T> = {
  className?: string;
  style?: MantineStyleProp;
  visibleMediaQuery: string | ((theme: MantineTheme) => string) | undefined;
  title: React.ReactNode | undefined;
} & Pick<DataTableColumn<T>, 'noWrap' | 'ellipsis' | 'textAlign' | 'width'>;

export function DataTableFooterCell<T>({
  className,
  style,
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
      ]}
    >
      {title}
    </TableTh>
  );
}
