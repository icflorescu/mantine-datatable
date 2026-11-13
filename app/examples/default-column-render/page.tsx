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
        If you provide a <Code>defaultColumnRender</Code> function to the DataTable, it will be used to render the cells
        of all columns that don’t have their own <Code>render</Code> function.
        <br />
        The <Code>defaultColumnRender</Code> function receives the current record, its index in <Code>records</Code> and
        the column <Code>accessor</Code> as arguments, and should return a <Code>ReactNode</Code>.
      </Txt>
      <Txt>
        In the example below, a single function renders strings as they are and dates as relative time intervals, so the
        columns don’t need individual <Code>render</Code> functions:
      </Txt>
      <DefaultColumnRenderExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code} />
      <Txt info>
        A column’s own <Code>render</Code> function always takes precedence over <Code>defaultColumnRender</Code>.
        <br />
        Also keep in mind that <Code>defaultColumnRender</Code> receives the accessor as-is; if you’re using
        dot-notation accessors such as <Code>{"'department.name'"}</Code>, you can resolve them with the{' '}
        <Code>getValueAtPath(record, accessor)</Code> helper exported by the package.
      </Txt>
      <Txt>Head over to the next example to learn more.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
