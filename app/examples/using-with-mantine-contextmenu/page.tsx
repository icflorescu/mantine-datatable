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
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { AdvancedContextMenuExample } from './AdvancedContextMenuExample';
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
    'AdvancedContextMenuExample.tsx': readCodeFile<string>(`${PATH}/AdvancedContextMenuExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Mantine doesn’t include a context-menu component, but {PRODUCT_NAME} works seamlessly with{' '}
        <ExternalLink to={MANTINE_CONTEXTMENU_LINK}>{MANTINE_CONTEXTMENU_PRODUCT_NAME}</ExternalLink>, a library built
        by the same author. Have a look at the examples below to learn how to use them together.
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
          context-menu when the user scrolls the table &mdash;{' '}
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
        Use the <Code>onRowContextMenu</Code> property to show a context-menu when the user right-clicks a row &mdash; a
        handy feature for data-rich desktop applications. The handler receives the current <Code>record</Code>, its{' '}
        <Code>index</Code> and the mouse <Code>event</Code>, which you pass to the function returned by{' '}
        <Code>showContextMenu</Code>:
      </Txt>
      <RowContextMenuExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['RowContextMenuExample.tsx']} />
      <PageSubtitle value="Using with scrollable tables" />
      <Txt>
        By default, a <ExternalLink to={MANTINE_CONTEXTMENU_LINK}>{MANTINE_CONTEXTMENU_PRODUCT_NAME}</ExternalLink>{' '}
        places an overlay over the entire page and closes when the user clicks it, hits the <Code>Escape</Code> key,
        scrolls the page or resizes the browser window. However, the user can still scroll a{' '}
        <InternalLink to="/examples/scrollable-vs-auto-height">scrollable</InternalLink> DataTable (with the mouse wheel
        or the arrow keys, for instance), leaving the context-menu detached from the row it belongs to. To prevent this,
        close the context-menu when the table is scrolled by passing the{' '}
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
        Use the <Code>onCellContextMenu</Code> property to create context-menus for individual cells. Besides the{' '}
        <Code>record</Code> and the <Code>event</Code>, its handler also receives the <Code>column</Code> and its index,
        so you can decide which cells should have a context-menu. In the example below, only the cells of the{' '}
        <Code>name</Code> column have one:
      </Txt>
      <CellContextMenuExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['CellContextMenuExample.tsx']} />
      <PageSubtitle value="Mixing row and cell context-menus" />
      <Txt>
        You can also mix row and cell context-menus. In the example below, right-clicking a cell of the{' '}
        <Code>name</Code> column shows a cell-specific context-menu, while right-clicking anywhere else on the row shows
        the row context-menu:
      </Txt>
      <RowAndCellContextMenuExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['RowAndCellContextMenuExample.tsx']} />
      <PageSubtitle value="Showing a context-menu on left-click" />
      <Txt>
        Context-menus are usually shown when the user <strong>right-clicks</strong> a user interface element. However,
        you can also show one when the user <strong>left-clicks</strong> a row or cell, by using the{' '}
        <Code>onRowClick</Code> and <Code>onCellClick</Code> properties instead of <Code>onRowContextMenu</Code> and{' '}
        <Code>onCellContextMenu</Code>. Here’s an example:
      </Txt>
      <ContextMenuOnClickExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['ContextMenuOnClickExample.tsx']} />
      <PageSubtitle value="Using context-menus inside modals" />
      <Txt>
        Context-menus work inside modals as well. In the example below, a context-menu is shown when the user
        right-clicks a row of a table rendered inside a modal:
      </Txt>
      <RowContextMenuInsideModalExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['RowContextMenuInsideModalExample.tsx']} />
      <PageSubtitle value="Submenus, disabled items and custom titles" />
      <Txt>
        The context-menu items support all the {MANTINE_CONTEXTMENU_PRODUCT_NAME} features, so you can, for instance:
      </Txt>
      <UnorderedList compact>
        <li>
          provide a custom <Code>title</Code> (if you don’t, one is generated by “humanizing” the item <Code>key</Code>,
          which is why the examples above don’t specify titles);
        </li>
        <li>
          render a submenu by providing an <Code>items</Code> array instead of an <Code>onClick</Code> handler;
        </li>
        <li>
          disable or hide items based on the current state, using the <Code>disabled</Code> and <Code>hidden</Code>{' '}
          properties.
        </li>
      </UnorderedList>
      <Txt>
        In the example below, the context-menu has a submenu and an item that is only enabled when some rows are{' '}
        <InternalLink to="/examples/records-selection">selected</InternalLink>:
      </Txt>
      <AdvancedContextMenuExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock code={code['AdvancedContextMenuExample.tsx']} />
      <Txt>
        Instead of an array of items, <Code>showContextMenu</Code> also accepts a function that receives a{' '}
        <Code>close</Code> callback and returns completely custom content. Refer to the{' '}
        <ExternalLink to={MANTINE_CONTEXTMENU_LINK}>{MANTINE_CONTEXTMENU_PRODUCT_NAME} documentation</ExternalLink> for
        the full list of options.
      </Txt>
      <Txt>Head over to the next example to discover more features of {PRODUCT_NAME}.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
