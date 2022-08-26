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
      <PageText>
        You can enable pagination by specifying the following component properties:
        <ul>
          <li>
            <Code>page</Code> (the current page number; 1-based)
          </li>
          <li>
            <Code>onPageChange</Code> (a callback method that gets called when the current page changes)
          </li>
          <li>
            <Code>totalRecords</Code> (the total number of records available in the dataset)
          </li>
          <li>
            <Code>recordsPerPage</Code> (the number of records displayed on a page)
          </li>
        </ul>
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <ExampleContainer height={300}>
        <PaginationExample />
      </ExampleContainer>
      <PageNavigation of={PATH} />
    </Container>
  );
}
