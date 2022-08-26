import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import SortingExample from '~/examples/SortingExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/sorting';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/SortingExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        In order to enable sorting, you’ll have to:
        <ul>
          <li>
            set <Code>sortable: true</Code> on each sorting candidate column;
          </li>
          <li>
            add a <Code>sortStatus</Code>property on the <Code>DataTable</Code> component equal to an object describing
            the current sort status;
          </li>
          <li>
            add an <Code>onSortStatusChange</Code> handler to perform the required action when a sortable column header
            is clicked.
          </li>
        </ul>
      </PageText>
      <PageText>Consider the example below:</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <ExampleContainer height={300}>
        <SortingExample />
      </ExampleContainer>
      <PageNavigation of={PATH} />
    </Container>
  );
}
