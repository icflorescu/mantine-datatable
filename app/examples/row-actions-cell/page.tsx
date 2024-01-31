import { Code } from '@mantine/core';
import type { Route } from 'next';
import { MANTINE_LINK } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { RowActionsCellExample, RowActionsCellExampleConstrainWidth } from './RowActionsCellExamples';

const PATH: Route = '/examples/row-actions-cell';

export const metadata = getRouteMetadata(PATH);

export default async function RowActionsCellExamplePage() {
  const code = await readCodeFile<Record<'default' | 'constrain-width', string>>(`${PATH}/RowActionsCellExamples.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        If a simple <InternalLink to="/examples/handling-row-clicks">row click</InternalLink> or{' '}
        <InternalLink to="/examples/handling-cell-clicks">cell click</InternalLink> handler is not enough and{' '}
        <InternalLink to="/examples/using-with-mantine-contextmenu">context menus</InternalLink> are not your thing,
        implementing a row actions cell using the column <Code>render</Code> function should’t be difficult.
      </Txt>
      <RowActionsCellExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['default']} />
      <Txt info title="Heads up">
        If you need to combine row actions with{' '}
        <InternalLink to="/examples/handling-row-clicks">clickable rows</InternalLink>,{' '}
        <InternalLink to="/examples/handling-cell-clicks">clickable cells</InternalLink>,{' '}
        <InternalLink to="/examples/expanding-rows">expandable rows</InternalLink> or{' '}
        <InternalLink to="/examples/using-with-mantine-contextmenu">
          row context-menus triggered by <Code>click</Code> instead of <Code>right-click</Code>
        </InternalLink>
        , make sure to intercept the <Code>click</Code> event on the actions and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
        <br />
        See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">this example</InternalLink> for
        more information.
      </Txt>
      <PageSubtitle value="Constraining the actions column width" />
      <Txt>
        If you want to constrain the actions column to be no wider than its content, you can set its <Code>width</Code>{' '}
        to <Code>&apos;0%&apos;</Code> and, if you have more than one action icon, make sure the actions are wrapped in
        a <ExternalLink to={`${MANTINE_LINK}/core/group/`}>Mantine Group</ExternalLink> component with{' '}
        <Code>wrap=&apos;nowrap&apos;</Code>:
      </Txt>
      <RowActionsCellExampleConstrainWidth />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['constrain-width']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
