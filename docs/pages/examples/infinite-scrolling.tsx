import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import InfiniteScrollingExample from '~/examples/InfiniteScrollingExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/infinite-scrolling';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/InfiniteScrollingExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>See it in action:</PageText>
      <InfiniteScrollingExample />
      <PageText>
        The <Code>DataTable</Code> triggers <Code>onScrollToTop</Code>, <Code>onScrollToBottom</Code>,{' '}
        <Code>onScrollToRight</Code> and <Code>onScrollToLeft</Code> callbacks when user scrolls to the top, bottom,
        left or right edge of the table. You can use the <Code>onScrollToBottom</Code> event to implement infinite
        scrolling, like so:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
