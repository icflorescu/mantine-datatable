import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import ResizingComplexExample from './ResizingComplexExample';
import ResizingExample from './ResizingExample';

const PATH: Route = '/examples/column-resizing';

export const metadata = getRouteMetadata(PATH);

export default async function DraggingExamplePage() {
  const code = await allPromiseProps({
    'ResizingExample.tsx': readCodeFile<string>(`${PATH}/ResizingExample.tsx`),
    'ResizingComplexExample.tsx': readCodeFile<string>(`${PATH}/ResizingComplexExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />

      <ResizingExample />
      <Txt>
        In order to enable <strong>column resizing</strong> you’ll have to:
      </Txt>
      <UnorderedList compact>
        <li>
          add a <Code>storeColumnsKey: your_key</Code> property to the DataTable (since the order of the columns is
          persisted in the local storage);
        </li>
        <li>
          add a <Code>resizable: true</Code> property to each <strong>resizing candidate</strong> column;
        </li>
        <li>
          use <Code>useDragToggleColumns()</Code> hook to get the effective columns.
        </li>
      </UnorderedList>
      <CodeBlock code={code['ResizingExample.tsx']} />
      <Txt idea>
        The default width of the columns is the <Code>width</Code> in which they are defined in the <Code>columns</Code>{' '}
        prop.
      </Txt>

      <Txt info>
        Of course, you can reset the column width to the default value by using the <Code>resetColumnsWidth()</Code>{' '}
        function.
        <br />
        You may also set up the column with to <Code>initial</Code> by double-clicking on the resize handle.
      </Txt>

      <PageSubtitle value="Complex usage" />
      <ResizingComplexExample />

      <CodeBlock code={code['ResizingComplexExample.tsx']} />

      <PageNavigation of={PATH} />
    </>
  );
}
