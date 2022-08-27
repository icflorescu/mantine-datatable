import { Code, Container, Paper, Switch } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ScrollableVsDynamicHeightExample from '~/examples/ScrollableVsDynamicHeightExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/scrollable-vs-dynamic-height';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/ScrollableVsDynamicHeightExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [restrictHeight, setRestrictHeight] = useState(true);

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Try the interactive example below to see it in action:</PageText>
      <Paper my="xl" p="sm" withBorder>
        <Switch
          label="Restrict container height to make DataTable horizontaly-scrollable"
          checked={restrictHeight}
          onChange={() => setRestrictHeight((v) => !v)}
        />
      </Paper>
      <ExampleContainer>
        <ScrollableVsDynamicHeightExample restrictHeight={restrictHeight} />
      </ExampleContainer>
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
        The <Code>DataTable</Code> will always be <em>“horizontaly-scrollable”</em> if its width it greater than its
        container width.
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
