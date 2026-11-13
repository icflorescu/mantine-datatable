import { Flex, Stack, Text } from '@mantine/core';
import { IconLifebuoy, IconRocket, IconScale, IconSettings } from '@tabler/icons-react';
import type { Route } from 'next';
import { GATSBY_LINK, LICENSE_LINK, MANTINE_LINK, NEXTJS_LINK, REPO_LINK, VITE_LINK } from '~/app/config';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { getRouteMetadata } from '~/lib/utils';
import { Feature } from './Feature';
import { HeroImage } from './HeroImage';
import { HomePageButtons } from './HomePageButtons';
import { HomePageSubtitle } from './HomePageSubtitle';
import { HomePageTitle } from './HomePageTitle';

const PATH: Route = '/';
export const metadata = getRouteMetadata(PATH);

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
        dark-mode support and intuitive, Gmail-style additive batch row selection out of the box.
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
          <InternalLink to="/examples/records-selection">row selection</InternalLink>, column{' '}
          <InternalLink to="/examples/sorting">sorting</InternalLink>,{' '}
          <InternalLink to="/examples/column-resizing">resizing</InternalLink>,{' '}
          <InternalLink to="/examples/pinning-arbitrary-columns">pinning</InternalLink> and{' '}
          <InternalLink to="/examples/column-dragging-and-toggling">toggling</InternalLink>, custom{' '}
          <InternalLink to="/examples/column-properties-and-styling">cell data rendering</InternalLink>,{' '}
          <InternalLink to="/examples/using-with-mantine-contextmenu">context menus</InternalLink>,{' '}
          <InternalLink to="/examples/expanding-rows">row expansion</InternalLink>,{' '}
          <InternalLink to="/examples/nested-tables">nesting</InternalLink>,{' '}
          <InternalLink to="/examples/row-dragging">drag-and-drop row reordering</InternalLink> and{' '}
          <InternalLink to="/examples/complex-usage-scenario">more</InternalLink>
        </Feature>
        <Feature icon={IconLifebuoy} title="TypeScript-based">
          The entire codebase is <ExternalLink to={REPO_LINK}>written in TypeScript</ExternalLink> and all options are{' '}
          <InternalLink to="/type-definitions">well typed</InternalLink> and documented with JSDoc, so you can build
          type-safe applications with confidence
        </Feature>
        <Feature icon={IconScale} title="Free and open-source">
          Released under the <ExternalLink to={LICENSE_LINK}>MIT license</ExternalLink>, same as{' '}
          <ExternalLink to={MANTINE_LINK}>Mantine</ExternalLink>, so you’re free to use it in any project, commercial or
          not
        </Feature>
        <Feature icon={IconRocket} title="Use anywhere">
          Works with any modern React framework supported by <ExternalLink to={MANTINE_LINK}>Mantine</ExternalLink>,
          such as <ExternalLink to={NEXTJS_LINK}>Next.js</ExternalLink>,{' '}
          <ExternalLink to={VITE_LINK}>Vite</ExternalLink>,{' '}
          <ExternalLink to="https://reactrouter.com">React Router</ExternalLink> or{' '}
          <ExternalLink to={GATSBY_LINK}>Gatsby</ExternalLink>
        </Feature>
      </Flex>
      <HomePageButtons />
    </Stack>
  );
}
