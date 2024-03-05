import { Code, Text } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { ScrollIntoViewExample, ScrollToExample } from './ScrollRowIntoViewExamples';

const PATH: Route = '/examples/scrolling-a-row-into-view';

export const metadata = getRouteMetadata(PATH);

export default async function ScrollIntoViewExamplesPage() {
  const code = await readCodeFile<Record<'scroll-into-view' | 'scroll-to', string>>(
    `${PATH}/ScrollRowIntoViewExamples.tsx`
  );

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        There are two possible approaches you could use to scroll a specific row into view in a {PRODUCT_NAME}. Both of
        them rely on adding <Code>data-*</Code>{' '}
        <InternalLink to="/examples/custom-row-or-cell-attributes">
          <Code>customRowAttributes</Code>
        </InternalLink>{' '}
        to the row, and then using DOM methods to find and scroll the row into view.
      </Txt>
      <PageSubtitle value="Using scrollIntoView" />
      <Txt>
        The simplest possible way is to use the{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView">
          <Code>scrollIntoView</Code>
        </ExternalLink>{' '}
        method on the row element itself. Here is an example of how you could use it:
      </Txt>
      <ScrollIntoViewExample />
      <Txt idea title="Keep in mind">
        <Text inherit mb="xs">
          This method is simple and works well in most cases, but it has a limitation when the table is part of a more
          complex layout - it will scroll the entire page to the top when bringing the row into view.
        </Text>
        <Text inherit mb="xs">
          Also, due to the fact that the <Code>DataTable</Code> header is fixed, using <Code>scrollIntoView()</Code>{' '}
          with no arguments, or the equivalent{' '}
          <Code style={{ whiteSpace: 'nowrap' }}>{"scrollIntoView({ block: 'start' })"}</Code>, will not work as
          expected.
        </Text>
        <Text inherit>
          You should use <Code>scrollIntoView(false)</Code>, or the equivalent{' '}
          <Code style={{ whiteSpace: 'nowrap' }}>{"scrollIntoView({ block: 'end' })"}</Code> instead.
        </Text>
      </Txt>
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['scroll-into-view']} />
      <PageSubtitle value="Using table viewport scrollTo" />
      <Txt>
        If the DataTable resides in a page with a more complex layout and you want to avoid scrolling the entire page
        when bringing a row into view, you can use the{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo">
          <Code>scrollTo</Code>
        </ExternalLink>{' '}
        method of the table viewport element:
      </Txt>
      <ScrollToExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['scroll-to']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
