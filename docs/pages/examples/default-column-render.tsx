import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import DefaultColumnRenderExample from '~/examples/DefaultColumnRenderExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/default-column-render';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/DefaultColumnRenderExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If you provide a <Code>defaultColumnRender</Code> prop to the table, it will be used to render all columns that
        do not provide a custom <Code>render</Code> function.
        <br />
        The <Code>defaultColumnRender</Code> function receives the current row, its index and accessor name and should
        return a <Code>ReactNode</Code>:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <DefaultColumnRenderExample />
      <PageNavigation of={PATH} />
    </Container>
  );
}
