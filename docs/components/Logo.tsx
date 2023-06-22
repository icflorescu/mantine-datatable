import { Code, createStyles, Text, ThemeIcon } from '@mantine/core';
import { IconTable } from '@tabler/icons-react';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  root: {
    color: 'inherit',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  title: {
    font: '24px/1 BenchNine, sans-serif',
    margin: '0 0 -3px',
  },
  titleInsideHeader: {
    display: 'none',
    '@media (min-width: 390px)': {
      display: 'block',
    },
  },
  version: {
    fontSize: 11,
    lineHeight: 1,
    padding: '4px 4px 0',
    margin: '-8px 0 0 -4px',
  },
  versionInsideHeader: {
    display: 'none',
    '@media (min-width: 448px)': {
      display: 'inherit',
    },
  },
}));

export default function Logo({ className, insideHeader }: { className?: string; insideHeader?: boolean }) {
  const { classes, cx } = useStyles();
  return (
    <Link className={cx(classes.root, className)} href="/">
      <ThemeIcon size="md" radius="lg">
        <IconTable size={16} />
      </ThemeIcon>
      <Text className={cx(classes.title, { [classes.titleInsideHeader]: insideHeader })} component="h1">
        Mantine DataTable
      </Text>
      <Code className={cx(classes.version, { [classes.versionInsideHeader]: insideHeader })}>
        {process.env.PACKAGE_VERSION}
      </Code>
    </Link>
  );
}
