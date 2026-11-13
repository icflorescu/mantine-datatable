import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
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
        The DataTable invokes the <Code>onScrollToTop</Code>, <Code>onScrollToBottom</Code>, <Code>onScrollToLeft</Code>{' '}
        and <Code>onScrollToRight</Code> callbacks when the user scrolls to the top, bottom, left or right edge of the
        table, respectively. Each callback is invoked once, when the corresponding edge is reached; scrolling away and
        back again triggers it anew. There’s also an <Code>onScroll</Code> callback, invoked with the current scroll
        position (<Code>{'{ x: number; y: number }'}</Code>) whenever the table is scrolled.
      </Txt>
      <Txt>To implement infinite scrolling:</Txt>
      <UnorderedList compact>
        <li>
          make the table <InternalLink to="/examples/scrollable-vs-auto-height">vertically scrollable</InternalLink> by
          setting its <Code>height</Code> or placing it inside a height-restricted container;
        </li>
        <li>
          load the next batch of records in the <Code>onScrollToBottom</Code> handler and append it to the existing
          records;
        </li>
        <li>
          set the <Code>fetching</Code> property to <Code>true</Code> while loading, to display the{' '}
          <InternalLink to="/examples/asynchronous-data-loading">loader</InternalLink>;
        </li>
        <li>
          optionally, use the <Code>scrollViewportRef</Code> property to get hold of the scrollable viewport element,
          e.g. to scroll back to the top when the records are reset.
        </li>
      </UnorderedList>
      <CodeBlock code={code} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
