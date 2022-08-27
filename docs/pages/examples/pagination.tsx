import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import PaginationExample from '~/examples/PaginationExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/pagination';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/PaginationExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <ExampleContainer height={300}>
        <PaginationExample />
      </ExampleContainer>
      <PageText>
        You can enable pagination by specifying the following component properties: <Code>page</Code>,{' '}
        <Code>onPageChange</Code>, <Code>totalRecords</Code>, and <Code>recordsPerPage</Code>.
      </PageText>
      <PageText>Consider the example below:</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
