import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import EmptyStateExample from '~/examples/EmptyStateExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/empty-state';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/EmptyStateExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If <Code>records</Code> property points to an empty array, the <Code>DataTable</Code> component will indicate
        its empty state by displaying an icon and a customizable text, like so:
      </PageText>
      <EmptyStateExample />
      <PageText info>
        Make sure to set a <Code>minHeight</Code> large enough to accommodate the icon and text when dealing with empty
        state in non <em>“vertically-scrollable”</em> tables.
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
