import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { InlineEditingExample } from './InlineEditingExample';

const PATH: Route = '/examples/inline-editing';

export const metadata = getRouteMetadata(PATH);

export default async function InlineEditingExamplePage() {
  const code = await allPromiseProps({
    'InlineEditingExample.tsx': readCodeFile<string>(`${PATH}/InlineEditingExample.tsx`),
    'companies.json': readCodeFile<string>('/../data/companies.json'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        This example demonstrates how to implement inline cell editing in {PRODUCT_NAME}. This is achieved by setting
        the <code>editable</code> property to <code>true</code> in the column definition. Additionally, the{' '}
        <code>onEdit</code> callback is provided to handle updates to the record when the cell value is changed. In this
        example, we allow editing of the <code>name</code> field of company records.
      </Txt>
      <Txt>
        This is baked in to the <code>DataTable</code> component for the column definitions, so no additional libraries
        are required. However, this only supports the basic single cell editing scenario, for a more complex case of
        editing the entire row or adding validation it is still recommended to implement the logic yourself by changing
        the logic of the <code>render</code> function of the column to show input fields when in edit mode.
      </Txt>
      <CodeBlock tabs={{ code, keys: ['InlineEditingExample.tsx', 'companies.json'] }} />
      <InlineEditingExample />
      <PageNavigation of={PATH} />
    </>
  );
}
