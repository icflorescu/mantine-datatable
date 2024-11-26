import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
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
        If <Code>records</Code> property points to an empty array, the <Code>DataTable</Code> component will indicate
        its empty state by displaying a customizable icon and text, like so:
      </Txt>
      <EmptyStateExample />
      <Txt info>
        Make sure to set a <Code>minHeight</Code> large enough to accommodate the icon and text when dealing with empty
        state in non <em>“vertically-scrollable”</em> tables.
      </Txt>
      <CodeBlock code={code['default']} />
      <Txt>
        You can modify the displayed text by setting the <Code>noRecordsText</Code> property:
      </Txt>
      <EmptyStateExampleCustomText />
      <CodeBlock code={code['custom-text']} />
      <Txt>
        The icon can also be modified by setting the <Code>noRecordsIcon</Code> property:
      </Txt>
      <EmptyStateExampleCustomIconAndText />
      <CodeBlock
        tabs={{ code: code['custom-icon-and-text'], keys: ['CustomIconAndText.tsx', 'CustomIconAndText.module.css'] }}
      />
      <Txt>
        If you’re not happy with the standard empty state indicator, you can entirely replace it by setting the{' '}
        <Code>emptyState</Code> property:
      </Txt>
      <EmptyStateExampleCustomContent />
      <CodeBlock code={code['custom-content']} />
      <PageSubtitle value="Interactive custom empty state content" />
      <Txt>
        The empty state component has the <Code>pointer-events</Code> CSS property set to <Code>none</Code>.
        <br />
        Which means that if you need to add interactive content to the custom empty state, you’ll have to enable pointer
        interactions using the <Code>pointer-events</Code> CSS prop:
      </Txt>
      <EmptyStateExampleCustomInteractiveContent />
      <CodeBlock code={code['custom-interactive-content']} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
