import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { DefaultColumnRenderExample } from './DefaultColumnRenderExample';

const PATH: Route = '/examples/default-column-render';

export const metadata = getRouteMetadata(PATH);

export default async function DefaultColumnRenderExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/DefaultColumnRenderExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        If you provide a <Code>defaultColumnRender</Code> prop to the table, it will be used to render all columns that
        do not provide a custom <Code>render</Code> function.
        <br />
        The <Code>defaultColumnRender</Code> function receives the current row, its index and accessor name and should
        return a <Code>ReactNode</Code>:
      </Txt>
      <CodeBlock code={code} />
      <Txt>The code above will produce the following result:</Txt>
      <DefaultColumnRenderExample />
      <Txt>Head over to the next example to learn more.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
