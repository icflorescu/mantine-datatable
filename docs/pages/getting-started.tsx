import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import CodeFiles from '~/components/CodeBlockTabs';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import GettingStartedExample from '~/examples/GettingStartedExample';
import { getFirstExamplePagePath } from '~/lib/page';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'getting-started';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/GettingStartedExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If you&apos;re using Next.js, Vite, Create React App, Remix or Gatsby, make sure to have a look at{' '}
        <ExternalLink to="https://mantine.dev/pages/getting-started/">Getting started with Mantine</ExternalLink> page.
      </PageText>
      <PageText>
        Mantine DataTable depends on <Code>@mantine/core</Code> and <Code>@mantine/hooks</Code>.
        <br />
        Mantine also depends on <Code>@emotion/react</Code> (and <Code>@emotion/server</Code> when used with SSR
        frameworks).
        <br />
      </PageText>
      <PageText>Install the package and its dependencies:</PageText>
      <CodeFiles
        items={[
          {
            title: 'yarn',
            language: 'bash',
            content: 'yarn add @mantine/core @mantine/hooks @emotion/react mantine-datatable',
          },
          {
            title: 'pnpm',
            language: 'bash',
            content: 'pnpm i @mantine/core @mantine/hooks @emotion/react mantine-datatable',
          },
          {
            title: 'npm',
            language: 'bash',
            content: 'npm i @mantine/core @mantine/hooks @emotion/react mantine-datatable',
          },
        ]}
      />
      <PageText>Then you can import the component and use it in your application like so:</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <GettingStartedExample />
      <PageText>
        Have a look at the list of <InternalLink to="/component-properties">component properties</InternalLink> and{' '}
        <InternalLink to={getFirstExamplePagePath()}>browse the code examples</InternalLink> to see the component in
        action and learn how to use it.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
