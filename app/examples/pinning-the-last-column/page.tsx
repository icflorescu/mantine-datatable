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
import { PinLastColumnExample, PinLastColumnExampleWithColumnGroups } from './PinLastColumnExamples';

const PATH: Route = '/examples/pinning-the-last-column';

export const metadata = getRouteMetadata(PATH);

export default async function PinLastColumnExamplePage() {
  const code = await readCodeFile<Record<'default' | 'with-column-groups', string>>(
    `${PATH}/PinLastColumnExamples.tsx`
  );

  return (
    <>
      <PageTitle of={PATH} />
      <Code hidden>fix, fixed, affix, sticky</Code>
      <Txt>
        You may have noticed that when you’re using{' '}
        <InternalLink to="/examples/records-selection">records selection</InternalLink> and the table needs to scroll
        horizontally, the checkbox column is always visible. This is because the checkbox column is pinned to the left
        side of the table.
      </Txt>
      <Txt>
        In the same way, when a table has many columns, you may want to pin its last column to the right side of the
        table, so that it stays visible even when the table is scrolled horizontally. For instance, you could use this
        feature to make sure the <InternalLink to="/examples/row-actions-cell">row actions</InternalLink> are always
        visible.
      </Txt>
      <Txt>
        You can achieve this by setting the <Code>pinLastColumn</Code> DataTable prop to <Code>true</Code>:
      </Txt>
      <PinLastColumnExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code.default} />
      <Txt info>
        <Code>pinLastColumn</Code> pins the last <strong>visible</strong> column. If that column is hidden (for instance
        by <InternalLink to="/examples/column-dragging-and-toggling">column toggling</InternalLink> or a{' '}
        <Code>visibleMediaQuery</Code>), the previous visible column will be pinned instead.
      </Txt>
      <PageSubtitle value="Using with column grouping" />
      <Txt warning title="Warning!">
        When using this feature with <InternalLink to="/examples/column-grouping">column grouping</InternalLink>, you
        need to <strong>make sure that the last group contains only one column</strong>. Otherwise, only the last column
        will be pinned, but its group header will scroll away with the rest of the table.
      </Txt>
      <Txt>
        Here is an example of how you can pin the last column when using column grouping. Notice how the last group
        contains only one column, and how we’re using an absolutely positioned custom title component to create the
        illusion that the <em>Actions</em> title is centered vertically:
      </Txt>
      <PinLastColumnExampleWithColumnGroups />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['with-column-groups']} />
      <Txt idea>
        If you need to pin more than one column, or a whole group of columns, set the <Code>pinned</Code> property on
        individual columns instead. See the{' '}
        <InternalLink to="/examples/pinning-arbitrary-columns">pinning arbitrary columns</InternalLink> example to learn
        more.
      </Txt>
      <Txt>
        Head over to the next example to discover how you can pin the <strong>first</strong> column to the{' '}
        <strong>left</strong> side of the table.
      </Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
