import { Anchor, Box, Code } from '@mantine/core';
import type { Route } from 'next';
import { MANTINE_CONTEXTMENU_LINK, MANTINE_CONTEXTMENU_PRODUCT_NAME, PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { CellContextMenuExample } from './CellContextMenuExample';
import { ContextMenuOnClickExample } from './ContextMenuOnClickExample';
import { RowAndCellContextMenuExample } from './RowAndCellContextMenuExample';
import { RowContextMenuExample } from './RowContextMenuExample';
import { RowContextMenuInsideModalExample } from './RowContextMenuInsideModalExample';
import { RowContextMenuOnScrollableTableExample } from './RowContextMenuOnScrollableTableExample';

const PATH: Route = '/examples/using-with-mantine-contextmenu';

export const metadata = getRouteMetadata(PATH);

export default async function UsingWithMantineContextMenuExamplePage() {
  const code = await allPromiseProps({
    'RowContextMenuExample.tsx': readCodeFile<string>(`${PATH}/RowContextMenuExample.tsx`),
    'CellContextMenuExample.tsx': readCodeFile<string>(`${PATH}/CellContextMenuExample.tsx`),
    'RowContextMenuOnScrollableTableExample.tsx': readCodeFile<string>(
      `${PATH}/RowContextMenuOnScrollableTableExample.tsx`
    ),
    'RowAndCellContextMenuExample.tsx': readCodeFile<string>(`${PATH}/RowAndCellContextMenuExample.tsx`),
    'ContextMenuOnClickExample.tsx': readCodeFile<string>(`${PATH}/ContextMenuOnClickExample.tsx`),
    'RowContextMenuInsideModalExample.tsx': readCodeFile<string>(`${PATH}/RowContextMenuInsideModalExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Mantine doesn’t have a context-menu component, but the DataTable works perfectly with{' '}
        <ExternalLink to={MANTINE_CONTEXTMENU_LINK}>{MANTINE_CONTEXTMENU_PRODUCT_NAME}</ExternalLink>, built by the same
        author. Have a look at the examples below to learn how.
      </Txt>
      <Txt idea title="Important">
        <Box mb="sm">
          When using <ExternalLink to={MANTINE_CONTEXTMENU_LINK}>{MANTINE_CONTEXTMENU_PRODUCT_NAME}</ExternalLink>,
          you’ll need to wrap your application in a <Code>ContextMenuProvider</Code> and include the necessary CSS files{' '}
          <strong>in the correct order</strong>. Please refer to the{' '}
          <ExternalLink to={`${MANTINE_CONTEXTMENU_LINK}/getting-started`}>getting started</ExternalLink> page of{' '}
          {MANTINE_CONTEXTMENU_PRODUCT_NAME} for more information.
        </Box>
        <Box mb="sm">
          When using {MANTINE_CONTEXTMENU_PRODUCT_NAME} with a scrollable {PRODUCT_NAME}, you’ll need to close the
          context-menu when the user scrolls the table –{' '}
          <Anchor inherit href="#using-with-scrollable-tables">
            see the example below
          </Anchor>
          .
        </Box>
        <div>
          When using {MANTINE_CONTEXTMENU_PRODUCT_NAME} with {PRODUCT_NAME} on touch devices, consider{' '}
          <InternalLink to="/examples/disabling-text-selection">disabling text selection</InternalLink> on the table.
        </div>
      </Txt>
      <PageSubtitle value="Row context-menu" />
      <Txt>
        Here’s how you could use the <Code>onRowContextMenu</Code> property to create this useful functionality for your
        data-rich desktop applications:
      </Txt>
      <RowContextMenuExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['RowContextMenuExample.tsx']} />
      <PageSubtitle value="Using with scrollable tables" />
      <Txt>
        By default, a <ExternalLink to={MANTINE_CONTEXTMENU_LINK}>{MANTINE_CONTEXTMENU_PRODUCT_NAME}</ExternalLink> will
        automatically place an overlay over the entire page and close when the user clicks it, hits the{' '}
        <Code>Escape</Code> key, scrolls the or resizes the browser window. However, when using a{' '}
        <InternalLink to="/examples/scrollable-vs-auto-height">scrollable</InternalLink> DataTable, the user can still
        scroll the table using the arrow keys, so you might need to close the context-menu when the user scrolls the
        table by passing the{' '}
        <ExternalLink to={`${MANTINE_CONTEXTMENU_LINK}/examples/imperative-hiding/`}>
          <Code>hideContextMenu</Code> function
        </ExternalLink>{' '}
        returned by the <Code>useContextMenu</Code> hook to the <Code>onScroll</Code> property of the DataTable:
      </Txt>
      <RowContextMenuOnScrollableTableExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['RowContextMenuOnScrollableTableExample.tsx']} />
      <PageSubtitle value="Cell context-menu" />
      <Txt>
        You can also use the <Code>onCellContextMenu</Code> property to create a context-menu for individual cells. In
        the example below, we’re showing a context-menu for the <Code>name</Code> column:
      </Txt>
      <CellContextMenuExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['CellContextMenuExample.tsx']} />
      <PageSubtitle value="Mixing row and cell context-menus" />
      <Txt>
        You can also mix row and cell context-menus. In the example below, we’re showing a context-menu for the{' '}
        <Code>name</Code> column and a different one for the row:
      </Txt>
      <RowAndCellContextMenuExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['RowAndCellContextMenuExample.tsx']} />
      <PageSubtitle value="Showing a context-menu on left-click" />
      <Txt>
        Usually, context-menus are shown when the user <strong>right-clicks</strong> on a user interface element.
        However, you can also show a context-menu when the user <strong>left-clicks</strong> on a row or cell by using
        the <Code>onRowClick</Code> and <Code>onCellClick</Code> properties instead of <Code>onRowContextMenu</Code> and{' '}
        <Code>onCellContextMenu</Code>. Here’s an example:
      </Txt>
      <ContextMenuOnClickExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['ContextMenuOnClickExample.tsx']} />
      <PageSubtitle value="Using context-menus inside modals" />
      <Txt>
        You can use context-menus inside modals. In the example below, we’re showing a context-menu when the user
        right-clicks on a table row rendered inside a modal:
      </Txt>
      <RowContextMenuInsideModalExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['RowContextMenuInsideModalExample.tsx']} />
      <Txt>Head over to the next example to discover more features of {PRODUCT_NAME}.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
