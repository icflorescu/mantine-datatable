import { Code, Container, Paper, Switch } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import AutoHeightExample from '~/examples/scrollable-vs-auto-height/AutoHeightExample';
import ScrollableExample from '~/examples/scrollable-vs-auto-height/ScrollableExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/scrollable-vs-auto-height';

export const getStaticProps: GetStaticProps<{
  code: { 'ScrollableExample.tsx': string; 'AutoHeightExample.tsx': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'ScrollableExample.tsx': readCodeExample(
        'examples/scrollable-vs-auto-height/ScrollableExample.tsx'
      ) as Promise<string>,
      'AutoHeightExample.tsx': readCodeExample(
        'examples/scrollable-vs-auto-height/AutoHeightExample.tsx'
      ) as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [scrollable, setScrollable] = useState(true);

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Try the interactive example below to see the feature it in action:</PageText>
      <Paper my="xl" p="sm" withBorder>
        <Switch
          label="Place component in a height-restricted container to make it vertically-scrollable"
          checked={scrollable}
          onChange={() => setScrollable((value) => !value)}
        />
      </Paper>
      <ExampleContainer>{scrollable ? <ScrollableExample /> : <AutoHeightExample />}</ExampleContainer>
      <PageText>
        The <Code>DataTable</Code> component embeds a{' '}
        <ExternalLink to="https://mantine.dev/core/scroll-area/">Mantine ScrollArea</ExternalLink> and has a default{' '}
        <Code>height</Code> of <Code>100%</Code>.
        <br />
        Thus, placing the component inside a height-restricted container will turn on its{' '}
        <em>“vertically scrollable behavior”</em>
        .
        <br />
      </PageText>
      <PageText info>
        The <Code>DataTable</Code> will always be <em>“horizontally-scrollable”</em> if its width it greater than its
        container width.
      </PageText>
      <CodeBlock language="typescript" content={code[scrollable ? 'ScrollableExample.tsx' : 'AutoHeightExample.tsx']} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
