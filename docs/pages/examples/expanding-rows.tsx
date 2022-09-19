import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ExpandingRowsExample from '~/examples/ExpandingRowsExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/expanding-rows';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/ExpandingRowsExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText warning>
        This feature is work in progress.
        <br />
        Things may break or change.
        <br />
        Use at your own risk!
      </PageText>
      <PageText>Click on a row to see it in action:</PageText>
      <ExpandingRowsExample />
      <PageText>To be written...</PageText>
      <PageText warning>
        Row expansion feature doesn’t work well with <Code>stripped</Code> property.
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
