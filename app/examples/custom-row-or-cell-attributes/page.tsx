import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import {
  CustomRowOrCellAttributesExample,
  CustomRowOrCellAttributesMiddleClickExample,
} from './CustomRowOrCellAttributesExamples';

const PATH: Route = '/examples/custom-row-or-cell-attributes';

export const metadata = getRouteMetadata(PATH);

export default async function CustomRowOrCellAttributesPage() {
  const code = await readCodeFile<Record<'custom-row-or-cell-attributes' | 'middle-click', string>>(
    `${PATH}/CustomRowOrCellAttributesExamples.tsx`
  );

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Adding custom attributes to table rows or cells can be useful for testing purposes, for analytics, or for
        handling events the DataTable doesn’t expose a dedicated property for.
      </Txt>
      <Txt>
        To add custom attributes to table rows, use the <Code>customRowAttributes</Code> property. It accepts a function
        that receives the current record and its index as arguments and returns an object whose properties are applied
        as attributes to the corresponding row.
      </Txt>
      <Txt>
        Similarly, each column accepts a <Code>customCellAttributes</Code> property, which works the same way, but
        applies the returned attributes to the column’s cells.
      </Txt>
      <Txt>Inspect the table below to see the attributes generated for each row and cell:</Txt>
      <CustomRowOrCellAttributesExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['custom-row-or-cell-attributes']} />
      <PageSubtitle value="Handling middle-clicks" />
      <Txt>
        Since the returned object can also contain event handlers, here is how you could use the{' '}
        <Code>customRowAttributes</Code> property to handle middle-clicks on table rows:
      </Txt>
      <CustomRowOrCellAttributesMiddleClickExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['middle-click']} />
      <Txt warning title="Be careful what you override">
        The attributes returned by <Code>customRowAttributes</Code> are applied <em>after</em> the ones the DataTable
        sets on each row, so they take precedence. For instance, returning a <Code>className</Code>, <Code>style</Code>,{' '}
        <Code>onClick</Code> or <Code>onContextMenu</Code> property would replace the default one, breaking features
        such as <InternalLink to="/examples/row-styling">row styling</InternalLink>,{' '}
        <InternalLink to="/examples/handling-row-clicks">row click handling</InternalLink> or{' '}
        <InternalLink to="/examples/expanding-rows">row expansion</InternalLink>. Use the dedicated DataTable properties
        for those, and keep <Code>customRowAttributes</Code> for everything else.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
