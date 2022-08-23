import { createStyles, Paper, useMantineTheme } from '@mantine/core';
import { useClickOutside, useElementSize, useMergedRef, useWindowEvent } from '@mantine/hooks';
import { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'fixed',
    padding: 4,
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    transition: 'all .15s ease',
  },
}));

type DataTableRowMenuProps = {
  zIndex?: number;
  top: number;
  left: number;
  children: ReactNode;
  onDestroy: () => void;
};

export default function DataTableRowMenu({
  top: desiredTop,
  left: desiredLeft,
  zIndex = 3,
  onDestroy,
  children,
}: DataTableRowMenuProps) {
  useWindowEvent('resize', onDestroy);
  useWindowEvent('scroll', onDestroy);
  const clickOutsideRef = useClickOutside<HTMLDivElement>(onDestroy);
  const { ref: sizeRef, width, height } = useElementSize();
  const ref = useMergedRef(clickOutsideRef, sizeRef);

  const {
    spacing: { xs: xsSpacing },
  } = useMantineTheme();

  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  const top = desiredTop + height + xsSpacing > windowHeight ? windowHeight - height - xsSpacing : desiredTop;
  const left = desiredLeft + width + xsSpacing > windowWidth ? windowWidth - width - xsSpacing : desiredLeft;

  const { classes } = useStyles();

  return (
    <Paper ref={ref} shadow="md" className={classes.root} sx={{ top, left, zIndex }}>
      {children}
    </Paper>
  );
}
