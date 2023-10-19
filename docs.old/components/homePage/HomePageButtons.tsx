import { Button, Group, createStyles } from '@mantine/core';
import { IconBulb, IconRocket } from '@tabler/icons-react';
import Link from 'next/link';
import GitHubIcon from '~/components/GitHubIcon';
import { REPO_LINK } from '~/config';
import { getFirstExamplePagePath } from '~/lib/page';

const useStyles = createStyles((theme) => ({
  root: {
    margin: '2em 0 0',
    '@media (min-width: 600px)': {
      gap: theme.spacing.xl,
      margin: '3em 0 1em',
    },
  },
  button: {
    width: '100%',
    '@media (min-width: 420px)': {
      width: `calc(50% - ${theme.spacing.md} / 2)`,
    },
    '@media (min-width: 600px)': {
      width: 'auto',
    },
  },
  buttonLabel: {
    marginTop: 2,
  },
  examplesButton: {
    '@media (min-width: 420px)': {
      width: '100%',
    },
    '@media (min-width: 600px)': {
      width: 'initial',
    },
  },
}));

export default function HomePageButtons() {
  const { classes, cx } = useStyles();

  return (
    <Group className={classes.root}>
      <Button
        classNames={{ root: classes.button, label: classes.buttonLabel }}
        size="md"
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan' }}
        leftIcon={<IconRocket />}
        component={Link}
        href="/getting-started"
        aria-label="Get started with Mantine Table"
      >
        Get started
      </Button>
      <Button
        classNames={{ root: classes.button, label: classes.buttonLabel }}
        size="md"
        variant="gradient"
        gradient={{ from: 'gray.6', to: 'gray.5' }}
        leftIcon={<GitHubIcon size={20} />}
        component="a"
        href={REPO_LINK}
        aria-label="View Mantine Table source code on GitHub"
        target="_blank"
      >
        View code
      </Button>
      <Button
        classNames={{ root: cx(classes.button, classes.examplesButton), label: classes.buttonLabel }}
        size="md"
        variant="gradient"
        gradient={{ from: 'green.7', to: 'green.6' }}
        leftIcon={<IconBulb />}
        component={Link}
        aria-label="Learn how to use Mantine Table by example"
        href={getFirstExamplePagePath()}
      >
        Learn by example
      </Button>
    </Group>
  );
}
