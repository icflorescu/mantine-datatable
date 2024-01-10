import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME, REPO_LINK } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
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

const PATH: Route = '/examples/column-dragging-and-toggling';

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
      <Txt>
        Starting with <Code>v7.3</Code>, {PRODUCT_NAME} supports column toggling and drag-and-drop reordering, thanks to
        the <ExternalLink to={`${REPO_LINK}/pull/483`}>outstanding work</ExternalLink> of{' '}
        <ExternalLink to="https://github.com/gfazioli">Giovambattista Fazioli</ExternalLink>.
      </Txt>
      <PageSubtitle value="Column drag-and-drop reordering" />
      <DraggingExample />
      <Txt>
        In order to enable <strong>column dragging</strong> you’ll have to:
      </Txt>
      <UnorderedList compact>
        <li>
          add a <Code>storeColumnsKey: your_key</Code> property to the DataTable (since the order of the columns is
          persisted in the local storage);
        </li>
        <li>
          add a <Code>draggable: true</Code> property to each <strong>dragging candidate</strong> column;
        </li>
        <li>
          use the <Code>useDataTableColumns()</Code> hook to get the sorted columns.
        </li>
      </UnorderedList>
      <CodeBlock code={code['DraggingExample.tsx']} />
      <Txt idea>
        The default order of the columns is the order in which they are defined in the <Code>columns</Code> prop.
      </Txt>
      <PageSubtitle value="Column toggling" />
      <Txt>
        In the below example you can toggle the first 3 columns. The last column is not toggleable and will always be
        visible. The first column is toggled off by default. Click with right mouse button on the header to select the
        columns you want to toggle.
      </Txt>
      <TogglingExample />
      <Txt>
        In order to enable <strong>column toggling</strong> you’ll have to:
      </Txt>
      <UnorderedList compact>
        <li>
          add a <Code>storeColumnsKey: your_key</Code> property to the DataTable (since the order of the columns is
          persisted in the local storage);
        </li>
        <li>
          add a <Code>toggleable: true</Code> property to each <strong>toggling candidate</strong> column;
        </li>
        <li>
          use the <Code>useDataTableColumns()</Code> hook to get the sorted columns.
        </li>
      </UnorderedList>
      <CodeBlock code={code['TogglingExample.tsx']} />
      <Txt info>
        You may define which columns will be toggled by default by setting the <Code>defaultToggle</Code> property to{' '}
        <Code>false</Code>.
      </Txt>
      <PageSubtitle value="Dragging and toggling with context menu reset" />
      <DraggingTogglingResetExample />
      <CodeBlock code={code['DraggingTogglingResetExample.tsx']} />
      <PageSubtitle value="Complex usage" />
      <DraggingTogglingComplexExample />
      <CodeBlock code={code['DraggingTogglingComplexExample.tsx']} />
      <PageNavigation of={PATH} />
    </>
  );
}
