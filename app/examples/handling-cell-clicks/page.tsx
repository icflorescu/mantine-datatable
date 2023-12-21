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
      <Txt>Click on a cell to see it in action:</Txt>
      <HandlingCellClicksExample />
      <Txt>
        Provide a handler called <Code>onCellClick</Code> to the DataTable component, like so:
      </Txt>
      <CodeBlock code={code['HandlingCellClicksExample.tsx']} />
      <PageSubtitle value="Double-clicks" />
      <Txt>
        The <Code>onCellDoubleClick</Code> handler works in a similar way:
      </Txt>
      <CodeBlock code={code['HandlingCellDoubleClicksExample.tsx']} />
      <Txt>Double-click on a cell to see it in action:</Txt>
      <HandlingCellDoubleClicksExample />
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
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
