import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import HandlingRowClicksExample from '~/examples/HandlingRowClicksExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/handling-row-clicks';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/HandlingRowClicksExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Click on a row to see it in action:</PageText>
      <ExampleContainer>
        <HandlingRowClicksExample />
      </ExampleContainer>
      <PageText>
        You can handle row clicks by simply providing a property called <Code>onRowClick</Code> pointing to a handler
        function to the <Code>DataTable</Code> component:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
