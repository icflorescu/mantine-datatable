import { Center, createStyles, Loader, MantineNumberSize, MantineTheme } from '@mantine/core';

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
  loaderBackgroundBlur: number | undefined;
  loaderSize: MantineNumberSize | undefined;
  loaderVariant: MantineTheme['loader'] | undefined;
};

export default function DataTableLoader({
  pt,
  pb,
  fetching,
  loaderBackgroundBlur,
  loaderSize,
  loaderVariant,
}: DataTableLoaderProps) {
  const { classes, cx } = useStyles();
  return (
    <Center
      pt={pt}
      pb={pb}
      className={cx(classes.root, { [classes.fetching]: fetching })}
      sx={loaderBackgroundBlur ? { backdropFilter: `blur(${loaderBackgroundBlur}px)` } : undefined}
    >
      {fetching && <Loader size={loaderSize} variant={loaderVariant} />}
    </Center>
  );
}
