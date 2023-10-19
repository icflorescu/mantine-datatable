import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import {
  EmptyStateExampleCustomContent,
  EmptyStateExampleCustomIconAndText,
  EmptyStateExampleCustomText,
  EmptyStateExampleStandard,
} from '~/examples/EmptyStateExamples';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/empty-state';

type ExampleName = 'standard' | 'custom-text' | 'custom-icon-and-text' | 'custom-content';

export const getStaticProps: GetStaticProps<{
  code: Record<ExampleName, string>;
}> = async () => ({
  props: {
    code: (await readCodeExample('examples/EmptyStateExamples.tsx')) as Record<ExampleName, string>,
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If <Code>records</Code> property points to an empty array, the <Code>DataTable</Code> component will indicate
        its empty state by displaying a customizable icon and text, like so:
      </PageText>
      <EmptyStateExampleStandard />
      <PageText info>
        Make sure to set a <Code>minHeight</Code> large enough to accommodate the icon and text when dealing with empty
        state in non <em>“vertically-scrollable”</em> tables.
      </PageText>
      <CodeBlock language="typescript" content={code['standard']} />
      <PageText>
        You can modify the displayed text by setting the <Code>noRecordsText</Code> property:
      </PageText>
      <EmptyStateExampleCustomText />
      <CodeBlock language="typescript" content={code['custom-text']} />
      <PageText>
        The icon can also be modified by setting the <Code>noRecordsIcon</Code> property:
      </PageText>
      <EmptyStateExampleCustomIconAndText />
      <CodeBlock language="typescript" content={code['custom-icon-and-text']} />
      <PageText>
        If you’re not happy with the standard empty state indicator, you can entirely replace it by setting the{' '}
        <Code>emptyState</Code> property:
      </PageText>
      <EmptyStateExampleCustomContent />
      <CodeBlock language="typescript" content={code['custom-content']} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
