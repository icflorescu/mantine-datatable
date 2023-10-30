import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
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
