import { Group, Text, UnstyledButton } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { getPageNavigationInfo } from '~/lib/utils';
import classes from './PageNavigation.module.css';

export type PageNavigationProps = {
  of: string;
};

export function PageNavigation({ of }: PageNavigationProps) {
  const { backHref, backTitle, backDescription, nextHref, nextTitle, nextDescription } = getPageNavigationInfo(of);

  return (
    <div className={classes.root}>
      <UnstyledButton
        className={classes.button}
        component={Link}
        href={backHref}
        aria-label={backDescription}
        rel="prev"
      >
        <Group px="sm" py="xs" justify="space-between" wrap="nowrap">
          <IconArrowLeft />
          <div>
            <Text fw={500} ta="right">
              Go back
            </Text>
            <Text lineClamp={1} size="sm" c="dimmed" ta="right">
              {backTitle}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
      <UnstyledButton
        className={classes.button}
        component={Link}
        href={nextHref}
        aria-label={nextDescription}
        rel="next"
      >
        <Group px="sm" py="xs" justify="space-between" wrap="nowrap">
          <div>
            <Text fw={500}>Up next</Text>
            <Text lineClamp={1} size="sm" c="dimmed">
              {nextTitle}
            </Text>
          </div>
          <IconArrowRight />
        </Group>
      </UnstyledButton>
    </div>
  );
}
