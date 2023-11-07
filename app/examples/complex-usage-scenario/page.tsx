import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { ComplexUsageExample } from './ComplexUsageExample';
import { ComplexUsageExampleWrapper } from './ComplexUsageExampleWrapper';

const PATH: Route = '/examples/complex-usage-scenario';

export const metadata = getRouteMetadata(PATH);

export default async function ComplexUsageExamplePage() {
  const code = await allPromiseProps({
    'ComplexUsageExampleWrapper.tsx': readCodeFile<string>(`${PATH}/ComplexUsageExampleWrapper.tsx`),
    'ComplexUsageExample.tsx': readCodeFile<string>(`${PATH}/ComplexUsageExample.tsx`),
    'ComplexUsageExample.module.css': readCodeFile<string>(`${PATH}/ComplexUsageExample.module.css`),
    'data/index.ts': readCodeFile<string>('/../data/index.ts'),
    'data/async.ts': readCodeFile<string>('/../data/async.ts'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Here is a complex usage scenario featuring{' '}
        <InternalLink to="/examples/column-properties-and-styling">custom column definitions</InternalLink>,{' '}
        <InternalLink to="/examples/asynchronous-data-loading">asynchronous data loading</InternalLink> with{' '}
        <ExternalLink to="https://tanstack.com/query/latest">TanStack React Query</ExternalLink>,{' '}
        <InternalLink to="/examples/sorting">sorting</InternalLink>,{' '}
        <InternalLink to="/examples/pagination">pagination</InternalLink>, custom cell data rendering,{' '}
        <InternalLink to="/examples/records-selection">multiple row selection</InternalLink>,{' '}
        <InternalLink to="/examples/expanding-rows">row expansion</InternalLink>,{' '}
        <InternalLink to="/examples/row-actions-cell">action cells</InternalLink>, and{' '}
        <InternalLink to="/examples/using-with-mantine-contextmenu">row context-menu</InternalLink>.
      </Txt>
      <ComplexUsageExampleWrapper>
        <ComplexUsageExample />
      </ComplexUsageExampleWrapper>
      <Txt>
        Since this example is using React Query, we have to wrap everything in a <Code>QueryClientProvider</Code> like
        so:
      </Txt>
      <CodeBlock code={code['ComplexUsageExampleWrapper.tsx']} />
      <Txt>Here is the actual code:</Txt>
      <CodeBlock
        tabs={{
          code,
          keys: ['ComplexUsageExample.tsx', 'ComplexUsageExample.module.css', 'data/async.ts', 'data/index.ts'],
        }}
      />
      <Txt>Head over to the next page to see {PRODUCT_NAME} type definitions.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
