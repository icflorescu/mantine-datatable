import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import {
  EmptyStateExample,
  EmptyStateExampleCustomContent,
  EmptyStateExampleCustomIconAndText,
  EmptyStateExampleCustomInteractiveContent,
  EmptyStateExampleCustomText,
} from './EmptyStateExamples';

const PATH: Route = '/examples/empty-state';

export const metadata = getRouteMetadata(PATH);

export default async function EmptyStateExamplePage() {
  const rawCode = await allPromiseProps({
    tsx: readCodeFile<
      Record<
        'default' | 'custom-text' | 'custom-icon-and-text' | 'custom-content' | 'custom-interactive-content',
        string
      >
    >(`${PATH}/EmptyStateExamples.tsx`),
    css: readCodeFile<string>(`${PATH}/EmptyStateExamples.module.css`),
  });

  const code = {
    ...rawCode.tsx,
    'custom-icon-and-text': {
      'CustomIconAndText.tsx': rawCode.tsx['custom-icon-and-text'],
      'CustomIconAndText.module.css': rawCode.css,
    },
  };

  return (
    <>
      <PageTitle of={PATH} />
      <Code hidden>minHeight</Code>
      <Txt>
        When the <Code>records</Code> property is an empty array, the <Code>DataTable</Code> component indicates its
        empty state by displaying a customizable icon and text, like so:
      </Txt>
      <EmptyStateExample />
      <Txt info>
        If your table is not <InternalLink to="/examples/scrollable-vs-auto-height">vertically scrollable</InternalLink>
        , make sure to set a <Code>minHeight</Code> large enough to accommodate the empty state icon and text.
        <br />
        The empty state is not displayed while the table is{' '}
        <InternalLink to="/examples/asynchronous-data-loading">loading data</InternalLink> (i.e. when{' '}
        <Code>fetching</Code> is <Code>true</Code>), so it won’t flash while waiting for the first batch of records.
      </Txt>
      <CodeBlock code={code.default} />
      <Txt>
        You can change the displayed text (<Code>No records</Code> by default) by setting the <Code>noRecordsText</Code>{' '}
        property:
      </Txt>
      <EmptyStateExampleCustomText />
      <CodeBlock code={code['custom-text']} />
      <Txt>
        You can also replace the icon by setting the <Code>noRecordsIcon</Code> property:
      </Txt>
      <EmptyStateExampleCustomIconAndText />
      <CodeBlock
        tabs={{ code: code['custom-icon-and-text'], keys: ['CustomIconAndText.tsx', 'CustomIconAndText.module.css'] }}
      />
      <Txt>
        If you’re not happy with the standard empty state indicator, you can replace it entirely by setting the{' '}
        <Code>emptyState</Code> property. The provided content will be overlaid and centered automatically. Note that{' '}
        <Code>emptyState</Code> and <Code>noRecordsIcon</Code> are mutually exclusive, and <Code>noRecordsText</Code> is
        ignored when <Code>emptyState</Code> is set:
      </Txt>
      <EmptyStateExampleCustomContent />
      <CodeBlock code={code['custom-content']} />
      <PageSubtitle value="Interactive custom empty state content" />
      <Txt>
        The empty state overlay has its <Code>pointer-events</Code> CSS property set to <Code>none</Code>, so that it
        doesn’t get in the way of the table underneath.
        <br />
        This means that if you need to add interactive content to a custom empty state, you’ll have to re-enable pointer
        events on the interactive elements by setting their <Code>pointer-events</Code> CSS property to <Code>all</Code>
        :
      </Txt>
      <EmptyStateExampleCustomInteractiveContent />
      <CodeBlock code={code['custom-interactive-content']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
