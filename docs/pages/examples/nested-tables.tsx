import { Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import NestedTablesExample from '~/examples/NestedTablesExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/nested-tables';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/NestedTablesExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Click on row expand icons to see it in action:</PageText>
      <NestedTablesExample />
      <PageText>...to be written...</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
