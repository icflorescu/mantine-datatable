import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
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
      <HandlingRowClicksExample />
      <PageText>
        Provide a handler called <Code>onRowClick</Code> to the <Code>DataTable</Code> component, like so:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
