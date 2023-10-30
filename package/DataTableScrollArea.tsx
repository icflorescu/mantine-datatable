'use client';

import { Box, ScrollArea, rem, type ScrollAreaProps } from '@mantine/core';
import clsx from 'clsx';

type DataTableScrollAreaProps = React.PropsWithChildren<{
  topShadowVisible: boolean;
  leftShadowVisible: boolean;
  rightShadowVisible: boolean;
  bottomShadowVisible: boolean;
  headerHeight: number;
  footerHeight: number;
  onScrollPositionChange: ScrollAreaProps['onScrollPositionChange'];
  viewportRef: React.Ref<HTMLDivElement>;
  scrollAreaProps: Omit<ScrollAreaProps, 'classNames' | 'styles' | 'onScrollPositionChange'> | undefined;
}>;

export function DataTableScrollArea({
  topShadowVisible,
  leftShadowVisible,
  rightShadowVisible,
  bottomShadowVisible,
  headerHeight,
  footerHeight,
  onScrollPositionChange,
  children,
  viewportRef,
  scrollAreaProps,
}: DataTableScrollAreaProps) {
  const headerHeightRem = headerHeight ? rem(headerHeight) : 0;
  const bottomRem = footerHeight ? rem(footerHeight - 1) : 0;
  return (
    <ScrollArea
      {...scrollAreaProps}
      viewportRef={viewportRef}
      classNames={{
        root: 'mantine-datatable-scroll-area',
        scrollbar: 'mantine-datatable-scroll-area-scrollbar',
        thumb: 'mantine-datatable-scroll-area-thumb',
        corner: 'mantine-datatable-scroll-area-corner',
      }}
      styles={{ scrollbar: { marginTop: headerHeightRem, marginBottom: bottomRem } }}
      onScrollPositionChange={onScrollPositionChange}
    >
      {children}
      <Box
        className={clsx('mantine-datatable-scroll-area-shadow', 'mantine-datatable-scroll-area-top-shadow', {
          'mantine-datatable-scroll-area-shadow-visible': topShadowVisible,
        })}
        style={{ top: headerHeightRem }}
      />
      <div
        className={clsx('mantine-datatable-scroll-area-shadow', 'mantine-datatable-scroll-area-left-shadow', {
          'mantine-datatable-scroll-area-shadow-visible': leftShadowVisible,
        })}
      />
      <div
        className={clsx('mantine-datatable-scroll-area-shadow', 'mantine-datatable-scroll-area-right-shadow', {
          'mantine-datatable-scroll-area-shadow-visible': rightShadowVisible,
        })}
      />
      <Box
        className={clsx('mantine-datatable-scroll-area-shadow', 'mantine-datatable-scroll-area-bottom-shadow', {
          'mantine-datatable-scroll-area-shadow-visible': bottomShadowVisible,
        })}
        style={{ bottom: bottomRem }}
      />
    </ScrollArea>
  );
}
