import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import InfiniteScrollingExample from '~/examples/InfiniteScrollingExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/infinite-scrolling';

export const getStaticProps: GetStaticProps<{
  code: { 'InfiniteScrollingExample.tsx': string; 'employees.json': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'InfiniteScrollingExample.tsx': readCodeExample('examples/InfiniteScrollingExample.tsx') as Promise<string>,
      'employees.json': readCodeExample('data/employees.json') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Scroll to the bottom of the table to see it in action:</PageText>
      <InfiniteScrollingExample />
      <PageText>
        The <Code>DataTable</Code> triggers <Code>onScrollToTop</Code>, <Code>onScrollToBottom</Code>,{' '}
        <Code>onScrollToRight</Code> and <Code>onScrollToLeft</Code> callbacks when user scrolls to the top, bottom,
        left or right edge of the table. You can use the <Code>onScrollToBottom</Code> event to implement infinite
        scrolling, like so:
      </PageText>
      <CodeBlockTabs
        items={[
          {
            title: 'InfiniteScrollingExample.tsx',
            language: 'typescript',
            content: code['InfiniteScrollingExample.tsx'],
          },
          { title: 'employees.json', language: 'json', content: code['employees.json'] },
        ]}
      />
      <PageNavigation of={PATH} />
    </Container>
  );
}
