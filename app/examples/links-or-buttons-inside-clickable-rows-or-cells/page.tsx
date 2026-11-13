import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { LinksOrButtonsInsideClickableRowsOrCellsExample } from './LinksOrButtonsInsideClickableRowsOrCellsExample';

const PATH: Route = '/examples/links-or-buttons-inside-clickable-rows-or-cells';

export const metadata = getRouteMetadata(PATH);

export default async function LinksOrButtonsInsideClickableRowsOrCellsExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/LinksOrButtonsInsideClickableRowsOrCellsExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Click events bubble up the DOM tree, so when the user clicks on a link, button or other interactive component
        placed inside a <InternalLink to="/examples/handling-row-clicks">clickable row</InternalLink>,{' '}
        <InternalLink to="/examples/handling-cell-clicks">clickable cell</InternalLink>,{' '}
        <InternalLink to="/examples/expanding-rows">expandable row</InternalLink> or a row with a{' '}
        <InternalLink to="/examples/using-with-mantine-contextmenu">
          context menu triggered by <Code>click</Code> instead of <Code>right-click</Code>
        </InternalLink>
        , the row or cell will react to the click as well.
      </Txt>
      <Txt>
        To prevent this, intercept the <Code>click</Code> event on the interactive component and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          call its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
      </Txt>
      <Txt>
        For example, the table below implements both{' '}
        <InternalLink to="/examples/expanding-rows">expandable rows</InternalLink> and{' '}
        <InternalLink to="/examples/row-actions-cell">row actions</InternalLink>. Clicking on a row expands it, while
        clicking on an action button only opens a modal dialog, without toggling the row expansion:
      </Txt>
      <LinksOrButtonsInsideClickableRowsOrCellsExample />
      <Txt>Here’s the code:</Txt>
      <CodeBlock code={code} />
      <Txt info>
        The same technique applies to regular links: add an <Code>onClick</Code> handler that calls{' '}
        <Code>event.stopPropagation()</Code> to the anchor element (or Mantine <Code>Anchor</Code> component) and the
        browser will follow the link without triggering the row or cell handlers.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
