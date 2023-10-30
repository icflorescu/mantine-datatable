import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
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
      <Txt>Adding custom attributes to table rows or table cells could be useful for testing purposes.</Txt>
      <Txt>
        You can add custom attributes to the table rows using the <Code>customRowAttributes</Code> property. It accepts
        a function that receives two arguments, <Code>record</Code> and <Code>recordIndex</Code> and returns an object
        with attributes to add to the row.
      </Txt>
      <Txt>
        Similarly, each column can have its own <Code>customCellAttributes</Code> property that accepts a function that
        receives two arguments, <Code>record</Code> and <Code>recordIndex</Code> and returns an object with attributes
        to add to the cell.
      </Txt>
      <Txt>Inspect the table below to see the attributes generated for each row and cell:</Txt>
      <CustomRowOrCellAttributesExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['custom-row-or-cell-attributes']} />
      <PageSubtitle value="Handling middle-clicks" />
      <Txt>
        Here is how you could use the <Code>customRowAttributes</Code> property to handle middle-clicks on table rows:
      </Txt>
      <CustomRowOrCellAttributesMiddleClickExample />
      <Txt>Code:</Txt>
      <CodeBlock code={code['middle-click']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
