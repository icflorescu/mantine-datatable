import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import {
  PinFirstAndLastColumnsExampleWithRecordSelection,
  PinFirstColumnExampleWithoutRecordSelection,
  PinFirstColumnExampleWithRecordSelection,
} from './PinFirstColumnExamples';

const PATH: Route = '/examples/pinning-the-first-column';

export const metadata = getRouteMetadata(PATH);

export default async function PinFirstColumnExamplePage() {
  const code = await readCodeFile<
    Record<'without-record-selection' | 'with-record-selection' | 'first-last-and-record-selection', string>
  >(`${PATH}/PinFirstColumnExamples.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Code hidden>fix, fixed, affix, sticky</Code>
      <Txt>
        Pinning the first column to the left side of the table could be useful when you have a table with many columns
        and you want to make sure the first column is always visible, even when the table is scrolled horizontally. For
        instance, you could use this feature to ensure that{' '}
        <InternalLink to="/examples/row-actions-cell">row actions</InternalLink> placed on the first column are always
        visible.
      </Txt>
      <Txt>
        You can achieve this by setting the <Code>pinFirstColumn</Code> DataTable prop to <Code>true</Code>:
      </Txt>
      <PinFirstColumnExampleWithoutRecordSelection />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['without-record-selection']} />
      <Txt>
        You can also combine this feature with{' '}
        <InternalLink to="/examples/records-selection">row selection</InternalLink>, in which case both the selection
        checkbox and the first user-provided column will be pinned to the left side of the table:
      </Txt>
      <PinFirstColumnExampleWithRecordSelection />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['with-record-selection']} />
      <Txt>
        You can use <InternalLink to="/examples/records-selection">row selection</InternalLink> and pin both the first
        and <InternalLink to="/examples/pinning-the-last-column">the last column</InternalLink> at the same time:
      </Txt>
      <PinFirstAndLastColumnsExampleWithRecordSelection />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['first-last-and-record-selection']} />
      <Txt warning title="Warning">
        Combining this feature with <InternalLink to="/examples/column-grouping">column grouping</InternalLink> may lead
        to minor visual artifacts.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
