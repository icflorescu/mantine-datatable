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
        By default, the <Code>DataTable</Code> will assume each record to have a property called <Code>id</Code>,
        holding a unique value of a primitive data type.
        <br />
        The record IDs are used internally as <Code>.map()</Code> keys and to compare records when necessary.
      </PageText>
      <PageText>
        You can override the default ID property name by specifying a <Code>DataTable</Code> <Code>idAccessor</Code>{' '}
        like so:
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
