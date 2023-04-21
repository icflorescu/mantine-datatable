import { Container, createStyles, Text } from '@mantine/core';
import { IconLifebuoy, IconRocket, IconScale, IconSettings } from '@tabler/icons-react';
import HomePageButtons from '~/components/homePage/HomePageButtons';
import HomePageFeature from '~/components/homePage/HomePageFeature';
import HomePageTitle from '~/components/homePage/HomePageTitle';

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
    margin: '1em 0 2em',
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
        <div className={classes.image}>
          <img src={`${process.env.BASE_PATH}/mantine-datatable.png`} alt="Mantine DataTable supports dark mode" />
        </div>
        <Text className={classes.subtitle}>
          Mantine DataTable brings datagrid-like functionality to your data-rich user interfaces.
        </Text>
        <div className={classes.features}>
          <HomePageFeature icon={IconSettings} title="Feature rich">
            Supports asynchronous data loading, pagination, multiple rows selection, column sorting, custom cell data
            rendering, row context menu, row expansion, dark theme and more
          </HomePageFeature>
          <HomePageFeature icon={IconLifebuoy} title="Typescript based">
            The entire codebase is written in TypeScript, component properties are well typed and documented with JSDoc,
            so you can build type safe applications with confidence
          </HomePageFeature>
          <HomePageFeature icon={IconScale} title="Free and open-source">
            This package is released under the MIT license, same as Mantine, so you can freely build fantastic data-rich
            applications with it
          </HomePageFeature>
          <HomePageFeature icon={IconRocket} title="Use anywhere">
            You can use this component in any modern React framework supported by Mantine, such as Next.js, Vite, Create
            React App, Remix or Gatsby
          </HomePageFeature>
        </div>
        <HomePageButtons />
      </div>
    </Container>
  );
}
