import { Container, Text, createStyles } from '@mantine/core';
import { IconLifebuoy, IconRocket, IconScale, IconSettings } from '@tabler/icons-react';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import HomePageButtons from '~/components/homePage/HomePageButtons';
import HomePageFeature from '~/components/homePage/HomePageFeature';
import HomePageQuote from '~/components/homePage/HomePageQuote';
import HomePageSubtitle from '~/components/homePage/HomePageSubtitle';
import HomePageTitle from '~/components/homePage/HomePageTitle';
import {
  CRA_LINK,
  GATSBY_LINK,
  LICENSE_LINK,
  MANTINE_LINK,
  NEXTJS_LINK,
  REMIX_LINK,
  REPO_LINK,
  VITE_LINK,
} from '~/config';

const useStyles = createStyles((theme) => ({
  root: {
    maxWidth: 640,
    margin: '0 auto',
  },
  image: {
    overflow: 'hidden',
    borderRadius: theme.radius.sm,
  },
  subtitle: {
    margin: '1em 0',
    fontWeight: 700,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[8],
    [`@media (min-width: ${theme.breakpoints.xs})`]: {
      fontWeight: 500,
      fontSize: 20,
    },
    [`@media (min-width: ${theme.breakpoints.sm})`]: {
      fontSize: 24,
    },
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    columnGap: `calc(${theme.spacing.lg} * 2)`,
    [`@media (min-width: ${theme.breakpoints.xs})`]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: `calc(${theme.spacing.lg} * 2)`,
    },
  },
}));

export default function Page() {
  const { classes } = useStyles();
  return (
    <Container>
      <div className={classes.root}>
        <HomePageTitle />
        <HomePageSubtitle />
        <div className={classes.image}>
          <img src={`${process.env.BASE_PATH}/mantine-datatable.png`} alt="Mantine DataTable supports dark mode" />
        </div>
        <Text className={classes.subtitle}>
          Mantine DataTable is a{' '}
          <ExternalLink to="https://bundlephobia.com/package/mantine-datatable">lightweight</ExternalLink>,
          dependency-free component that brings datagrid-like functionality to your data-rich user interfaces. Features{' '}
          <InternalLink to="/examples/row-context-menu">context-menu support</InternalLink> and{' '}
          <InternalLink to="/examples/records-selection">
            intuitive Gmail-style additive batch rows selection
          </InternalLink>{' '}
          out of the box.
        </Text>
        <HomePageQuote />
        <div className={classes.features}>
          <HomePageFeature icon={IconSettings} title="Feature rich">
            Supports <InternalLink to="/examples/asynchronous-data-loading">asynchronous data loading</InternalLink>,{' '}
            <InternalLink to="/examples/pagination">pagination</InternalLink>,{' '}
            <InternalLink to="/examples/records-selection">multiple rows selection</InternalLink>,{' '}
            <InternalLink to="/examples/sorting">column sorting</InternalLink>,{' '}
            <InternalLink to="/examples/column-properties">custom cell data rendering</InternalLink>,{' '}
            <InternalLink to="/examples/row-context-menu">row context menu</InternalLink>,{' '}
            <InternalLink to="/examples/expanding-rows">row expansion</InternalLink>,{' '}
            <InternalLink to="/examples/nested-tables">nesting</InternalLink> and more
          </HomePageFeature>
          <HomePageFeature icon={IconLifebuoy} title="Typescript based">
            The entire codebase is <ExternalLink to={REPO_LINK}>written in TypeScript</ExternalLink>, component
            properties are <InternalLink to="/component-properties">well typed</InternalLink> and documented with JSDoc,
            so you can build type-safe applications with confidence
          </HomePageFeature>
          <HomePageFeature icon={IconScale} title="Free and open-source">
            The package is released under the <ExternalLink to={LICENSE_LINK}>MIT license</ExternalLink>, same as{' '}
            <ExternalLink to={MANTINE_LINK}>Mantine library</ExternalLink>, so you can freely build fantastic data-rich
            applications with it
          </HomePageFeature>
          <HomePageFeature icon={IconRocket} title="Use anywhere">
            You can use it in any modern React framework supported by{' '}
            <ExternalLink to={MANTINE_LINK}>Mantine</ExternalLink>, such as{' '}
            <ExternalLink to={NEXTJS_LINK}>Next.js</ExternalLink>, <ExternalLink to={VITE_LINK}>Vite</ExternalLink>,{' '}
            <ExternalLink to={CRA_LINK}>Create React App</ExternalLink>,{' '}
            <ExternalLink to={REMIX_LINK}>Remix</ExternalLink> or <ExternalLink to={GATSBY_LINK}>Gatsby</ExternalLink>
          </HomePageFeature>
        </div>
        <HomePageButtons />
      </div>
    </Container>
  );
}
