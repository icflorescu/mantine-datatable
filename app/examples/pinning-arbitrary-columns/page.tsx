import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import {
  InteractivePinningExample,
  PinLeftAndRightColumnsExample,
  PinMultipleLeftColumnsExample,
  PinningAndTogglingExample,
  PinningWithColumnGroupsExample,
} from './PinArbitraryColumnsExamples';

const PATH: Route = '/examples/pinning-arbitrary-columns';

export const metadata = getRouteMetadata(PATH);

export default async function PinArbitraryColumnsExamplePage() {
  const code = await readCodeFile<
    Record<
      | 'multiple-left-pinned'
      | 'left-and-right-pinned'
      | 'interactive-pinning'
      | 'pinning-and-toggling'
      | 'pinning-with-column-groups',
      string
    >
  >(`${PATH}/PinArbitraryColumnsExamples.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Code hidden>pin, pinned, fix, fixed, affix, sticky, arbitrary, multiple, columns</Code>
      <Txt>
        In addition to <InternalLink to="/examples/pinning-the-first-column">pinning the first column</InternalLink> and{' '}
        <InternalLink to="/examples/pinning-the-last-column">pinning the last column</InternalLink> using the{' '}
        <Code>pinFirstColumn</Code> and <Code>pinLastColumn</Code> DataTable props, you can pin{' '}
        <strong>arbitrary columns</strong> to the left or right side of the table by setting the <Code>pinned</Code>{' '}
        property on individual column definitions.
      </Txt>
      <PageSubtitle value="Pinning multiple columns to the left" />
      <Txt>
        Set <Code>{"pinned: 'left'"}</Code> on any columns you want pinned to the left side of the table:
      </Txt>
      <PinMultipleLeftColumnsExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['multiple-left-pinned']} />
      <Txt info>
        Pinned columns are always rendered at the edges of the table: left-pinned columns come first, followed by the
        unpinned ones, and then by the right-pinned columns. Within each of these areas, columns keep their original
        order. So if you pin a column that sits in the middle of the <Code>columns</Code> array, it will be moved to the
        corresponding side of the table.
      </Txt>
      <PageSubtitle value="Pinning columns to both sides" />
      <Txt>
        You can combine left-pinned and right-pinned columns. In this example, the first two columns are pinned to the
        left, and the actions column is pinned to the right. This also works with{' '}
        <InternalLink to="/examples/records-selection">row selection</InternalLink>:
      </Txt>
      <PinLeftAndRightColumnsExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['left-and-right-pinned']} />
      <PageSubtitle value="Interactive pinning" />
      <Txt>
        You can allow users to pin and unpin columns interactively by setting <Code>{'pinnable: true'}</Code> on
        columns. When enabled, a pin icon appears in the column header on hover. Clicking it reveals a dropdown where
        users can choose to pin the column to the left or to the right, or to unpin it.
      </Txt>
      <Txt>
        For pinnable columns, <Code>pinned</Code> sets the <em>initial</em> pinning state. Interactive pinning relies on
        the same mechanism as{' '}
        <InternalLink to="/examples/column-dragging-and-toggling">column dragging and toggling</InternalLink>: provide a{' '}
        <Code>storeColumnsKey</Code> prop to the DataTable &mdash; it’s required for interactive pinning, since the
        pinning state is kept in local storage under this key. If you also need to restore the initial pinning state,
        call the <Code>useDataTableColumns()</Code> hook with the same <Code>key</Code> and use the{' '}
        <Code>resetColumnsPinning()</Code> function it returns.
      </Txt>
      <Txt>
        Pinning also works in right-to-left layouts, where the “left” and “right” sides are mirrored. Use the direction
        switch in the example below to see it in action:
      </Txt>
      <InteractivePinningExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['interactive-pinning']} />
      <PageSubtitle value="Combining pinning with column toggling" />
      <Txt>
        You can combine <Code>pinnable</Code> with <Code>toggleable</Code> on the same columns, allowing users to both
        pin or unpin columns and show or hide them. Right-click on the table header to open the column visibility menu.
      </Txt>
      <Txt>
        In this example, some columns are hidden by default using <Code>{'defaultToggle: false'}</Code>. Use the{' '}
        <Code>resetColumnsToggle</Code> and <Code>resetColumnsPinning</Code> functions to reset visibility and pinning
        independently.
      </Txt>
      <PinningAndTogglingExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['pinning-and-toggling']} />
      <PageSubtitle value="Pinning with column groups" />
      <Txt>
        When using <InternalLink to="/examples/column-grouping">column groups</InternalLink> with interactive pinning,
        you can pin individual columns within groups. The group header will be pinned only when{' '}
        <strong>all columns in the group</strong> are pinned to the same side. If columns within a group have different
        pinning states (some pinned left, some unpinned, or mixed), the group header will not be pinned.
      </Txt>
      <Txt warning title="Important">
        Group headers are rendered in the order in which you define the groups, but pinned columns are{' '}
        <strong>moved to the edges of the table</strong> (see above). If a column is pinned to the side opposite to its
        group &mdash; for instance, if you pin one of the columns of the “Employee” group below to the right &mdash; it
        will be moved to the right edge of the table and will end up under the wrong group header.
        <br />
        Since users can pin a pinnable column to either side, consider using static pinning (<Code>pinned</Code> without{' '}
        <Code>pinnable</Code>) for the columns of groups located at the edges of the table, and enabling interactive
        pinning only where this side effect is acceptable.
      </Txt>
      <Txt>Try pinning and unpinning columns in the example below to see how the group headers behave:</Txt>
      <PinningWithColumnGroupsExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['pinning-with-column-groups']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
