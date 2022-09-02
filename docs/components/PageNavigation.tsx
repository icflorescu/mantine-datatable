import { createStyles, Group, Text, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'tabler-icons-react';
import { getPageNavigation } from '~/lib/page';

const useStyles = createStyles((theme) => ({
  root: {
    margin: `${theme.spacing.xl}px 0`,
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: theme.spacing.xl,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  button: {
    display: 'block',
    background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.fn.lighten(theme.colors.gray[1], 0.5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    borderRadius: theme.radius.sm,
    '&:hover:not(:active)': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
    },
    '&:active': {
      background: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
      transform: 'translate3d(0, 1px, 0)',
    },
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      flex: `0 0 calc(50% - ${theme.spacing.xl / 2}px)`,
    },
  },
  withoutNext: {
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      flexBasis: '100%',
    },
  },
}));

export default function PageNavigation({ of }: { of: string }) {
  const { back, next } = getPageNavigation(of);
  const { cx, classes } = useStyles();

  return (
    <div className={classes.root}>
      <Link href={`/${back.path}`} passHref>
        <UnstyledButton className={cx(classes.button, { [classes.withoutNext]: !next })} component="a">
          <Group px="sm" py="xs" position="apart" noWrap>
            <ArrowLeft />
            <div>
              <Text weight={500} align="right">
                Go back
              </Text>
              <Text lineClamp={1} size="sm" color="dimmed" align="right">
                {back.title}
              </Text>
            </div>
          </Group>
        </UnstyledButton>
      </Link>
      {next && (
        <Link href={`/${next.path}`} passHref>
          <UnstyledButton className={classes.button} component="a">
            <Group px="sm" py="xs" position="apart" noWrap>
              <div>
                <Text weight={500}>Up next</Text>
                <Text lineClamp={1} size="sm" color="dimmed">
                  {next.title}
                </Text>
              </div>
              <ArrowRight />
            </Group>
          </UnstyledButton>
        </Link>
      )}
    </div>
  );
}
