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
        There is no dedicated “tree table” component, but you can easily build nested tables by combining the{' '}
        <InternalLink to="/examples/expanding-rows">row expansion</InternalLink> feature with{' '}
        <InternalLink to="/examples/basic-table-properties">
          the <Code>noHeader</Code> property
        </InternalLink>
        : each expanded row renders a header-less DataTable whose columns line up with the ones of its parent.
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
      <NestedTablesExample />
      <Txt>A few things worth noting about the implementation:</Txt>
      <UnorderedList>
        <li>
          Each level keeps its expanded record IDs in state and passes them to <Code>rowExpansion.expanded</Code> (
          <Code>recordIds</Code> and <Code>onRecordIdsChange</Code>). Controlling the expansion state this way lets the
          column <Code>render</Code> functions know which rows are expanded, so they can rotate the chevron icons
          accordingly.
        </li>
        <li>
          <Code>allowMultiple: true</Code> lets the user expand several companies or departments at the same time.
        </li>
        <li>
          Nested tables use the same fixed <Code>width</Code> for the last column as their parent, so the columns stay
          aligned, while a left margin on the first cell content gives each level a visual indentation.
        </li>
        <li>
          If some of your records have no children, use the <Code>rowExpansion.expandable</Code> function to prevent
          users from expanding them.
        </li>
      </UnorderedList>
      <Txt>Here is the code:</Txt>
      <CodeBlock tabs={{ code, keys: ['NestedTablesExample.tsx', 'NestedTablesExample.module.css', 'data.ts'] }} />
      <Txt>
        Head over to <InternalLink to="/examples/nested-tables-with-async-data-loading">the next example</InternalLink>{' '}
        to see how you can load nested table data asynchronously.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
