import { Box, Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { HandlingRowClicksExample } from './HandlingRowClicksExample';
import { HandlingRowDoubleClicksExample } from './HandlingRowDoubleClicksExample';

const PATH: Route = '/examples/handling-row-clicks';

export const metadata = getRouteMetadata(PATH);

export default async function HandlingRowClicksExamplePage() {
  const code = await allPromiseProps({
    'HandlingRowClicksExample.tsx': readCodeFile<string>(`${PATH}/HandlingRowClicksExample.tsx`),
    'HandlingRowDoubleClicksExample.tsx': readCodeFile<string>(`${PATH}/HandlingRowDoubleClicksExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>Click on a row to see it in action:</Txt>
      <HandlingRowClicksExample />
      <Txt>
        Provide a handler called <Code>onRowClick</Code> to the DataTable component, like so:
      </Txt>
      <CodeBlock code={code['HandlingRowClicksExample.tsx']} />
      <PageSubtitle value="Double-clicks" />
      <Txt>
        The <Code>onRowDoubleClick</Code> handler works in a similar way:
      </Txt>
      <CodeBlock code={code['HandlingRowDoubleClicksExample.tsx']} />
      <Txt>Double-click on a row to see it in action:</Txt>
      <HandlingRowDoubleClicksExample />
      <Txt info title="Heads up">
        <Box mb="sm">
          When handling row clicks, you might want to{' '}
          <InternalLink to="/examples/disabling-text-selection">disable text selection</InternalLink>.
        </Box>
        <div>
          If you need to combine this behavior with links, buttons,{' '}
          <InternalLink to="/examples/row-actions-cell">row action cells</InternalLink> or any kind of clickable
          components inside cells, make sure to intercept the <Code>click</Code> event on those components and{' '}
          <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
            invoke its <Code>.stopPropagation()</Code> method
          </ExternalLink>
          .
          <br />
          See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">
            this example
          </InternalLink>{' '}
          for more information.
        </div>
      </Txt>
      <Txt>
        If you need more granularity, consider using an{' '}
        <InternalLink to="/examples/handling-cell-clicks">
          <Code>onCellClick</Code> handler
        </InternalLink>{' '}
        instead.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
