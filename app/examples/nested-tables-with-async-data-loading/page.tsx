import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { NestedTablesAsyncExample } from './NestedTablesAsyncExample';

const PATH: Route = '/examples/nested-tables-with-async-data-loading';

export const metadata = getRouteMetadata(PATH);

export default async function NestedTablesWithAsyncDataLoadingExamplePage() {
  const code = await allPromiseProps({
    'NestedTablesAsyncExample.tsx': readCodeFile<string>(`${PATH}/NestedTablesAsyncExample.tsx`),
    'NestedTablesAsyncExample.module.css': readCodeFile<string>(`${PATH}/NestedTablesAsyncExample.module.css`),
    'dataAsync.ts': readCodeFile<string>('/../data/nestedAsync.ts'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Since the row expansion <Code>content</Code> function is <em>lazily executed</em> when a row is expanded to
        prevent creating unnecessary DOM elements, you can use this behavior to asynchronously load data for nested
        tables.
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
      <Txt>Click on the expandable rows in the table below to see it in action:</Txt>
      <NestedTablesAsyncExample />
      <Txt>The above example is implemented with the following code:</Txt>
      <CodeBlock
        tabs={{
          code,
          keys: ['NestedTablesAsyncExample.tsx', 'NestedTablesAsyncExample.module.css', 'dataAsync.ts'],
        }}
      />
      <Txt>
        Head over to{' '}
        <InternalLink to="/examples/nested-tables-with-async-data-loading-and-sorting">the next example</InternalLink>{' '}
        to see how you could combine this behavior with sorting.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
