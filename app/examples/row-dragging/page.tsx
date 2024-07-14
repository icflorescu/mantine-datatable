import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
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
        {PRODUCT_NAME} also supports row dragging (implemented with{' '}
        <ExternalLink to="https://github.com/hello-pangea/dnd">@hello-pangea/dnd library</ExternalLink>).
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RowDraggingExample.tsx', 'companies.json'] }} />
      <Txt>The code above will produce the following result:</Txt>
      <RowDraggingExample />
      <Txt idea>
        To customize the drag button, you can use <Code>dragHandle</Code> property that accepts any{' '}
        <Code>React.Node</Code> content.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
