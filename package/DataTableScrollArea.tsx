import { Box, createStyles, ScrollArea } from '@mantine/core';
import { ForwardedRef, forwardRef, ReactNode } from 'react';

const useStyles = createStyles((theme) => {
  const shadowGradientAlpha = theme.colorScheme === 'dark' ? 0.5 : 0.05;
  return {
    root: {
      flex: '1 1 100%',
    },
    scrollbar: {
      '&[data-state="visible"]': { background: 'transparent' },
      'div::before': { pointerEvents: 'none' },
    },
    corner: { background: 'transparent' },
    thumb: {
      zIndex: 3,
    },
    shadow: {
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      transition: 'opacity .15s ease',
    },
    topShadow: {
      zIndex: 2,
      top: 0,
      left: 0,
      right: 0,
      height: theme.spacing.sm,
      background: `linear-gradient(${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
        theme.black,
        0
      )}), linear-gradient(${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(theme.black, 0)} 30%)`,
    },
    leftShadow: {
      zIndex: 3,
      top: 0,
      left: 0,
      bottom: 0,
      width: theme.spacing.sm,
      background: `linear-gradient(to right, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
        theme.black,
        0
      )}), linear-gradient(to right, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
        theme.black,
        0
      )} 30%)`,
    },
    rightShadow: {
      zIndex: 2,
      top: 0,
      bottom: 0,
      right: 0,
      width: theme.spacing.sm,
      background: `linear-gradient(to left, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
        theme.black,
        0
      )}), linear-gradient(to left, ${theme.fn.rgba(theme.black, shadowGradientAlpha)}, ${theme.fn.rgba(
        theme.black,
        0
      )} 30%)`,
    },
    bottomShadow: {
      zIndex: 2,
      left: 0,
      right: 0,
      bottom: 0,
      height: theme.spacing.sm,
      background: `linear-gradient(${theme.fn.rgba(theme.black, 0)}, ${theme.fn.rgba(
        theme.black,
        shadowGradientAlpha
      )}), linear-gradient(${theme.fn.rgba(theme.black, 0)} 30%, ${theme.fn.rgba(theme.black, shadowGradientAlpha)})`,
    },
    shadowVisible: {
      opacity: 1,
    },
  };
});

type DataTableScrollAreaProps = {
  topShadowVisible: boolean;
  leftShadowVisible: boolean;
  rightShadowVisible: boolean;
  bottomShadowVisible: boolean;
  headerHeight: number;
  onScrollPositionChange: () => void;
  children: ReactNode;
};

export default forwardRef(function DataTableScrollArea(
  {
    topShadowVisible,
    leftShadowVisible,
    rightShadowVisible,
    bottomShadowVisible,
    headerHeight,
    onScrollPositionChange,
    children,
  }: DataTableScrollAreaProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { cx, classes } = useStyles();
  return (
    <ScrollArea
      viewportRef={ref}
      classNames={{ root: classes.root, scrollbar: classes.scrollbar, thumb: classes.thumb, corner: classes.corner }}
      styles={{ scrollbar: { marginTop: headerHeight } }}
      onScrollPositionChange={onScrollPositionChange}
    >
      {children}
      <Box
        className={cx(classes.shadow, classes.topShadow, { [classes.shadowVisible]: topShadowVisible })}
        sx={{ top: headerHeight }}
      />
      <div className={cx(classes.shadow, classes.leftShadow, { [classes.shadowVisible]: leftShadowVisible })} />
      <div className={cx(classes.shadow, classes.rightShadow, { [classes.shadowVisible]: rightShadowVisible })} />
      <div className={cx(classes.shadow, classes.bottomShadow, { [classes.shadowVisible]: bottomShadowVisible })} />
    </ScrollArea>
  );
}) as (props: DataTableScrollAreaProps & { ref: ForwardedRef<HTMLDivElement> }) => JSX.Element;
