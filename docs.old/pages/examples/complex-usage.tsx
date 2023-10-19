import { Container } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ComplexUsageExample from '~/examples/ComplexUsageExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/complex-usage';

export const getStaticProps: GetStaticProps<{
  code: { 'ComplexUsageExample.tsx': string; 'data/index.ts': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'ComplexUsageExample.tsx': readCodeExample('examples/ComplexUsageExample.tsx') as Promise<string>,
      'data/index.ts': readCodeExample('data/index.ts') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const queryClient = new QueryClient();

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Here is a complex usage scenario featuring custom column definitions, asynchronous data loading with{' '}
        <ExternalLink to="https://tanstack.com/query/v4/docs/adapters/react-query">TanStack React Query</ExternalLink>,
        sorting, pagination, custom cell data rendering, multiple row selection, and row context-menu.
      </PageText>
      <QueryClientProvider client={queryClient}>
        <ComplexUsageExample />
      </QueryClientProvider>
      <CodeBlockTabs
        items={[
          { title: 'ComplexUsageExample.tsx', language: 'typescript', content: code['ComplexUsageExample.tsx'] },
          { title: 'data/index.ts', language: 'typescript', content: code['data/index.ts'] },
        ]}
      />
      <PageNavigation of={PATH} />
    </Container>
  );
}
