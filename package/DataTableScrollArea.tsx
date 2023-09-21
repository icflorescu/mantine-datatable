import { Box, ScrollArea, ScrollAreaProps } from '@mantine/core';
import type { ReactNode, Ref } from 'react';
import classes from './styles/DataTableScrollArea.css';
import cx from 'clsx';

type DataTableScrollAreaProps = {
  topShadowVisible: boolean;
  leftShadowVisible: boolean;
  rightShadowVisible: boolean;
  bottomShadowVisible: boolean;
  headerHeight: number;
  footerHeight: number;
  onScrollPositionChange: () => void;
  viewportRef: Ref<HTMLDivElement>;
  scrollAreaProps?: Omit<ScrollAreaProps, 'classNames' | 'styles' | 'onScrollPositionChange'>;
  children: ReactNode;
};

export default function DataTableScrollArea({
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
  const bottom = footerHeight ? footerHeight - 1 : 0;
  return (
    <ScrollArea
      {...scrollAreaProps}
      viewportRef={viewportRef}
      className={cx(classes.root, classes.scrollbar, classes.thumb, classes.corner)}
      styles={{scrollbar: {marginTop: headerHeight, marginBottom: bottom }}}
      onScrollPositionChange={onScrollPositionChange}
    >
      {children}
      <Box
        className={cx(classes.shadow, classes.topShadow)}
        style={{ opacity: topShadowVisible ? classes.shadowVisible.opacity : '0', top: headerHeight }}
      />
      <div style={{opacity: leftShadowVisible ? classes.shadowVisible.opacity : '0'}} className={cx(classes.shadow, classes.leftShadow)} />
      <div style={{opacity: rightShadowVisible ? classes.shadowVisible.opacity : '0'}} className={cx(classes.shadow, classes.rightShadow)} />
      <Box
        style={{opacity: bottomShadowVisible ? classes.shadowVisible.opacity : '0', bottom: bottom }}
        className={cx(classes.shadow, classes.bottomShadow)}
      />
    </ScrollArea>
  );
}
