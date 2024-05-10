import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { NestedTablesExample } from './NestedTablesExample';

const PATH: Route = '/examples/nested-tables';

export const metadata = getRouteMetadata(PATH);

export default async function NestedTablesExamplePage() {
  const code = await allPromiseProps({
    'NestedTablesExample.tsx': readCodeFile<string>(`${PATH}/NestedTablesExample.tsx`),
    'NestedTablesExample.module.css': readCodeFile<string>(`${PATH}/NestedTablesExample.module.css`),
    'data.ts': readCodeFile<string>('/../data/nested.ts'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        You can abuse the <InternalLink to="/examples/expanding-rows">row expansion</InternalLink> feature and make use
        of{' '}
        <InternalLink to="/examples/basic-table-properties">
          the <Code>noHeader</Code> property
        </InternalLink>{' '}
        to create nested tables.
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
      <NestedTablesExample />
      <Txt>The above example is implemented with the following code:</Txt>
      <CodeBlock tabs={{ code, keys: ['NestedTablesExample.tsx', 'NestedTablesExample.module.css', 'data.ts'] }} />
      <Txt>
        Head over to <InternalLink to="/examples/nested-tables-with-async-data-loading">the next example</InternalLink>{' '}
        to see how you could asynchronously load data for nested tables.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
