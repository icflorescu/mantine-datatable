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
  PinFirstAndLastColumnsExampleWithRecordSelection,
  PinFirstColumnExampleWithColumnGroups,
  PinFirstColumnExampleWithoutRecordSelection,
  PinFirstColumnExampleWithRecordSelection,
} from './PinFirstColumnExamples';

const PATH: Route = '/examples/pinning-the-first-column';

export const metadata = getRouteMetadata(PATH);

export default async function PinFirstColumnExamplePage() {
  const code = await readCodeFile<
    Record<
      'without-record-selection' | 'with-record-selection' | 'first-last-and-record-selection' | 'with-column-groups',
      string
    >
  >(`${PATH}/PinFirstColumnExamples.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Code hidden>fix, fixed, affix, sticky</Code>
      <Txt>
        When a table has many columns and needs to scroll horizontally, you may want to make sure its first column is
        always visible &mdash; for instance, to keep the record name or the{' '}
        <InternalLink to="/examples/row-actions-cell">row actions</InternalLink> in view at all times.
      </Txt>
      <Txt>
        You can achieve this by setting the <Code>pinFirstColumn</Code> DataTable prop to <Code>true</Code>:
      </Txt>
      <PinFirstColumnExampleWithoutRecordSelection />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['without-record-selection']} />
      <Txt info>
        <Code>pinFirstColumn</Code> pins the first <strong>visible</strong> column. If that column is hidden (for
        instance by <InternalLink to="/examples/column-dragging-and-toggling">column toggling</InternalLink> or a{' '}
        <Code>visibleMediaQuery</Code>), the next visible column will be pinned instead.
      </Txt>
      <Txt>
        You can also combine this feature with{' '}
        <InternalLink to="/examples/records-selection">records selection</InternalLink>, in which case both the
        selection checkbox column and the first user-provided column will be pinned to the left side of the table:
      </Txt>
      <PinFirstColumnExampleWithRecordSelection />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['with-record-selection']} />
      <Txt>
        You can also use <InternalLink to="/examples/records-selection">records selection</InternalLink> and pin both
        the first and <InternalLink to="/examples/pinning-the-last-column">the last column</InternalLink> at the same
        time:
      </Txt>
      <PinFirstAndLastColumnsExampleWithRecordSelection />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['first-last-and-record-selection']} />
      <PageSubtitle value="Using with column grouping" />
      <Txt warning title="Warning!">
        When using this feature with <InternalLink to="/examples/column-grouping">column grouping</InternalLink>, you
        need to <strong>make sure that the first group contains only one column</strong>. Otherwise, only the first
        column will be pinned, but its group header will scroll away with the rest of the table.
      </Txt>
      <Txt>
        Here is an example of how you can pin the first column when using column grouping. Notice how the first group
        contains only one column, and how we’re using an absolutely positioned custom title component to create the
        illusion that the <em>Name</em> title is centered vertically:
      </Txt>
      <PinFirstColumnExampleWithColumnGroups />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['with-column-groups']} />
      <Txt idea>
        If you need to pin more than one column, or a whole group of columns, set the <Code>pinned</Code> property on
        individual columns instead. Group headers are pinned too when all of their columns are pinned to the same side.
        Head over to the <InternalLink to="/examples/pinning-arbitrary-columns">pinning arbitrary columns</InternalLink>{' '}
        example to learn more.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
