import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { InfiniteScrollingExample } from './InfiniteScrollingExample';

const PATH: Route = '/examples/infinite-scrolling';

export const metadata = getRouteMetadata(PATH);

export default async function InfiniteScrollingExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/InfiniteScrollingExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>Scroll the table to the bottom to see it in action:</Txt>
      <InfiniteScrollingExample />
      <Txt>
        The DataTable triggers <Code>onScrollToTop</Code>, <Code>onScrollToBottom</Code>, <Code>onScrollToRight</Code>{' '}
        and <Code>onScrollToLeft</Code> callbacks when user scrolls to the top, bottom, left or right edge of the table.
        You can use the <Code>onScrollToBottom</Code> event to implement infinite scrolling, like so:
      </Txt>
      <CodeBlock code={code} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
