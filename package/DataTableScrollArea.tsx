import { Box, ScrollArea, type ScrollAreaProps } from '@mantine/core';
import clsx from 'clsx';

type DataTableScrollAreaProps = React.PropsWithChildren<{
  leftShadowBehind: boolean;
  rightShadowBehind: boolean | undefined;
  onScrollPositionChange: ScrollAreaProps['onScrollPositionChange'];
  viewportRef: React.Ref<HTMLDivElement>;
  scrollAreaProps: Omit<ScrollAreaProps, 'classNames' | 'styles' | 'onScrollPositionChange'> | undefined;
}>;

export function DataTableScrollArea({
  leftShadowBehind,
  rightShadowBehind,
  onScrollPositionChange,
  children,
  viewportRef,
  scrollAreaProps,
}: DataTableScrollAreaProps) {
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
      onScrollPositionChange={onScrollPositionChange}
    >
      {children}
      <Box className={clsx('mantine-datatable-scroll-area-shadow', 'mantine-datatable-scroll-area-top-shadow')} />
      <div
        className={clsx('mantine-datatable-scroll-area-shadow', 'mantine-datatable-scroll-area-left-shadow', {
          'mantine-datatable-scroll-area-shadow-behind': leftShadowBehind,
        })}
      />
      <div
        className={clsx('mantine-datatable-scroll-area-shadow', 'mantine-datatable-scroll-area-right-shadow', {
          'mantine-datatable-scroll-area-shadow-behind': rightShadowBehind,
        })}
      />
      <Box className={clsx('mantine-datatable-scroll-area-shadow', 'mantine-datatable-scroll-area-bottom-shadow')} />
    </ScrollArea>
  );
}
