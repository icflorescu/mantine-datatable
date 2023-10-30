import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import { ScrollableVsAutoHeightExamplePageContent } from './ScrollableVsAutoHeightExamplePageContent';
import { ScrollAreaPropsExample } from './ScrollableVsAutoHeightExamples';

const PATH: Route = '/examples/scrollable-vs-auto-height';

export const metadata = getRouteMetadata(PATH);

export default async function ScrollableVsAutoHeightExamplePage() {
  const code = await readCodeFile<Record<'scrollable' | 'auto-height' | 'scroll-area-props', string>>(
    `${PATH}/ScrollableVsAutoHeightExamples.tsx`
  );

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>Try the interactive example below to see the feature it in action:</Txt>
      <ScrollableVsAutoHeightExamplePageContent code={code} />
      <Txt>
        The DataTable component embeds a{' '}
        <ExternalLink to="https://mantine.dev/core/scroll-area/">Mantine ScrollArea</ExternalLink> and has a default{' '}
        <Code>height</Code> of <Code>{"'100%'"}</Code>.
        <br />
        Thus, setting the component height or placing it inside a height-restricted container will turn on its{' '}
        <em>“vertically-scrollable”</em> behavior.
      </Txt>
      <Txt info title="Heads up">
        The DataTable will always be <em>“horizontally-scrollable”</em> if its width it greater than its container
        width.
      </Txt>
      <PageSubtitle value="Customize the underlying ScrollArea" />
      <Txt>
        You can customize the underlying scroll area by passing <Code>scrollAreaProps</Code> to the{' '}
        <Code>DataTable</Code> component. The <Code>scrollAreaProps</Code> accepts a subset of{' '}
        <ExternalLink to="https://mantine.dev/core/scroll-area/?t=props">Mantine ScrollArea props</ExternalLink>:{' '}
        <Code>type</Code>, <Code>scrollbarSize</Code> and <Code>scrollHideDelay</Code>. For instance, here’s how you
        could make the scrollbars invisible:
      </Txt>
      <CodeBlock code={code['scroll-area-props']} />
      <Txt>Here is the result:</Txt>
      <ScrollAreaPropsExample />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
