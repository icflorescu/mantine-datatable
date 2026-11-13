import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { NestedTablesAsyncSortingExample } from './NestedTablesAsyncSortingExample';

const PATH: Route = '/examples/nested-tables-with-async-data-loading-and-sorting';

export const metadata = getRouteMetadata(PATH);

export default async function NestedTablesWithAsyncDataLoadingAndSortingExamplePage() {
  const code = await allPromiseProps({
    'NestedTablesAsyncSortingExample.tsx': readCodeFile<string>(`${PATH}/NestedTablesAsyncSortingExample.tsx`),
    'NestedTablesAsyncSortingExample.module.css': readCodeFile<string>(
      `${PATH}/NestedTablesAsyncSortingExample.module.css`
    ),
    'dataAsync.ts': readCodeFile<string>('/../data/nestedAsync.ts'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Building on the{' '}
        <InternalLink to="/examples/nested-tables-with-async-data-loading">previous example</InternalLink>, here is how
        you can combine <InternalLink to="/examples/asynchronous-data-loading">asynchronous data loading</InternalLink>{' '}
        with <InternalLink to="/examples/sorting">sorting</InternalLink> in nested tables.
      </Txt>
      <Txt warning title="Warning">
        Nested tables do not work with column pinning &mdash;{' '}
        <InternalLink to="/examples/pinning-the-first-column">
          <Code>pinFirstColumn</Code>
        </InternalLink>{' '}
        and{' '}
        <InternalLink to="/examples/pinning-the-last-column">
          <Code>pinLastColumn</Code>
        </InternalLink>
        .
      </Txt>
      <Txt>Click the column headers and the expandable rows in the table below to see it in action:</Txt>
      <NestedTablesAsyncSortingExample />
      <Txt>How it works:</Txt>
      <UnorderedList>
        <li>
          Only the top-level table has a header, so it owns the <Code>sortStatus</Code> state and is the only one
          receiving an <Code>onSortStatusChange</Code> handler.
        </li>
        <li>
          The sort status is passed down as a prop to the nested table components, which include it in their data
          requests; this way, the expanded departments and employees are re-sorted as soon as the user clicks a column
          header. Each data source decides how to interpret the sorted column &mdash; for instance, the second column
          sorts companies and departments by their employee count and employees by their birth date.
        </li>
        <li>
          The nested tables use <Code>fetching={'{loading && !records.length}'}</Code>, so the loader is only displayed
          during the initial load. When re-sorting, the current rows stay visible until the newly sorted ones arrive,
          avoiding a flood of loaders across all the expanded levels.
        </li>
      </UnorderedList>
      <Txt>Here is the code:</Txt>
      <CodeBlock
        tabs={{
          code,
          keys: ['NestedTablesAsyncSortingExample.tsx', 'NestedTablesAsyncSortingExample.module.css', 'dataAsync.ts'],
        }}
      />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
