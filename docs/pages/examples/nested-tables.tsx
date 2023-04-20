import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import NestedTablesExample from '~/examples/NestedTablesExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/nested-tables';

export const getStaticProps: GetStaticProps<{
  code: { 'NestedTablesExample.tsx': string; 'data/nested.ts': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'NestedTablesExample.tsx': readCodeExample('examples/NestedTablesExample.tsx') as Promise<string>,
      'data/nested.ts': readCodeExample('data/nested.ts') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        You can abuse the <InternalLink to="/examples/expanding-rows">row expansion</InternalLink> feature and make use
        of <Code>noHeader</Code> property to create nested tables.
        <br />
        Click on the expandable rows in the table below to see it in action:
      </PageText>
      <NestedTablesExample />
      <CodeBlockTabs
        items={[
          { title: 'NestedTablesExample.tsx', language: 'typescript', content: code['NestedTablesExample.tsx'] },
          { title: 'data/nested.ts', language: 'typescript', content: code['data/nested.ts'] },
        ]}
      />
      <PageText>
        Head over to <InternalLink to="/examples/nested-tables-with-async-data-loading">the next example</InternalLink>{' '}
        to see how you could asynchronously load data for nested tables.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
