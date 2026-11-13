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
import { HandlingCellClicksExample } from './HandlingCellClicksExample';
import { HandlingCellDoubleClicksExample } from './HandlingCellDoubleClicksExample';

const PATH: Route = '/examples/handling-cell-clicks';

export const metadata = getRouteMetadata(PATH);

export default async function HandlingCellClicksExamplePage() {
  const code = await allPromiseProps({
    'HandlingCellClicksExample.tsx': readCodeFile<string>(`${PATH}/HandlingCellClicksExample.tsx`),
    'HandlingCellDoubleClicksExample.tsx': readCodeFile<string>(`${PATH}/HandlingCellDoubleClicksExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        If you need to know not only which row, but also which column was clicked, pass an <Code>onCellClick</Code>{' '}
        handler to the DataTable. The handler receives an object with the following properties:
      </Txt>
      <UnorderedList compact>
        <li>
          <Code>record</Code> &rarr; the clicked record;
        </li>
        <li>
          <Code>index</Code> &rarr; the index of the clicked record in the <Code>records</Code> array;
        </li>
        <li>
          <Code>column</Code> &rarr; the clicked column’s definition;
        </li>
        <li>
          <Code>columnIndex</Code> &rarr; the index of the clicked column in display order (which can differ from its
          position in your <Code>columns</Code> array when columns are reordered, pinned or grouped);
        </li>
        <li>
          <Code>event</Code> &rarr; the original React mouse event.
        </li>
      </UnorderedList>
      <Txt>Click on a cell to see it in action:</Txt>
      <HandlingCellClicksExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['HandlingCellClicksExample.tsx']} />
      <PageSubtitle value="Double-clicks" />
      <Txt>
        The <Code>onCellDoubleClick</Code> handler receives the same arguments. Double-click on a cell to see it in
        action:
      </Txt>
      <HandlingCellDoubleClicksExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['HandlingCellDoubleClicksExample.tsx']} />
      <PageSubtitle value="Right-clicks" />
      <Txt>
        Similarly, you can use the <Code>onCellContextMenu</Code> handler to react when the user right-clicks on a cell;
        call <Code>event.preventDefault()</Code> if you don’t want the browser’s own context menu to show up. See how
        you can use it to display a{' '}
        <InternalLink to="/examples/using-with-mantine-contextmenu">
          cell context menu with Mantine ContextMenu
        </InternalLink>
        .
      </Txt>
      <Txt info title="Heads up">
        <Box mb="sm">
          Cell events bubble up to the row, so you can combine cell handlers with{' '}
          <InternalLink to="/examples/handling-row-clicks">row handlers</InternalLink> such as <Code>onRowClick</Code>;
          in that case, the cell handler is called first. Also keep in mind that a double-click is preceded by two
          regular <Code>click</Code> events.
        </Box>
        <Box mb="sm">
          When handling cell clicks, you might want to{' '}
          <InternalLink to="/examples/disabling-text-selection">disable text selection</InternalLink>.
        </Box>
        <div>
          If you need to combine clickable cells with links, buttons,{' '}
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
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
