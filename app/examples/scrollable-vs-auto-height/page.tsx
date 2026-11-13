import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { ScrollableVsAutoHeightExamplePageContent } from './ScrollableVsAutoHeightExamplePageContent';
import { MinMaxHeightExample, ScrollAreaPropsExample } from './ScrollableVsAutoHeightExamples';

const PATH: Route = '/examples/scrollable-vs-auto-height';

export const metadata = getRouteMetadata(PATH);

export default async function ScrollableVsAutoHeightExamplePage() {
  const code = await readCodeFile<
    Record<'scrollable' | 'auto-height' | 'min-max-height' | 'scroll-area-props', string>
  >(`${PATH}/ScrollableVsAutoHeightExamples.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>Toggle the switch below to see the difference between a scrollable and an auto-height DataTable:</Txt>
      <ScrollableVsAutoHeightExamplePageContent code={code} />
      <Txt>
        The DataTable component embeds a{' '}
        <ExternalLink to="https://mantine.dev/core/scroll-area/">Mantine ScrollArea</ExternalLink> and has a default{' '}
        <Code>height</Code> of <Code>{"'100%'"}</Code>.
        <br />
        Thus, setting the component <Code>height</Code> or placing it inside a height-restricted container will make it{' '}
        <em>vertically scrollable</em>, with a sticky header. Otherwise, the table simply grows to fit its content.
      </Txt>
      <Txt info title="Heads up">
        The DataTable will always be <em>horizontally scrollable</em> if its content is wider than its container.
      </Txt>
      <PageSubtitle value="Using minHeight and maxHeight" />
      <Txt>
        Besides <Code>height</Code>, you can also set <Code>minHeight</Code> and <Code>maxHeight</Code> (as numbers in
        pixels or CSS size strings). They’re particularly useful in combination with a relative <Code>height</Code>
        &mdash; for instance, the table below takes up half of the browser window height, but never less than 200 and
        never more than 400 pixels (resize the browser window to see it in action):
      </Txt>
      <CodeBlock code={code['min-max-height']} />
      <MinMaxHeightExample />
      <Txt>
        <Code>minHeight</Code> is also useful to leave enough room for the{' '}
        <InternalLink to="/examples/empty-state">empty state</InternalLink> indicator or the{' '}
        <InternalLink to="/examples/asynchronous-data-loading">loader</InternalLink> when an auto-height table has few
        or no records.
      </Txt>
      <Txt>
        You can also set a <Code>maxHeight</Code> without a <Code>height</Code>: the table will grow with its content
        and become vertically scrollable once the content exceeds the maximum height.
      </Txt>
      <PageSubtitle value="Customizing the underlying ScrollArea" />
      <Txt>
        You can customize the underlying scroll area by passing <Code>scrollAreaProps</Code> to the{' '}
        <Code>DataTable</Code> component. It accepts{' '}
        <ExternalLink to="https://mantine.dev/core/scroll-area/?t=props">Mantine ScrollArea props</ExternalLink> such as{' '}
        <Code>type</Code>, <Code>scrollbarSize</Code>, <Code>scrollHideDelay</Code> or <Code>offsetScrollbars</Code>{' '}
        (except <Code>classNames</Code>, <Code>styles</Code> and <Code>onScrollPositionChange</Code>, which are used
        internally; to get a reference to the scroll viewport, use the <Code>scrollViewportRef</Code> property instead
        of <Code>viewportRef</Code>). For instance, here’s how you could hide the scrollbars:
      </Txt>
      <CodeBlock code={code['scroll-area-props']} />
      <Txt>Here is the result:</Txt>
      <ScrollAreaPropsExample />
      <Txt>
        To react to scrolling, use the <Code>onScroll</Code>, <Code>onScrollToTop</Code>, <Code>onScrollToBottom</Code>,{' '}
        <Code>onScrollToLeft</Code> and <Code>onScrollToRight</Code> callbacks (see the{' '}
        <InternalLink to="/examples/infinite-scrolling">infinite scrolling example</InternalLink>). To scroll the table
        programmatically, use the <Code>scrollViewportRef</Code> property to get hold of the scrollable viewport element
        (see <InternalLink to="/examples/scrolling-a-row-into-view">scrolling a row into view</InternalLink>).
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
