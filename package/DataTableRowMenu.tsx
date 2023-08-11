import type { MantineNumberSize, MantineShadow } from '@mantine/core';
import { Paper, createStyles, px } from '@mantine/core';
import { useClickOutside, useMergedRef, useWindowEvent } from '@mantine/hooks';
import type { ReactNode } from 'react';
import { useElementOuterSize } from './hooks';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    overflow: 'hidden',
    transition: 'all .15s ease',
  },
}));

type DataTableRowMenuProps = {
  borderRadius: MantineNumberSize | undefined;
  shadow: MantineShadow | undefined;
  zIndex: number | undefined;
  y: number;
  x: number;
  children: ReactNode;
  onDestroy: () => void;
};

export default function DataTableRowMenu({
  borderRadius = 'xs',
  shadow = 'sm',
  zIndex = 3,
  y: desiredY,
  x: desiredX,
  onDestroy,
  children,
}: DataTableRowMenuProps) {
  useWindowEvent('resize', onDestroy);
  useWindowEvent('scroll', onDestroy);
  const clickOutsideRef = useClickOutside<HTMLDivElement>(onDestroy);
  const { ref: sizeRef, width, height } = useElementOuterSize<HTMLDivElement>();
  const ref = useMergedRef(clickOutsideRef, sizeRef);

  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

  const {
    classes,
    theme: { dir, spacing },
  } = useStyles();

  const mdSpacing = px(spacing.md);

  return (
    <Paper
      ref={ref}
      shadow={shadow}
      radius={borderRadius}
      className={classes.root}
      sx={{
        zIndex,
        top: desiredY + height + mdSpacing > windowHeight ? windowHeight - height - mdSpacing : desiredY,
        left:
          dir === 'ltr'
            ? desiredX + width + mdSpacing > windowWidth
              ? windowWidth - width - mdSpacing
              : desiredX
            : windowWidth - mdSpacing - (desiredX - width - mdSpacing < 0 ? width + mdSpacing : desiredX),
      }}
    >
      {children}
    </Paper>
  );
}
