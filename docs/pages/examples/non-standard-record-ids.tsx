import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import NonStandardRecordIdsExample from '~/examples/NonStandardRecordIdsExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/non-standard-record-ids';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/NonStandardRecordIdsExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        By default, the <Code>DataTable</Code> will assume each record to have a property called <Code>id</Code> with a
        primitive data-type unique value.
        <br />
        You can override the default behavior by specifying the <Code>idAccessor</Code> property like so:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <ExampleContainer>
        <NonStandardRecordIdsExample />
      </ExampleContainer>
      <PageNavigation of={PATH} />
    </Container>
  );
}
