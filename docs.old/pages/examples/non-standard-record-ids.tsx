import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import NonStandardRecordIdsFunctionExample from '~/examples/NonStandardRecordIdsFunctionExample';
import NonStandardRecordIdsStringExample from '~/examples/NonStandardRecordIdsStringExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/non-standard-record-ids';

export const getStaticProps: GetStaticProps<{
  code: Record<'string' | 'function', string>;
}> = async () => ({
  props: {
    code: await allPromiseProps({
      string: readCodeExample('examples/NonStandardRecordIdsStringExample.tsx') as Promise<string>,
      function: readCodeExample('examples/NonStandardRecordIdsFunctionExample.tsx') as Promise<string>,
    }),
  },
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
        You can override the default ID property name by adding an <Code>idAccessor</Code> property on the{' '}
        <Code>DataTable</Code> like so:
      </PageText>
      <CodeBlock language="typescript" content={code.string} />
      <PageText>The code above will produce the following result:</PageText>
      <NonStandardRecordIdsStringExample />
      <PageSubtitle value="Using functions to generate composite record IDs" />
      <PageText>
        You can also use a function to generate record IDs. This is useful for composite IDs, for example, when you need
        to generate a unique ID based on multiple record properties:
      </PageText>
      <CodeBlock language="typescript" content={code.function} />
      <PageText>The code above will produce the following result:</PageText>
      <NonStandardRecordIdsFunctionExample />
      <PageNavigation of={PATH} />
    </Container>
  );
}
