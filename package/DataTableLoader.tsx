import {
  Center,
  createStyles,
  Loader,
  type DefaultMantineColor,
  type MantineNumberSize,
  type MantineTheme,
} from '@mantine/core';
import type { ReactNode } from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    zIndex: 3,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    background: theme.fn.rgba(theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white, 0.75),
    opacity: 0,
    transition: 'opacity .15s ease',
  },
  fetching: {
    pointerEvents: 'all',
    opacity: 1,
  },
}));

type DataTableLoaderProps = {
  pt: number;
  pb: number;
  fetching: boolean | undefined;
  customContent: ReactNode | undefined;
  backgroundBlur: number | undefined;
  size: MantineNumberSize | undefined;
  variant: MantineTheme['loader'] | undefined;
  color: DefaultMantineColor | undefined;
};

export default function DataTableLoader({
  pt,
  pb,
  fetching,
  customContent,
  backgroundBlur,
  size,
  variant,
  color,
}: DataTableLoaderProps) {
  const { classes, cx } = useStyles();
  return (
    <Center
      pt={pt}
      pb={pb}
      className={cx(classes.root, { [classes.fetching]: fetching })}
      sx={backgroundBlur ? { backdropFilter: `blur(${backgroundBlur}px)` } : undefined}
    >
      {fetching && (customContent || <Loader size={size} variant={variant} color={color} />)}
    </Center>
  );
}
