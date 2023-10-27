import { Code } from '@mantine/core';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { ComplexUsageExample } from './ComplexUsageExample';
import { ComplexUsageExampleWrapper } from './ComplexUsageExampleWrapper';

const PATH = '/examples/complex-usage-scenario';

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
        Here is a complex usage scenario featuring custom column definitions, asynchronous data loading with{' '}
        <ExternalLink to="https://tanstack.com/query/latest">TanStack React Query</ExternalLink>, sorting, pagination,
        custom cell data rendering, multiple row selection, and row context-menu.
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
