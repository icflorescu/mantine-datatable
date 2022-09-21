import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import RowActionsCellExample from '~/examples/RowActionsCellExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/row-actions-cell';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/RowActionsCellExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If a simple <InternalLink to="/examples/handling-row-clicks">row click handler</InternalLink> is not enough and{' '}
        <InternalLink to="/examples/row-context-menu">context menus</InternalLink> are not your thing, implementing a
        row actions cell should’t be difficult. Here’s how you could do it, unsing the column <Code>render</Code>{' '}
        function:
      </PageText>
      <RowActionsCellExample />
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
