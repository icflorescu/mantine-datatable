import { Button, Container, createStyles, Group, Text, Title } from '@mantine/core';
import Link from 'next/link';
import { BrandGithub, Lifebuoy, Rocket, Scale, Settings } from 'tabler-icons-react';
import HomePageFeature from '~/components/HomePageFeature';
import { REPO_LINK } from '~/config';

const useStyles = createStyles((theme) => ({
  title: {
    marginBottom: '.75em',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[8],
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      marginTop: '.33em',
      lineHeight: 1.1,
      fontSize: 52,
    },
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 64,
    },
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      marginTop: '.66em',
    },
  },
  gradientText: {
    background: theme.fn.gradient({ from: theme.colors.blue[6], to: theme.colors.cyan[6] }),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  image: {
    overflow: 'hidden',
    borderRadius: theme.radius.sm,
  },
  subtitle: {
    margin: '2em 0',
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: 20,
    },
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: 24,
    },
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.lg,
    columnGap: theme.spacing.lg * 2,
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      rowGap: theme.spacing.lg * 2,
    },
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '80%',
    },
  },
  buttons: {
    margin: '2em 0 0',
    [`@media (min-width: ${theme.breakpoints.xs}px)`]: {
      margin: '3em 0 1em',
      gap: theme.spacing.xl,
    },
  },
}));

export default function Page() {
  const { classes } = useStyles();
  return (
    <Container>
      <Title className={classes.title} order={2}>
        A table component
        <br />
        for your Mantine
        <br />
        <span className={classes.gradientText}>data-rich applications.</span>
      </Title>
      <div className={classes.image}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${process.env.BASE_PATH}/mantine-datatable.png`}
          alt="Mantine DataTable dark mode support"
          title="Mantine DataTable supports dark mode"
        />
      </div>
      <Text className={classes.subtitle}>Build data-rich interfaces faster than ever with Mantine DataTable.</Text>
      <div className={classes.features}>
        <HomePageFeature icon={Scale} title="Free and open-source">
          This package is released under the MIT license, same as Mantine, so you can freely build fantastic
          applications with it
        </HomePageFeature>
        <HomePageFeature icon={Lifebuoy} title="Typescript based">
          The entire codebase is written in typescript and component properties are well documented, so you can build
          type safe applications with confidence
        </HomePageFeature>
        <HomePageFeature icon={Settings} title="Feature rich">
          Asynchronous data loading support, pagination, multiple rows selection, column sorting, custom cell data
          rendering, row context menu and more
        </HomePageFeature>
        <HomePageFeature icon={Rocket} title="Use anywhere">
          You can use this component in any modern framework supported by Mantine, such as Next.js, Vite, Create React
          App, Remix or Gatsby
        </HomePageFeature>
      </div>
      <Group className={classes.buttons}>
        <Link href="/getting-started" passHref>
          <Button
            size="md"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            leftIcon={<Rocket />}
            component="a"
          >
            Get started
          </Button>
        </Link>
        <Button
          size="md"
          variant="gradient"
          gradient={{ from: 'gray.6', to: 'gray.5' }}
          leftIcon={<BrandGithub />}
          component="a"
          href={REPO_LINK}
          target="_blank"
        >
          View code
        </Button>
      </Group>
    </Container>
  );
}
