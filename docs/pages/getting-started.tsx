import { Code, Container, createStyles } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Terminal2 } from 'tabler-icons-react';
import ExampleContainer from '~/components/ExampleContainer';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import GettingStartedExample from '~/examples/GettingStartedExample';
import readCodeExample from '~/lib/readCodeExample';

const useStyles = createStyles((theme) => ({
  tab: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
  },
}));

const PATH = 'getting-started';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/GettingStartedExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { classes } = useStyles();

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If you&apos;re using Next.js, Vite, Create React App, Remix or Gatsby, make sure to have a look at{' '}
        <ExternalLink to="https://mantine.dev/pages/getting-started/">Getting started with Mantine</ExternalLink> page.
      </PageText>
      <PageText>
        Mantine DataTable depends on <Code>@mantine/core</Code>, <Code>@mantine/hooks</Code> and <Code>lodash</Code>.
        <br />
        Mantine also depends on <Code>@emotion/react</Code> (and <Code>@emotion/server</Code> when used with SSR
        frameworks).
        <br />
      </PageText>
      <PageText>Install dependencies:</PageText>
      <Prism.Tabs defaultValue="yarn">
        <Prism.TabsList>
          <Prism.Tab className={classes.tab} value="yarn" icon={<Terminal2 width={16} height={16} />}>
            yarn
          </Prism.Tab>
          <Prism.Tab className={classes.tab} value="npm" icon={<Terminal2 width={16} height={16} />}>
            npm
          </Prism.Tab>
        </Prism.TabsList>
        <Prism.Panel language="bash" value="yarn">
          {'yarn add @mantine/core @mantine/hooks @emotion/react lodash mantine-datatable'}
        </Prism.Panel>
        <Prism.Panel language="bash" value="npm">
          {'npm i @mantine/core @mantine/hooks @emotion/react lodash mantine-datatable'}
        </Prism.Panel>
      </Prism.Tabs>
      <PageText>You can now import and use the component in your application like so:</PageText>
      <Prism language="typescript">{code}</Prism>
      <PageText>The code above will produce the following result:</PageText>
      <ExampleContainer>
        <GettingStartedExample />
      </ExampleContainer>
      <PageText>
        Please <InternalLink to="/getting-started">learn the basics</InternalLink> to get familiar with core Mantine
        DataTable concepts, refer to <InternalLink to="/component-properties">component properies</InternalLink> page to
        see the full list of available properties and browse the code examples to see the component in action.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
