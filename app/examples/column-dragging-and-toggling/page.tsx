import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME, REPO_LINK } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
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
import DynamicColumnExample from './DynamicColumnExample';
import TogglingExample from './TogglingExample';
import TogglingWithCustomControlsExample from './TogglingWithCustomControlsExample';

const PATH: Route = '/examples/column-dragging-and-toggling';

export const metadata = getRouteMetadata(PATH);

export default async function DraggingExamplePage() {
  const code = await allPromiseProps({
    'DraggingExample.tsx': readCodeFile<string>(`${PATH}/DraggingExample.tsx`),
    'DraggingTogglingResetExample.tsx': readCodeFile<string>(`${PATH}/DraggingTogglingResetExample.tsx`),
    'TogglingExample.tsx': readCodeFile<string>(`${PATH}/TogglingExample.tsx`),
    'TogglingWithCustomControlsExample.tsx': readCodeFile<string>(`${PATH}/TogglingWithCustomControlsExample.tsx`),
    'DynamicColumnExample.tsx': readCodeFile<string>(`${PATH}/DynamicColumnExample.tsx`),
    'DraggingTogglingComplexExample.tsx': readCodeFile<string>(`${PATH}/DraggingTogglingComplexExample.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} lets users reorder columns by drag-and-drop and show or hide them as needed. The column order and
        visibility are persisted in the browser’s local storage, so they survive page reloads. These features were
        originally contributed by <ExternalLink to="https://github.com/gfazioli">Giovambattista Fazioli</ExternalLink>{' '}
        &mdash; thanks for the <ExternalLink to={`${REPO_LINK}/pull/483`}>outstanding work</ExternalLink>!
      </Txt>
      <PageSubtitle value="Column drag-and-drop reordering" />
      <DraggingExample />
      <Txt>
        In order to enable <strong>column dragging</strong> you’ll have to:
      </Txt>
      <UnorderedList compact>
        <li>
          add a <Code>storeColumnsKey: &apos;your_key&apos;</Code> property to the DataTable (the column order is
          persisted in local storage under this key);
        </li>
        <li>
          add a <Code>draggable: true</Code> property to each <strong>dragging candidate</strong> column;
        </li>
        <li>
          use the <Code>useDataTableColumns()</Code> hook with the same <Code>key</Code> to get the effective (sorted)
          columns and pass them to the DataTable.
        </li>
      </UnorderedList>
      <CodeBlock code={code['DraggingExample.tsx']} />
      <Txt>
        Draggable columns display a grip icon in their header. A column can only be dropped onto another draggable
        column, and is then moved to that column’s position.
      </Txt>
      <Txt idea>
        The default order of the columns is the order in which they are defined in the <Code>columns</Code> prop. You
        can restore it at any time by calling the <Code>resetColumnsOrder()</Code> function returned by the hook.
      </Txt>
      <PageSubtitle value="Column toggling" />
      <Txt>In the example below:</Txt>
      <UnorderedList compact>
        <li>you can toggle the first 3 columns;</li>
        <li>the last column is not toggleable and will always be visible;</li>
        <li>the first column is hidden by default.</li>
      </UnorderedList>
      <Txt>
        Hover over a toggleable column header and click its <strong>×</strong> button to hide the column, or right-click
        anywhere on the table header to open a menu where you can show or hide each toggleable column.
      </Txt>
      <TogglingExample />
      <Txt>
        In order to enable <strong>column toggling</strong> you’ll have to:
      </Txt>
      <UnorderedList compact>
        <li>
          add a <Code>storeColumnsKey: &apos;your_key&apos;</Code> property to the DataTable (the column visibility is
          persisted in local storage under this key);
        </li>
        <li>
          add a <Code>toggleable: true</Code> property to each <strong>toggling candidate</strong> column;
        </li>
        <li>
          use the <Code>useDataTableColumns()</Code> hook with the same <Code>key</Code> to get the effective columns
          and pass them to the DataTable.
        </li>
      </UnorderedList>
      <CodeBlock code={code['TogglingExample.tsx']} />
      <Txt info>
        Toggleable columns are visible by default. To hide a column initially, set its <Code>defaultToggle</Code>{' '}
        property to <Code>false</Code>. Call <Code>resetColumnsToggle()</Code> to restore the default visibility of all
        columns.
      </Txt>
      <PageSubtitle value="Custom column visibility controls" />
      <Txt>
        Besides the built-in header menu, you can build your own column visibility controls. The{' '}
        <Code>useDataTableColumns()</Code> hook returns the current visibility state as <Code>columnsToggle</Code>{' '}
        &mdash; an array of <Code>{'{ accessor, toggleable, toggled }'}</Code> objects &mdash; and a{' '}
        <Code>setColumnsToggle()</Code> function to update it:
      </Txt>
      <TogglingWithCustomControlsExample />
      <CodeBlock code={code['TogglingWithCustomControlsExample.tsx']} />
      <Txt idea>
        Similarly, you can use <Code>columnsOrder</Code> (an array of accessors) and <Code>setColumnsOrder()</Code> to
        change the column order programmatically.
      </Txt>
      <PageSubtitle value="Adding and removing columns at runtime" />
      <Txt>
        You can add or remove columns at runtime by simply changing the array of columns you pass to the hook. The
        persisted order and visibility state is automatically kept in sync with the current column definitions: state
        for removed columns is discarded, and newly added columns are appended with their default settings.
      </Txt>
      <DynamicColumnExample />
      <CodeBlock code={code['DynamicColumnExample.tsx']} />
      <PageSubtitle value="Resetting the column state from a context menu" />
      <Txt>
        The reset functions returned by the hook can be called from anywhere &mdash; for example, from a{' '}
        <InternalLink to="/examples/using-with-mantine-contextmenu">row context menu</InternalLink>. Right-click on any
        row in the example below to reset the column visibility or order:
      </Txt>
      <DraggingTogglingResetExample />
      <CodeBlock code={code['DraggingTogglingResetExample.tsx']} />
      <PageSubtitle value="Combining dragging and toggling with sorting" />
      <Txt>
        Column dragging and toggling work seamlessly with other features, such as{' '}
        <InternalLink to="/examples/sorting">sorting</InternalLink>:
      </Txt>
      <DraggingTogglingComplexExample />
      <CodeBlock code={code['DraggingTogglingComplexExample.tsx']} />
      <Txt info>
        The <Code>useDataTableColumns()</Code> hook stores its state in local storage under keys derived from the one
        you provide (<Code>your_key-columns-order</Code>, <Code>your_key-columns-toggle</Code>,{' '}
        <Code>your_key-columns-width</Code> and <Code>your_key-columns-pinning</Code>), so make sure each table on your
        site uses a unique key.
        <br />
        The stored values are read after the component mounts, to avoid server-side rendering hydration mismatches. If
        you only render the table on the client, you can pass <Code>getInitialValueInEffect: false</Code> to the hook to
        read them synchronously.
      </Txt>
      <Txt>
        See also <InternalLink to="/examples/column-resizing">column resizing</InternalLink> and{' '}
        <InternalLink to="/examples/pinning-arbitrary-columns">pinning arbitrary columns</InternalLink>, which rely on
        the same hook.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
