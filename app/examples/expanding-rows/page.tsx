import { Box, Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { RowExpansionExampleCollapseProps } from './RowExpansionExampleCollapseProps';
import { RowExpansionExampleControlledMode } from './RowExpansionExampleControlledMode';
import { RowExpansionExampleExpandableRows } from './RowExpansionExampleExpandableRows';
import { RowExpansionExampleInitiallyExpandedRows } from './RowExpansionExampleInitiallyExpandedRows';
import { RowExpansionExampleMultipleExpandedRows } from './RowExpansionExampleMultipleExpandedRows';
import { RowExpansionExampleSimple } from './RowExpansionExampleSimple';
import { RowExpansionExampleTriggerAlways } from './RowExpansionExampleTriggerAlways';
import { RowExpansionExampleWithInlineEditor } from './RowExpansionExampleWithInlineEditor';
import { RowExpansionExampleWithLazyLoading } from './RowExpansionExampleWithLazyLoading';

const PATH: Route = '/examples/expanding-rows';

export const metadata = getRouteMetadata(PATH);

export default async function ExpandingRowsExamplePage() {
  const code = await allPromiseProps({
    'RowExpansionExampleCollapseProps.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleCollapseProps.tsx`),
    'RowExpansionExampleControlledMode.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleControlledMode.tsx`),
    'RowExpansionExampleExpandableRows.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleExpandableRows.tsx`),
    'RowExpansionExampleInitiallyExpandedRows.tsx': readCodeFile<string>(
      `${PATH}/RowExpansionExampleInitiallyExpandedRows.tsx`
    ),
    'RowExpansionExampleMultipleExpandedRows.tsx': readCodeFile<string>(
      `${PATH}/RowExpansionExampleMultipleExpandedRows.tsx`
    ),
    'RowExpansionExampleSimple.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleSimple.tsx`),
    'RowExpansionExampleSimple.module.css': readCodeFile<string>(`${PATH}/RowExpansionExampleSimple.module.css`),
    'RowExpansionExampleTriggerAlways.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleTriggerAlways.tsx`),
    'RowExpansionExampleWithInlineEditor.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleWithInlineEditor.tsx`),
    'RowExpansionExampleWithLazyLoading.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleWithLazyLoading.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        The <Code>rowExpansion</Code> property allows you to define the <em>“row expansion”</em> behavior of the{' '}
        DataTable.
      </Txt>
      <PageSubtitle value="Basic usage" />
      <Txt>
        In its most basic usage scenario, the feature only requires specifying the content to be{' '}
        <em>lazily rendered</em> when a row is expanded.
      </Txt>
      <Txt info title="Heads up">
        <Box mb="sm">Styling the expanded content falls within your responsibility.</Box>
        <div>
          Don’t forget to set the <Code>idAccessor</Code> property if your unique record key is not{' '}
          <Code>{"'id'"}</Code>.
          <br />
          See <InternalLink to="/examples/non-standard-record-ids">non-standard record IDs</InternalLink> for more info.
        </div>
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RowExpansionExampleSimple.tsx', 'RowExpansionExampleSimple.module.css'] }} />
      <Txt>Click on a row to test the behavior:</Txt>
      <RowExpansionExampleSimple />
      <PageSubtitle value="Specifying collapse properties" />
      <Txt>
        Internally, the expanded content is rendered inside a Mantine{' '}
        <ExternalLink to="https://mantine.dev/core/collapse/">Collapse</ExternalLink> component. You can customize the
        underlying Collapse component like so:
      </Txt>
      <RowExpansionExampleCollapseProps />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleCollapseProps.tsx']} />
      <PageSubtitle value="Allowing multiple rows to be expanded at once" />
      <Txt>
        By default, a single row can be expanded at a certain time. You can override the default behavior like so:
      </Txt>
      <RowExpansionExampleMultipleExpandedRows />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleMultipleExpandedRows.tsx']} />
      <PageSubtitle value="Specifying which rows are expandable" />
      <Txt>You can specify which rows are expandable like so:</Txt>
      <RowExpansionExampleExpandableRows />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleExpandableRows.tsx']} />
      <PageSubtitle value="Specifying which rows are initially expanded" />
      <Txt>You can specify which rows are initially expanded like so:</Txt>
      <RowExpansionExampleInitiallyExpandedRows />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleInitiallyExpandedRows.tsx']} />
      <PageSubtitle value="Always expand all rows" />
      <Txt>
        If you want all rows to be locked in their expanded state, just set the row expansion <Code>trigger</Code>{' '}
        property to <Code>{"'always'"}</Code>:
      </Txt>
      <RowExpansionExampleTriggerAlways />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleTriggerAlways.tsx']} />
      <PageSubtitle value="Using collapse() function in row expansion content" />
      <Txt>
        Besides the current record, the <Code>content</Code> function also receives a <Code>collapse</Code> callback
        that could be used, for instance, in an inline editor like so:
      </Txt>
      <RowExpansionExampleWithInlineEditor />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleWithInlineEditor.tsx']} />
      <PageSubtitle value="Lazy-loading row expansion data" />
      <Txt>
        As mentioned above, the <Code>content</Code> function is <em>lazily executed</em> when a row is expanded to
        prevent creating unnecessary DOM elements.
        <br />
        If your row expansion content needs to show data that comes from outside the table <Code>records</Code>, you
        could exploit this behavior to lazy-load it only when a row is expanded:
      </Txt>
      <RowExpansionExampleWithLazyLoading />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleWithLazyLoading.tsx']} />
      <PageSubtitle value="Controlled mode" />
      <Txt>
        You can control the row expansion feature by pointing the <Code>rowExpansion</Code>/<Code>expanded</Code>{' '}
        property to an object containing:
      </Txt>
      <ul>
        <li>
          <Code>recordIds</Code> → an array containing the currently expanded record IDs
        </li>
        <li>
          <Code>onRecordIdsChange</Code> → a callback function that gets called when the currently expanded records
          change
        </li>
      </ul>
      <Txt>
        When using the row expansion feature in controlled mode, if you want to prevent the default behavior of toggling
        the expansion state on click, set the <Code>rowExpansion</Code>/<Code>trigger</Code> property to{' '}
        <Code>{"'never'"}</Code>.
      </Txt>
      <RowExpansionExampleControlledMode />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleControlledMode.tsx']} />
      <Txt info>
        If you need to combine the row expansion behavior with links, buttons,{' '}
        <InternalLink to="/examples/row-actions-cell">row action cells</InternalLink> or any kind of clickable
        components inside cells, make sure to intercept the <Code>click</Code> event on those components and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
        <br />
        See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">this example</InternalLink> for
        more information.
      </Txt>
      <Txt>
        Head over to the <InternalLink to="/examples/nested-tables">next example</InternalLink> to see how you can abuse
        the row expansion feature to display nested tables.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
