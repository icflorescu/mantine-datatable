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
        Set <Code>{'pinned: \'left\''}</Code> on any columns you want pinned to the left side of the table:
      </Txt>
      <PinMultipleLeftColumnsExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['multiple-left-pinned']} />
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
        You can allow users to pin and unpin columns interactively by setting <Code>{'pinnable: true'}</Code> on columns.
        When enabled, a pin icon appears in the column header on hover. Clicking it reveals a dropdown where users can
        choose to pin the column to the left, right, or unpin it.
      </Txt>
      <Txt>
        Use <Code>pinned</Code> to set the initial pinning state for pinnable columns. The pinning state is persisted in
        localStorage when you provide a <Code>storeColumnsKey</Code> prop to the DataTable. You can also use the{' '}
        <Code>resetColumnsPinning</Code> function from the <Code>useDataTableColumns</Code> hook to reset pinning to
        default values.
      </Txt>
      <InteractivePinningExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['interactive-pinning']} />
      <PageSubtitle value="Combining pinning with column toggling" />
      <Txt>
        You can combine <Code>pinnable</Code> with <Code>toggleable</Code> on the same columns. This allows users to both
        pin/unpin columns and show/hide them. Right-click on the table header to open the column visibility menu.
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
      <Txt idea>
        <strong>Important:</strong> Pinning works within the group&apos;s visual position in the table. If a group is
        positioned on the left side of the table (like the &ldquo;Employee&rdquo; group below), its columns can only be
        effectively pinned to the left. Pinning them to the right will have no visual effect because pinning uses CSS{' '}
        <Code>position: sticky</Code> which doesn&apos;t reorder columns — it only makes them &ldquo;stick&rdquo; when
        scrolling. Similarly, columns in a middle-positioned group will only stick from their group&apos;s starting
        position.
      </Txt>
      <Txt>
        Try pinning and unpinning columns in the example below to see how the group headers behave:
      </Txt>
      <PinningWithColumnGroupsExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['pinning-with-column-groups']} />
      <PageNavigation of={PATH} />
    </>
  );
}
