import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
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
        Here is how you can combine{' '}
        <InternalLink to="/examples/asynchronous-data-loading">asynchronous data loading</InternalLink> with{' '}
        <InternalLink to="/examples/sorting">sorting</InternalLink> in nested tables.
      </Txt>
      <Txt warning title="Warning">
        Nested tables do not work with column pinning -{' '}
        <InternalLink to="/examples/pinning-the-first-column">
          <Code>pinFirstColumn</Code>
        </InternalLink>{' '}
        and{' '}
        <InternalLink to="/examples/pinning-the-last-column">
          <Code>pinLastColumn</Code>
        </InternalLink>
        .
      </Txt>
      <Txt>Click on the column headers and the expandable rows in the table below to see it in action:</Txt>
      <NestedTablesAsyncSortingExample />
      <Txt>The above example is implemented with the following code:</Txt>
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
