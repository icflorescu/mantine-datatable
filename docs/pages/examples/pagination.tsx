import { Box, Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
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
      <Box sx={{ height: 300 }}>
        <PaginationExample />
      </Box>
      <PageText>
        You can enable pagination by adding the following component properties:
        <ul>
          <li>
            <Code>page</Code> - the current page number
          </li>
          <li>
            <Code>onPageChange</Code> - a callback that is executed when the user changes the current page
          </li>
          <li>
            <Code>totalRecords</Code> - the total number of records in the dataset
          </li>
          <li>
            <Code>recordsPerPage</Code> - the number of records per page
          </li>
        </ul>
      </PageText>
      <PageText>Consider the example below:</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
