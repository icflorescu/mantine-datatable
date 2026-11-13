import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { ComplexUsageExample } from './ComplexUsageExample';
import { ComplexUsageExampleWrapper } from './ComplexUsageExampleWrapper';

const PATH: Route = '/examples/complex-usage-scenario';

export const metadata = getRouteMetadata(PATH);

export default async function ComplexUsageExamplePage() {
  const code = await allPromiseProps({
    'ComplexUsageExampleWrapper.tsx': readCodeFile<string>(`${PATH}/ComplexUsageExampleWrapper.tsx`),
    'ComplexUsageExample.tsx': readCodeFile<string>(`${PATH}/ComplexUsageExample.tsx`),
    'ComplexUsageExample.module.css': readCodeFile<string>(`${PATH}/ComplexUsageExample.module.css`),
    'data/index.ts': readCodeFile<string>('/../data/index.ts'),
    'data/async.ts': readCodeFile<string>('/../data/async.ts'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>Here is a more realistic example that brings together many {PRODUCT_NAME} features in a single table:</Txt>
      <UnorderedList compact>
        <li>
          <InternalLink to="/examples/asynchronous-data-loading">asynchronous data loading</InternalLink> with{' '}
          <ExternalLink to="https://tanstack.com/query/latest">TanStack Query</ExternalLink>, combined with server-side{' '}
          <InternalLink to="/examples/sorting">sorting</InternalLink> and{' '}
          <InternalLink to="/examples/pagination">pagination</InternalLink>;
        </li>
        <li>
          <InternalLink to="/examples/column-properties-and-styling">custom column definitions</InternalLink> with
          custom cell rendering and columns that are hidden on small screens via <Code>visibleMediaQuery</Code>;
        </li>
        <li>
          <InternalLink to="/examples/records-selection">multiple record selection</InternalLink>;
        </li>
        <li>
          <InternalLink to="/examples/expanding-rows">row expansion</InternalLink> showing additional employee details;
        </li>
        <li>
          a <InternalLink to="/examples/row-actions-cell">row actions cell</InternalLink> in a{' '}
          <InternalLink to="/examples/pinning-the-last-column">pinned last column</InternalLink>, opening a Mantine
          modal or showing a notification;
        </li>
        <li>
          a <InternalLink to="/examples/using-with-mantine-contextmenu">row context menu</InternalLink> whose items
          depend on the current selection (select a few rows, then right-click one of them).
        </li>
      </UnorderedList>
      <ComplexUsageExampleWrapper>
        <ComplexUsageExample />
      </ComplexUsageExampleWrapper>
      <Txt>
        Since this example uses TanStack Query, everything has to be wrapped in a <Code>QueryClientProvider</Code>:
      </Txt>
      <CodeBlock code={code['ComplexUsageExampleWrapper.tsx']} />
      <Txt>
        Note how the sort status and the page number are part of the query key, so changing either of them triggers a
        new request, and how <Code>placeholderData: keepPreviousData</Code> keeps the current records on screen while
        the next ones are loading. Also note that changing the sort order resets the table to the first page.
      </Txt>
      <Txt>Here is the code for the table itself:</Txt>
      <CodeBlock
        tabs={{
          code,
          keys: ['ComplexUsageExample.tsx', 'ComplexUsageExample.module.css', 'data/async.ts', 'data/index.ts'],
        }}
      />
      <Txt>Head over to the next page to learn about the {PRODUCT_NAME} type definitions.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
