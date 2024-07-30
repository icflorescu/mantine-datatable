import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME, REPO_LINK } from '~/app/config';
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
        Starting with <Code>v7.11.3</Code>, {PRODUCT_NAME} also supports row dragging (implemented with{' '}
        <ExternalLink to="https://github.com/hello-pangea/dnd">@hello-pangea/dnd library</ExternalLink> in{' '}
        <ExternalLink to={`${REPO_LINK}/pull/616`}>this PR</ExternalLink>).
        <br />
        Here is how you would implement it in your project:
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RowDraggingExample.tsx', 'companies.json'] }} />
      <Txt>The code above will produce the following result:</Txt>
      <RowDraggingExample />

      <PageNavigation of={PATH} />
    </>
  );
}
