import { Code, Text } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { ScrollRowIntoViewExample } from './ScrollRowIntoViewExample';

const PATH: Route = '/examples/scrolling-a-row-into-view';

export const metadata = getRouteMetadata(PATH);

export default async function ScrollableVsAutoHeightExamplePage() {
  const code = await readCodeFile<string>(`${PATH}/ScrollRowIntoViewExample.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        One possible way to scroll a specific row into view is to use the{' '}
        <InternalLink to="/examples/custom-row-or-cell-attributes">
          <Code>customRowAttributes</Code> property
        </InternalLink>{' '}
        to add a custom <Code>data-*</Code> attribute to the row, and then use{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector">
          <Code>document.querySelector</Code>
        </ExternalLink>{' '}
        to find the row and call{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView">
          <Code>scrollIntoView</Code>
        </ExternalLink>{' '}
        on it.
      </Txt>
      <ScrollRowIntoViewExample />
      <Txt idea title="Keep in mind">
        <Text inherit mb="xs">
          Due to the fact that the <Code>DataTable</Code> header is fixed, using <Code>scrollIntoView()</Code> with no
          arguments, or the equivalent{' '}
          <Code style={{ whiteSpace: 'nowrap' }}>{"scrollIntoView({ block: 'start' })"}</Code>, will not work as
          expected.
        </Text>
        <Text inherit>
          You should use <Code>scrollIntoView(false)</Code>, or the equivalent{' '}
          <Code style={{ whiteSpace: 'nowrap' }}>{"scrollIntoView({ block: 'end' })"}</Code> instead.
        </Text>
      </Txt>
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
