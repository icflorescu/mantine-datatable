import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { InlineCellEditingExample } from './InlineCellEditingExample';

const PATH: Route = '/examples/inline-cell-editing';

export const metadata = getRouteMetadata(PATH);

export default async function InlineEditingExamplePage() {
  const code = await allPromiseProps({
    'InlineCellEditingExample.tsx': readCodeFile<string>(`${PATH}/InlineCellEditingExample.tsx`),
    'companies.json': readCodeFile<string>('/../data/companies.json'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        This example demonstrates how to implement inline cell editing in {PRODUCT_NAME}. This is achieved by setting
        the <code>editable</code> property to <code>true</code> in the column definition. Additionally, the{' '}
        <code>onEdit</code> callback is provided to handle updates to the record when the cell value is changed.
      </Txt>
      <Txt>
        The <code>editType</code> property allows you to specify the type of input to use when editing cells. Supported
        types are: <code>text</code> (default), <code>number</code>, <code>date</code>, and <code>boolean</code>. The
        DataTable automatically renders the appropriate input component for each type - TextInput for text, NumberInput
        for numbers, DatePickerInput for dates, and Checkbox for booleans.
      </Txt>
      <Txt>
        This is baked in to the <code>DataTable</code> component for the column definitions, so no additional libraries
        are required. However, this only supports the basic single cell editing scenario, for a more complex case of
        editing the entire row or adding validation it is still recommended to implement the logic yourself by changing
        the logic of the <code>render</code> function of the column to show input fields when in edit mode.
      </Txt>
      <CodeBlock tabs={{ code, keys: ['InlineCellEditingExample.tsx', 'companies.json'] }} />
      <InlineCellEditingExample />
      <PageNavigation of={PATH} />
    </>
  );
}
