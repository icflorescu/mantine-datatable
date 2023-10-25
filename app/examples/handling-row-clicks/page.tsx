import { Code } from '@mantine/core';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { HandlingRowClicksExample } from './HandlingRowClicksExample';

const PATH = '/examples/handling-row-clicks';

export const metadata = getRouteMetadata(PATH);

export default async function HandlingRowClicksExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/HandlingRowClicksExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>Click on a row to see it in action:</Txt>
      <HandlingRowClicksExample />
      <Txt>
        Provide a handler called <Code>onRowClick</Code> to the DataTable component, like so:
      </Txt>
      <CodeBlock code={code} />
      <Txt info title="Heads up">
        When handling row clicks, you might want to{' '}
        <InternalLink to="/examples/disabling-text-selection">disable text selection</InternalLink>.
      </Txt>
      <Txt info title="Heads up">
        If you need to combine this behavior with links, buttons,{' '}
        <InternalLink to="/examples/row-actions-cell">row action cells</InternalLink> or any kind of clickable
        components inside cells, make sure to intercept the <Code>click</Code> event on those components and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
        <br />
        See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">this example</InternalLink> for
        more information.
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
