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
import DraggingExample from './DraggingExample';
import DraggingTogglingComplexExample from './DraggingTogglingComplexExample';
import DraggingTogglingResetExample from './DraggingTogglingResetExample';
import TogglingExample from './TogglingExample';

const PATH: Route = '/examples/dragging-toggling';

export const metadata = getRouteMetadata(PATH);

export default async function DraggingExamplePage() {
  const code = await allPromiseProps({
    'DraggingExample.tsx': readCodeFile<string>(`${PATH}/DraggingExample.tsx`),
    'DraggingTogglingResetExample.tsx': readCodeFile<string>(`${PATH}/DraggingTogglingResetExample.tsx`),
    'TogglingExample.tsx': readCodeFile<string>(`${PATH}/TogglingExample.tsx`),
    'DraggingTogglingComplexExample.tsx': readCodeFile<string>(`${PATH}/DraggingTogglingComplexExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <DraggingExample />
      <Txt>In order to enable Dragging you’ll have to:</Txt>
      <UnorderedList compact>
        <li>
          add a <Code>storeColumnsKey: your_key</Code> property to the DataTable;
        </li>
        <li>
          add a <Code>draggable: true</Code> property to each Dragging candidate column;
        </li>
        <li>
          use <Code>useDragToggleColumns()</Code> hook to get the sorted columns.
        </li>
      </UnorderedList>
      <CodeBlock code={code['DraggingExample.tsx']} />
      <Txt idea>
        The default order of the columns is the order in which they are defined in the <Code>columns</Code> prop.
      </Txt>

      <PageSubtitle value="Toggling" />
      <TogglingExample />
      <Txt>In order to enable Toggling you’ll have to:</Txt>
      <UnorderedList compact>
        <li>
          add a <Code>storeColumnsKey: your_key</Code> property to the DataTable;
        </li>
        <li>
          add a <Code>toggleable: true</Code> property to each Toggling candidate column;
        </li>
        <li>
          use <Code>useDragToggleColumns()</Code> hook to get the sorted columns.
        </li>
      </UnorderedList>
      <CodeBlock code={code['TogglingExample.tsx']} />
      <Txt idea>
        The default toggled columns are the ones with <Code>defaultToggle: true</Code> property.
      </Txt>

      <PageSubtitle value="Dragging & Toggling with context menu Reset" />
      <DraggingTogglingResetExample />

      <CodeBlock code={code['DraggingTogglingResetExample.tsx']} />

      <PageSubtitle value="Complex usage" />
      <DraggingTogglingComplexExample />
      <CodeBlock code={code['DraggingTogglingComplexExample.tsx']} />

      <PageNavigation of={PATH} />
    </>
  );
}
