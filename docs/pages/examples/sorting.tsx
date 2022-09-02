import { Box, Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
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
      <Box sx={{ height: 300 }}>
        <SortingExample />
      </Box>
      <PageText>
        In order to enable sorting, you’ll have to:
        <ul>
          <li>
            add a <Code>sortable: true</Code> property to each sorting candidate column;
          </li>
          <li>
            add a <Code>sortStatus</Code> property to the <Code>DataTable</Code> component, pointing to an object
            describing the current sort status;
          </li>
          <li>
            add a handler called <Code>onSortStatusChange</Code> to the <Code>DataTable</Code> to perform the required
            action when a sortable column header is clicked.
          </li>
        </ul>
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
