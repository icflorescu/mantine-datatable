import { Button, Flex, Stack, Text } from '@mantine/core';
import { IconBrandGithub, IconLifebuoy, IconRocket, IconScale, IconSettings } from '@tabler/icons-react';
import clsx from 'clsx';
import type { Route } from 'next';
import Link from 'next/link';
import {
  CRA_LINK,
  GATSBY_LINK,
  LICENSE_LINK,
  MANTINE_LINK,
  NEXTJS_LINK,
  PRODUCT_NAME,
  REMIX_LINK,
  REPO_LINK,
  VITE_LINK,
} from '~/app/config';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { getFirstExampleRoute, getRouteMetadata } from '~/lib/utils';
import { Feature } from './Feature';
import { HeroImage } from './HeroImage';
import { HomePageSubtitle } from './HomePageSubtitle';
import { HomePageTitle } from './HomePageTitle';
import classes from './page.module.css';

const PATH: Route = '/';
export const metadata = getRouteMetadata(PATH);

const { href: firstExampleHref } = getFirstExampleRoute();

export default function HomePage() {
  return (
    <Stack gap="xl">
      <HomePageTitle />
      <HomePageSubtitle />
      <HeroImage />
      <Text component="div">
        Mantine DataTable is a{' '}
        <ExternalLink to="https://bundlephobia.com/package/mantine-datatable">lightweight</ExternalLink>,
        dependency-free component that brings datagrid-like functionality to your data-rich user interfaces, with
        dark-mode support and intuitive Gmail-style additive batch rows selection out of the box.
      </Text>
      <Flex
        direction={{ base: 'column', xs: 'row' }}
        gap="xl"
        wrap={{ base: 'nowrap', xs: 'wrap' }}
        mb={{ base: 0, md: 'sm' }}
      >
        <Feature icon={IconSettings} title="Lightweight yet customizable">
          Supports <InternalLink to="/examples/asynchronous-data-loading">asynchronous data loading</InternalLink>,{' '}
          <InternalLink to="/examples/pagination">pagination</InternalLink>, intuitive{' '}
          <InternalLink to="/examples/records-selection">rows selection</InternalLink>, column{' '}
          <InternalLink to="/examples/sorting">sorting</InternalLink>, custom{' '}
          <InternalLink to="/examples/column-properties-and-styling">cell data rendering</InternalLink>,{' '}
          <InternalLink to="/examples/using-with-mantine-contextmenu">context menus</InternalLink>,{' '}
          <InternalLink to="/examples/expanding-rows">row expansion</InternalLink>,{' '}
          <InternalLink to="/examples/nested-tables">nesting</InternalLink>,{' '}
          <InternalLink to="/examples/row-dragging">drag-and-drop reordering support</InternalLink> and{' '}
          <InternalLink to="/examples/complex-usage-scenario">more</InternalLink>
        </Feature>
        <Feature icon={IconLifebuoy} title="Typescript based">
          The entire codebase is <ExternalLink to={REPO_LINK}>written in TypeScript</ExternalLink>, options are{' '}
          <InternalLink to="/type-definitions">well typed</InternalLink> and documented with JSDoc, so you can build
          type safe applications with confidence
        </Feature>
        <Feature icon={IconScale} title="Free and open-source">
          This package is released under the <ExternalLink to={LICENSE_LINK}>MIT license</ExternalLink>, same as{' '}
          <ExternalLink to={MANTINE_LINK}>Mantine</ExternalLink>, so you can freely build fantastic data-rich
          applications with it
        </Feature>
        <Feature icon={IconRocket} title="Use anywhere">
          You can use it in any modern React framework supported by{' '}
          <ExternalLink to={MANTINE_LINK}>Mantine</ExternalLink>, such as{' '}
          <ExternalLink to={NEXTJS_LINK}>Next.js</ExternalLink>, <ExternalLink to={VITE_LINK}>Vite</ExternalLink>,{' '}
          <ExternalLink to={CRA_LINK}>Create React App</ExternalLink>,{' '}
          <ExternalLink to={REMIX_LINK}>Remix</ExternalLink> or <ExternalLink to={GATSBY_LINK}>Gatsby</ExternalLink>
        </Feature>
      </Flex>
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
    </Stack>
  );
}
