'use client';

import { Button, Flex } from '@mantine/core';
import { IconBrandGithub, IconRocket } from '@tabler/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import { PRODUCT_NAME, REPO_LINK } from '~/app/config';
import { getFirstExampleRoute } from '~/lib/utils';
import classes from './page.module.css';

const { href: firstExampleHref } = getFirstExampleRoute();

export function HomePageButtons() {
  return (
    <Flex wrap="wrap" gap="md">
      <Button
        classNames={{ root: clsx(classes.button, classes.buttonHalf), label: classes.buttonLabel }}
        size="md"
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan' }}
        component={Link}
        href="/getting-started"
        aria-label={`Get started with ${PRODUCT_NAME}`}
        leftSection={<IconRocket />}
      >
        Get started
      </Button>
      <Button
        classNames={{ root: clsx(classes.button, classes.buttonHalf), label: classes.buttonLabel }}
        size="md"
        variant="gradient"
        gradient={{ from: 'gray.6', to: 'gray.5' }}
        component="a"
        href={REPO_LINK}
        target="_blank"
        aria-label="View code on GitHub"
        leftSection={<IconBrandGithub />}
      >
        View code
      </Button>
      <Button
        classNames={{ root: classes.button, label: classes.buttonLabel }}
        size="md"
        variant="gradient"
        gradient={{ from: 'green.7', to: 'green.6' }}
        component={Link}
        href={firstExampleHref}
        aria-label="Learn by example"
        leftSection={<IconRocket />}
      >
        Learn by example
      </Button>
    </Flex>
  );
}
