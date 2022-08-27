import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ContextMenuExample from '~/examples/ContextMenuExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/context-menu';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/ContextMenuExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Right-click on a row to see it in action:</PageText>
      <ExampleContainer>
        <ContextMenuExample />
      </ExampleContainer>
      <PageText>
        Mantine doesn’t have (yet?) a context-menu component, but the <Code>DataTable</Code> does allow you to create
        this useful functionality for your data-rich desktop applications.
        <br />
        In order to do so, you’ll have to provide a property called <Code>rowContextMenu</Code> which describes the
        context-menu behavior:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
