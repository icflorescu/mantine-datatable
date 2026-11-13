import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import ResizingComplexExample from './ResizingComplexExample';
import ResizingExample from './ResizingExample';
import ResizingWithoutPersistenceExample from './ResizingWithoutPersistenceExample';

const PATH: Route = '/examples/column-resizing';

export const metadata = getRouteMetadata(PATH);

export default async function ColumnResizingExamplePage() {
  const code = await allPromiseProps({
    'ResizingExample.tsx': readCodeFile<string>(`${PATH}/ResizingExample.tsx`),
    'ResizingWithoutPersistenceExample.tsx': readCodeFile<string>(`${PATH}/ResizingWithoutPersistenceExample.tsx`),
    'ResizingComplexExample.tsx': readCodeFile<string>(`${PATH}/ResizingComplexExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} lets users resize columns by dragging a handle at the edge of a column header. Resized widths can
        optionally be persisted in the browser’s local storage, so they survive page reloads.
      </Txt>
      <ResizingExample />
      <Txt>
        In order to enable <strong>column resizing</strong> with persistent widths, you’ll have to:
      </Txt>
      <UnorderedList compact>
        <li>
          add a <Code>resizable: true</Code> property to each <strong>resizing candidate</strong> column;
        </li>
        <li>
          add a <Code>storeColumnsKey: &apos;your_key&apos;</Code> property to the DataTable (the column widths are
          persisted in local storage under this key);
        </li>
        <li>
          use the <Code>useDataTableColumns()</Code> hook with the same <Code>key</Code> to get the effective columns
          and the <Code>resetColumnsWidth()</Code> function.
        </li>
      </UnorderedList>
      <CodeBlock code={code['ResizingExample.tsx']} />
      <Txt>Here’s how resizing works:</Txt>
      <UnorderedList compact>
        <li>
          dragging a handle changes the width of the column <em>and</em> of the column next to it, so the overall table
          width stays the same;
        </li>
        <li>a column can’t be made narrower than 50 pixels;</li>
        <li>the last column has no resize handle, since there’s no column after it;</li>
        <li>double-clicking a handle resets the two adjacent columns to their default widths;</li>
        <li>
          calling <Code>resetColumnsWidth()</Code> restores all columns to the <Code>width</Code> they were defined with
          in the <Code>columns</Code> prop (or to automatic width, if they don’t have one).
        </li>
      </UnorderedList>
      <PageSubtitle value="Resizing without persistence" />
      <Txt>
        If you don’t need to remember the column widths, simply add <Code>resizable: true</Code> to the columns you want
        to make resizable &mdash; no <Code>storeColumnsKey</Code> or <Code>useDataTableColumns()</Code> hook required.
        The widths will be reset to their defaults when the component is remounted:
      </Txt>
      <ResizingWithoutPersistenceExample />
      <CodeBlock code={code['ResizingWithoutPersistenceExample.tsx']} />
      <Txt info>
        The functions returned by the <Code>useDataTableColumns()</Code> hook (such as <Code>resetColumnsWidth()</Code>)
        communicate with the DataTable through local storage, so they only take effect when the hook <Code>key</Code>{' '}
        matches the DataTable <Code>storeColumnsKey</Code>.
      </Txt>
      <PageSubtitle value="Combining resizing with other column features" />
      <Txt>
        Resizing can be combined with <InternalLink to="/examples/sorting">sorting</InternalLink>,{' '}
        <InternalLink to="/examples/records-selection">records selection</InternalLink>, as well as{' '}
        <InternalLink to="/examples/column-dragging-and-toggling">column dragging and toggling</InternalLink>. Widths,
        order and visibility are persisted under the same <Code>storeColumnsKey</Code>, and each can be reset
        independently. Notice how the example below avoids repetition by spreading a shared object into each column
        definition:
      </Txt>
      <ResizingComplexExample />
      <CodeBlock code={code['ResizingComplexExample.tsx']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
