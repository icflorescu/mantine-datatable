import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import NestedTablesExampleAsync from '~/examples/NestedTablesExampleAsync';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/nested-tables-with-async-data-loading';

type ExampleBlockName = 'useStyles' | 'Example' | 'DepartmentsTable' | 'EmployeesTable';

export const getStaticProps: GetStaticProps<{
  code: { example: Record<ExampleBlockName, string>; data: string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      example: readCodeExample('examples/NestedTablesExampleAsync.tsx') as Promise<Record<ExampleBlockName, string>>,
      data: readCodeExample('data/nested.ts') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Since the row expansion <Code>content</Code> function is <em>lazily executed</em> when a row is expanded to
        prevent creating unnecessary DOM elements, you can use this behavior to asynchronously load data for nested
        tables.
        <br />
        Click on the expandable rows in the table below to see it in action:
      </PageText>
      <NestedTablesExampleAsync />
      <CodeBlockTabs
        items={[
          {
            title: 'Example.tsx',
            language: 'typescript',
            content: code.example['Example'],
          },
          {
            title: 'DepartmentsTable.tsx',
            language: 'typescript',
            content: code.example['DepartmentsTable'],
          },
          {
            title: 'EmployeesTable.tsx',
            language: 'typescript',
            content: code.example['EmployeesTable'],
          },
          { title: 'useStyles.ts', language: 'typescript', content: code.example['useStyles'] },
          { title: 'data.ts', language: 'typescript', content: code.data },
        ]}
      />
      <PageText>
        Head over to{' '}
        <InternalLink to="/examples/nested-tables-with-async-data-loading-and-sorting">the next example</InternalLink>{' '}
        to see how you could combine this behavior with sorting.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
