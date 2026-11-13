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
        There are two approaches you could use to scroll a specific row into view in a {PRODUCT_NAME}. Both rely on
        adding <Code>data-*</Code>{' '}
        <InternalLink to="/examples/custom-row-or-cell-attributes">
          <Code>customRowAttributes</Code>
        </InternalLink>{' '}
        to the rows, then using DOM methods to find the desired row and scroll it into view.
      </Txt>
      <PageSubtitle value="Using scrollIntoView" />
      <Txt>
        The simplest way is to use the{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView">
          <Code>scrollIntoView</Code>
        </ExternalLink>{' '}
        method of the row element itself. Here is an example of how you could use it:
      </Txt>
      <ScrollIntoViewExample />
      <Txt idea title="Keep in mind">
        <Text inherit mb="xs">
          This method is simple and works well in most cases, but it has a drawback when the table is part of a more
          complex layout: besides the table itself, it will also scroll the page (and any other scrollable ancestors) as
          needed to bring the row into view.
        </Text>
        <Text inherit mb="xs">
          Also, since the <Code>DataTable</Code> header is sticky, using <Code>scrollIntoView()</Code> with no
          arguments, or the equivalent{' '}
          <Code style={{ whiteSpace: 'nowrap' }}>{"scrollIntoView({ block: 'start' })"}</Code>, will hide the row
          underneath the header.
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
        If the DataTable is part of a more complex layout and you want to avoid scrolling the page when bringing a row
        into view, you can get hold of the table’s scrollable viewport element with the <Code>scrollViewportRef</Code>{' '}
        property and use its{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo">
          <Code>scrollTo</Code>
        </ExternalLink>{' '}
        method, taking into account the height of the sticky header:
      </Txt>
      <ScrollToExample />
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['scroll-to']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
