import { Box, Code } from '@mantine/core';
import type { Route } from 'next';
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
import { RowExpansionExampleCollapseProps } from './RowExpansionExampleCollapseProps';
import { RowExpansionExampleControlledMode } from './RowExpansionExampleControlledMode';
import { RowExpansionExampleExpandableRows } from './RowExpansionExampleExpandableRows';
import { RowExpansionExampleInitiallyExpandedRows } from './RowExpansionExampleInitiallyExpandedRows';
import { RowExpansionExampleMultipleExpandedRows } from './RowExpansionExampleMultipleExpandedRows';
import { RowExpansionExampleSimple } from './RowExpansionExampleSimple';
import { RowExpansionExampleToggleButton } from './RowExpansionExampleToggleButton';
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
    'RowExpansionExampleToggleButton.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleToggleButton.tsx`),
    'RowExpansionExampleToggleButton.module.css': readCodeFile<string>(
      `${PATH}/RowExpansionExampleToggleButton.module.css`
    ),
    'RowExpansionExampleTriggerAlways.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleTriggerAlways.tsx`),
    'RowExpansionExampleWithInlineEditor.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleWithInlineEditor.tsx`),
    'RowExpansionExampleWithLazyLoading.tsx': readCodeFile<string>(`${PATH}/RowExpansionExampleWithLazyLoading.tsx`),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        The <Code>rowExpansion</Code> property lets you display additional content below a row when the user clicks on
        it &mdash; the so-called <em>“row expansion”</em> behavior.
      </Txt>
      <PageSubtitle value="Basic usage" />
      <Txt>
        In its most basic form, the feature only requires a <Code>content</Code> function returning the content to be{' '}
        <em>lazily rendered</em> when a row is expanded. The function receives an object with the current{' '}
        <Code>record</Code>, its <Code>index</Code> and a <Code>collapse</Code> callback (more on that below).
      </Txt>
      <Txt info title="Heads up">
        <Box mb="sm">Styling the expanded content is up to you.</Box>
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
        <ExternalLink to="https://mantine.dev/core/collapse/">Collapse</ExternalLink> component. You can customize its{' '}
        <Code>animateOpacity</Code>, <Code>transitionDuration</Code> and <Code>transitionTimingFunction</Code>{' '}
        properties by passing a <Code>collapseProps</Code> object, like so:
      </Txt>
      <RowExpansionExampleCollapseProps />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleCollapseProps.tsx']} />
      <PageSubtitle value="Allowing multiple rows to be expanded at once" />
      <Txt>
        By default, only one row can be expanded at a time; expanding a row collapses the previously expanded one. Set{' '}
        <Code>allowMultiple</Code> to <Code>true</Code> to change this behavior:
      </Txt>
      <RowExpansionExampleMultipleExpandedRows />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleMultipleExpandedRows.tsx']} />
      <PageSubtitle value="Specifying which rows are expandable" />
      <Txt>
        Use the <Code>expandable</Code> function to specify which rows can be expanded. It receives an object with the
        current <Code>record</Code> and its <Code>index</Code> and should return a boolean:
      </Txt>
      <RowExpansionExampleExpandableRows />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleExpandableRows.tsx']} />
      <PageSubtitle value="Specifying which rows are initially expanded" />
      <Txt>
        Use the <Code>initiallyExpanded</Code> function to specify which rows are expanded when the table is first
        rendered. Note that, unless <Code>allowMultiple</Code> is <Code>true</Code>, only the first matching row will be
        expanded:
      </Txt>
      <RowExpansionExampleInitiallyExpandedRows />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleInitiallyExpandedRows.tsx']} />
      <PageSubtitle value="Always expand all rows" />
      <Txt>
        If you want all rows to be locked in their expanded state, set the row expansion <Code>trigger</Code> property
        to <Code>{"'always'"}</Code>:
      </Txt>
      <RowExpansionExampleTriggerAlways />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleTriggerAlways.tsx']} />
      <PageSubtitle value="Using the collapse function in row expansion content" />
      <Txt>
        Besides the current record and its index, the <Code>content</Code> function also receives a{' '}
        <Code>collapse</Code> callback that you can call to collapse the expanded row &mdash; for instance, when the
        user saves or cancels the changes in an inline editor:
      </Txt>
      <RowExpansionExampleWithInlineEditor />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleWithInlineEditor.tsx']} />
      <PageSubtitle value="Lazy-loading row expansion data" />
      <Txt>
        As mentioned above, the <Code>content</Code> function is <em>lazily executed</em> when a row is expanded to
        prevent creating unnecessary DOM elements.
        <br />
        If your row expansion content needs to show data that doesn’t come from the table <Code>records</Code>, you can
        take advantage of this behavior to load it only when a row is expanded:
      </Txt>
      <RowExpansionExampleWithLazyLoading />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleWithLazyLoading.tsx']} />
      <PageSubtitle value="Controlled mode" />
      <Txt>
        To control which rows are expanded from outside the table, set the <Code>rowExpansion.expanded</Code> property
        to an object containing:
      </Txt>
      <UnorderedList compact>
        <li>
          <Code>recordIds</Code> &rarr; an array containing the IDs of the currently expanded records;
        </li>
        <li>
          <Code>onRecordIdsChange</Code> &rarr; a callback function invoked with the new array of expanded record IDs
          when the user expands or collapses a row.
        </li>
      </UnorderedList>
      <RowExpansionExampleControlledMode />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['RowExpansionExampleControlledMode.tsx']} />
      <PageSubtitle value="Expanding rows with a toggle button" />
      <Txt>
        If you don’t want rows to expand or collapse when clicked, set the <Code>rowExpansion.trigger</Code> property to{' '}
        <Code>{"'never'"}</Code> and control the expansion state yourself. For instance, here is how you could expand
        and collapse rows using a button in a dedicated column:
      </Txt>
      <RowExpansionExampleToggleButton />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock
        tabs={{ code, keys: ['RowExpansionExampleToggleButton.tsx', 'RowExpansionExampleToggleButton.module.css'] }}
      />
      <Txt info title="Heads up">
        Since <Code>trigger: {"'never'"}</Code> disables expanding on click, you don’t need to call{' '}
        <Code>event.stopPropagation()</Code> in the toggle button handler; the row itself doesn’t react to clicks.
      </Txt>
      <Txt info>
        If you need to combine expanding rows on click with links, buttons,{' '}
        <InternalLink to="/examples/row-actions-cell">row action cells</InternalLink> or other clickable components
        inside cells, make sure to intercept the <Code>click</Code> event on those components and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          call its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
        <br />
        See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">this example</InternalLink> for
        more information.
      </Txt>
      <Txt>
        Head over to the <InternalLink to="/examples/nested-tables">next example</InternalLink> to see how you can use
        the row expansion feature to display nested tables.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
