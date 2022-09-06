import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ColumnPropertiesExample from '~/examples/ColumnPropertiesExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/column-properties';

export const getStaticProps: GetStaticProps<{
  code: { 'ColumnPropertiesExample.tsx': string; 'data.ts': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'ColumnPropertiesExample.tsx': readCodeExample('examples/ColumnPropertiesExample.tsx') as Promise<string>,
      'data.ts': readCodeExample('data.ts') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        The only property you <strong>have</strong> to specify for a column is its <Code>accessor</Code> (the name of
        the record property you want to display in each column cell).
        <br />
        The <Code>accessor</Code> supports dot-notation for nested objects property drilling (i.e.{' '}
        <Code>&apos;department.company.name&apos;</Code>).
        <br />
        The component will try to derrive a column header title by “humanizing” the provided accessor (i.e.{' '}
        <Code>&apos;firstName&apos; → &apos;First name&apos;</Code> or{' '}
        <Code>&apos;department.company.name&apos; → &apos;Department company name&apos;</Code>
        ).
        <br />
        If you’re not happy with the automatically derrived title, you can override it by setting your own column{' '}
        <Code>title</Code>.
      </PageText>
      <PageText>
        In addition, each column can be customized by specifying additional properties, such as <Code>width</Code>,{' '}
        <Code>ellipsis</Code>, <Code>textAlignment</Code>, <Code>visibleMediaQuery</Code>, and a <Code>render</Code>{' '}
        method that accepts the current record as its argument.
      </PageText>
      <PageText>
        If you provide a custom <Code>render</Code> method, you are in fact creating a <em>“virtual column”</em>, and
        the <Code>accessor</Code> name doesn’t have to refer an existing property (or nested property) name. However,
        you must provide one, and each accessor name must be unique amongst the collection of columns.
      </PageText>
      <PageText>Consider the example below:</PageText>
      <CodeBlockTabs
        items={[
          {
            title: 'ColumnPropertiesExample.tsx',
            language: 'typescript',
            content: code['ColumnPropertiesExample.tsx'],
          },
          { title: 'data.ts', language: 'typescript', content: code['data.ts'] },
        ]}
      />
      <PageText>The code above will produce the following result:</PageText>
      <ColumnPropertiesExample />
      <PageNavigation of={PATH} />
    </Container>
  );
}
