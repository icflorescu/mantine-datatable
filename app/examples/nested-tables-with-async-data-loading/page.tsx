import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
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
        The row expansion <Code>content</Code> function is <em>lazily executed</em> &mdash; it only runs when a row is
        expanded, so no unnecessary DOM elements are created. You can take advantage of this to load the data of nested
        tables on demand, only when the user actually needs it.
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
      <Txt>Click the expandable rows in the table below to see it in action:</Txt>
      <NestedTablesAsyncExample />
      <Txt>
        Compared to the <InternalLink to="/examples/nested-tables">synchronous version</InternalLink>, each nested level
        is now a separate component (<Code>DepartmentsTable</Code> and <Code>EmployeesTable</Code>) that loads its own
        records when it mounts and passes the loading state to the <Code>fetching</Code> property. A{' '}
        <Code>minHeight</Code> on the nested tables leaves enough room for the{' '}
        <InternalLink to="/examples/asynchronous-data-loading">loader</InternalLink> to be visible while data is being
        fetched.
      </Txt>
      <Txt info title="Good to know">
        The content of a collapsed row is unmounted once the collapse animation ends, so expanding the same row again
        will trigger a new request. If you want to avoid that, cache the results with a data-fetching library such as{' '}
        <ExternalLink to="https://tanstack.com/query/latest">TanStack Query</ExternalLink> (see the{' '}
        <InternalLink to="/examples/complex-usage-scenario">complex usage scenario</InternalLink> example).
      </Txt>
      <Txt>Here is the code:</Txt>
      <CodeBlock
        tabs={{
          code,
          keys: ['NestedTablesAsyncExample.tsx', 'NestedTablesAsyncExample.module.css', 'dataAsync.ts'],
        }}
      />
      <Txt>
        Head over to{' '}
        <InternalLink to="/examples/nested-tables-with-async-data-loading-and-sorting">the next example</InternalLink>{' '}
        to see how you can combine this technique with sorting.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
