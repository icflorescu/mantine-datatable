import { Box, Code } from '@mantine/core';
import type { Route } from 'next';
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
import { HandlingRowClicksExample } from './HandlingRowClicksExample';
import { HandlingRowContextMenuExample } from './HandlingRowContextMenuExample';
import { HandlingRowDoubleClicksExample } from './HandlingRowDoubleClicksExample';

const PATH: Route = '/examples/handling-row-clicks';

export const metadata = getRouteMetadata(PATH);

export default async function HandlingRowClicksExamplePage() {
  const code = await allPromiseProps({
    'HandlingRowClicksExample.tsx': readCodeFile<string>(`${PATH}/HandlingRowClicksExample.tsx`),
    'HandlingRowDoubleClicksExample.tsx': readCodeFile<string>(`${PATH}/HandlingRowDoubleClicksExample.tsx`),
    'HandlingRowContextMenuExample.tsx': readCodeFile<string>(`${PATH}/HandlingRowContextMenuExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        To react when the user clicks on a row, pass an <Code>onRowClick</Code> handler to the DataTable. The handler
        receives an object with the following properties:
      </Txt>
      <UnorderedList compact>
        <li>
          <Code>record</Code> &rarr; the clicked record;
        </li>
        <li>
          <Code>index</Code> &rarr; the index of the clicked record in the <Code>records</Code> array;
        </li>
        <li>
          <Code>event</Code> &rarr; the original React mouse event, which you can use, for instance, to check whether a
          modifier key was pressed.
        </li>
      </UnorderedList>
      <Txt>Click on a row to see it in action:</Txt>
      <HandlingRowClicksExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['HandlingRowClicksExample.tsx']} />
      <Txt>
        When a row click handler is provided, the rows display a <Code>pointer</Code> cursor to signal that they are
        clickable.
      </Txt>
      <PageSubtitle value="Double-clicks" />
      <Txt>
        The <Code>onRowDoubleClick</Code> handler receives the same arguments. Double-click on a row to see it in
        action:
      </Txt>
      <HandlingRowDoubleClicksExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['HandlingRowDoubleClicksExample.tsx']} />
      <Txt info title="Combining single and double clicks">
        A double-click is preceded by two regular <Code>click</Code> events, so if you provide both{' '}
        <Code>onRowClick</Code> and <Code>onRowDoubleClick</Code>, your <Code>onRowClick</Code> handler will be called
        twice before <Code>onRowDoubleClick</Code> fires. Make sure the two behaviors don’t interfere with each other.
      </Txt>
      <PageSubtitle value="Right-clicks" />
      <Txt>
        To react when the user right-clicks on a row, use the <Code>onRowContextMenu</Code> handler, which receives the
        same arguments. Rows with a context menu handler display a <Code>context-menu</Code> cursor; call{' '}
        <Code>event.preventDefault()</Code> if you don’t want the browser’s own context menu to show up. Right-click on
        a row to see it in action:
      </Txt>
      <HandlingRowContextMenuExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['HandlingRowContextMenuExample.tsx']} />
      <Txt idea>
        If you want to display an actual context menu, see how you can use the DataTable{' '}
        <InternalLink to="/examples/using-with-mantine-contextmenu">with Mantine ContextMenu</InternalLink>.
      </Txt>
      <Txt info title="Heads up">
        <Box mb="sm">
          When handling row clicks, you might want to{' '}
          <InternalLink to="/examples/disabling-text-selection">disable text selection</InternalLink>.
        </Box>
        <div>
          If you need to combine clickable rows with links, buttons,{' '}
          <InternalLink to="/examples/row-actions-cell">row action cells</InternalLink> or other clickable components
          inside cells, make sure to intercept the <Code>click</Code> event on those components and{' '}
          <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
            call its <Code>.stopPropagation()</Code> method
          </ExternalLink>
          .
          <br />
          See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">this example</InternalLink>{' '}
          for more information.
        </div>
      </Txt>
      <Txt>
        If you need to know which cell was clicked, use the{' '}
        <InternalLink to="/examples/handling-cell-clicks">
          <Code>onCellClick</Code>, <Code>onCellDoubleClick</Code> and <Code>onCellContextMenu</Code> handlers
        </InternalLink>{' '}
        instead.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
