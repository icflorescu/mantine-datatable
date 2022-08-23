import { Code, Container, createStyles } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { Terminal2 } from 'tabler-icons-react';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';

const useStyles = createStyles((theme) => ({
  tab: {
    background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
  },
}));

const PATH = 'getting-started';

const code = `
import { DataTable } from 'mantine-datatable';

export default function UnitedStatesPresidentsTable() {
  return (
    <DataTable
      columns={[{ propertyName: 'name' }, { propertyName: 'bornIn' }, { propertyName: 'party' }]}
      records={[
        { id: 1, name: 'Joe Biden', bornIn: 1942, party: 'Democratic' },
        { id: 2, name: 'Donald Trump', bornIn: 1946, party: 'Republican' },
        { id: 3, name: 'Barack Obama', bornIn: 1961, party: 'Democratic' },
        { id: 4, name: 'George W. Bush', bornIn: 1946, party: 'Republican' },
        { id: 5, name: 'Bill Clinton', bornIn: 1946, party: 'Democratic' },
        { id: 6, name: 'George H. W. Bush', bornIn: 1924, party: 'Republican' },
        { id: 7, name: 'Ronald Reagan', bornIn: 1911, party: 'Republican' },
        { id: 8, name: 'Jimmy Carter', bornIn: 1924, party: 'Democratic' },
        { id: 9, name: 'Gerald Ford', bornIn: 1913, party: 'Republican' },
        { id: 10, name: 'Richard Nixon', bornIn: 1913, party: 'Republican' },
      ]}
    />
  );
}`;

export default function Page() {
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
      <Prism language="tsx">{code}</Prism>
      <PageNavigation of={PATH} />
    </Container>
  );
}
