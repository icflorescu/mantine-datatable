import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { PinLastColumnExample } from './PinLastColumnExample';

const PATH: Route = '/examples/pinning-the-last-column';

export const metadata = getRouteMetadata(PATH);

export default async function PinLastColumnExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/PinLastColumnExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Code hidden>fix, fixed, affix, sticky</Code>
      <Txt>
        You may have noticed that when you are using row selection and the table needs to scroll horizontally, the
        checkbox column is always visible. This is because the checkbox column is pinned to the left side of the table.
      </Txt>
      <Txt>
        In the same way, pinning the last column to the right side of the table could be useful when you have a table
        with many columns and you want to make sure the last column is always visible, even when the table is scrolled
        horizontally. For instance, you could use this feature to ensure that the{' '}
        <InternalLink to="/examples/row-actions-cell">row actions</InternalLink> are always visible.
      </Txt>
      <Txt>
        You can achieve this by setting the <Code>pinLastColumn</Code> DataTable prop to <Code>true</Code>:
      </Txt>
      <PinLastColumnExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code} />
      <Txt warning title="Warning">
        Combining this feature with <InternalLink to="/examples/column-grouping">column grouping</InternalLink> may lead
        to minor visual artifacts.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
