import { Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ColumnPropertiesExample from '~/examples/ColumnPropertiesExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/column-properties';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/ColumnPropertiesExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>...describe</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <ExampleContainer>
        <ColumnPropertiesExample />
      </ExampleContainer>
      <PageNavigation of={PATH} />
    </Container>
  );
}
