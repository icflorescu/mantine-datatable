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
        If you need to add links, buttons or any kind of clickable components inside clickable{' '}
        <InternalLink to="/examples/handling-row-clicks">clickable rows</InternalLink>,{' '}
        <InternalLink to="/examples/handling-cell-clicks">clickable cells</InternalLink>,{' '}
        <InternalLink to="/examples/expanding-rows">expandable rows</InternalLink> or{' '}
        <InternalLink to="/examples/using-with-mantine-contextmenu">
          row context-menus triggered by <Code>click</Code> instead of <Code>right-click</Code>
        </InternalLink>
        , make sure to intercept the <Code>click</Code> event on the clickable components and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
      </Txt>
      <Txt>
        For example, the following table implements both{' '}
        <InternalLink to="/examples/expanding-rows">expandable rows</InternalLink> and{' '}
        <InternalLink to="/examples/row-actions-cell">row actions</InternalLink>:
      </Txt>
      <LinksOrButtonsInsideClickableRowsOrCellsExample />
      <Txt>Here’s the code:</Txt>
      <CodeBlock code={code} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
