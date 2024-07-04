import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { RowDraggingExample } from './RowDraggingExample';

const PATH: Route = '/examples/row-dragging';

export const metadata = getRouteMetadata(PATH);

export default async function BasicUsageExamplePage() {
  const code = await allPromiseProps({
    'RowDraggingExample.tsx': readCodeFile<string>(`${PATH}/RowDraggingExample.tsx`),
    'companies.json': readCodeFile<string>('/../data/companies.json'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        In its most basic usage scenario, the DataTable component only requires <Code>records</Code> and{' '}
        <Code>columns</Code> properties to be set:
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RowDraggingExample.tsx', 'companies.json'] }} />
      <Txt>The code above will produce the following result:</Txt>
      <Txt>For customizing drag button, you can use dragHandle prop it will accept a React.Node </Txt>
      <RowDraggingExample />

      <PageNavigation of={PATH} />
    </>
  );
}
