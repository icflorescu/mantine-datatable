import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { EditingCellsCallbackExample } from './EditingCellsCallbackExample';
import { EditingCellsCustomRenderExample } from './EditingCellsCustomRenderExample';
import { EditingCellsExample } from './EditingCellsExample';
import { EditingCellsGlobalModeExample } from './EditingCellsGlobalModeExample';

const PATH: Route = '/examples/editing-cells';

export const metadata = getRouteMetadata(PATH);

export default async function EditingCellsExamplePage() {
  const code = await allPromiseProps({
    'EditingCellsExample.tsx': readCodeFile<string>(`${PATH}/EditingCellsExample.tsx`),
    'EditingCellsCustomRenderExample.tsx': readCodeFile<string>(`${PATH}/EditingCellsCustomRenderExample.tsx`),
    'EditingCellsGlobalModeExample.tsx': readCodeFile<string>(`${PATH}/EditingCellsGlobalModeExample.tsx`),
    'EditingCellsCallbackExample.tsx': readCodeFile<string>(`${PATH}/EditingCellsCallbackExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Mark columns as <Code>editable</Code> and provide an <Code>onCellEdit</Code> handler to enable inline cell
        editing. Double-click any editable cell to enter edit mode. Press <Code>Enter</Code> or click away to commit, or
        press <Code>Escape</Code> to cancel.
      </Txt>
      <EditingCellsExample />
      <CodeBlock code={code['EditingCellsExample.tsx']} />
      <Txt>
        Use a function for <Code>editable</Code> to control editability per cell:
      </Txt>
      <CodeBlock
        code={`columns={[
  { accessor: 'name', editable: (record, index) => !record.locked },
]}`}
      />
      <Txt>
        Control when edits are committed with <Code>commitEditOn</Code> (per column) or <Code>defaultCommitEditOn</Code>{' '}
        (table-wide). Default is <Code>['blur', 'enter']</Code>.
      </Txt>
      <PageSubtitle value="onCellEdit callback" />
      <Txt>
        The <Code>onCellEdit</Code> callback receives the updated record, its index, the column{' '}
        <Code>accessor</Code>, and the new <Code>value</Code>. Double-click a cell below to see it fire.
      </Txt>
      <EditingCellsCallbackExample />
      <CodeBlock code={code['EditingCellsCallbackExample.tsx']} />
      <PageSubtitle value="Global edit mode" />
      <Txt>
        Set <Code>editMode="global"</Code> to put all editable cells into edit mode simultaneously — useful for
        spreadsheet-style inline editing. Tab and Shift+Tab navigate between cells. Use <Code>editingCellStyle</Code>{' '}
        or <Code>editingCellClassName</Code> to highlight the focused cell.
      </Txt>
      <EditingCellsGlobalModeExample />
      <CodeBlock code={code['EditingCellsGlobalModeExample.tsx']} />
      <PageSubtitle value="Custom edit render" />
      <Txt>
        Provide an <Code>editRender</Code> function on a column to replace the built-in <Code>TextInput</Code> with any
        component. Use the <Code>onCommit(value)</Code> override to commit a value in a single call — useful for
        controls like <Code>Select</Code> that change and confirm in one event.
      </Txt>
      <EditingCellsCustomRenderExample />
      <CodeBlock code={code['EditingCellsCustomRenderExample.tsx']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
