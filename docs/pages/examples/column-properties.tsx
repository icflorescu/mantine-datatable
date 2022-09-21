import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ColumnPropertiesExample from '~/examples/ColumnPropertiesExample';
import ColumnPropertiesExampleStylingCells from '~/examples/ColumnPropertiesExampleStylingCells';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/column-properties';

export const getStaticProps: GetStaticProps<{
  code: Record<'column-properties' | 'column-properties-data' | 'column-properties-styling-cells', string>;
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'column-properties': readCodeExample('examples/ColumnPropertiesExample.tsx') as Promise<string>,
      'column-properties-data': readCodeExample('data.ts') as Promise<string>,
      'column-properties-styling-cells': readCodeExample(
        'examples/ColumnPropertiesExampleStylingCells.tsx'
      ) as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageSubtitle value="Accessor" />
      <PageText>
        The only property you <strong>have</strong> to specify for a column is its <Code>accessor</Code> (the name of
        the record property you want to display in each column cell).
        <br />
        The <Code>accessor</Code> supports dot-notation for nested objects property drilling (i.e.{' '}
        <Code>&apos;department.company.name&apos;</Code>).
        <br />
        The component will try to derive a column header title by “humanizing” the provided accessor (i.e.{' '}
        <Code>&apos;firstName&apos; → &apos;First name&apos;</Code> or{' '}
        <Code>&apos;department.company.name&apos; → &apos;Department company name&apos;</Code>
        ).
        <br />
        If you’re not happy with the automatically derived title, you can override it by setting your own column{' '}
        <Code>title</Code>.
      </PageText>
      <PageSubtitle value="Basic column properties" />
      <PageText>
        In addition, each column can be customized by specifying the following properties:
        <ul>
          <li>
            <Code>width</Code> → desired column width as a <Code>number</Code> or <Code>string</Code>;
          </li>
          <li>
            <Code>ellipsis</Code> → <Code>boolean</Code>; if true, cell content in this column will be truncated with
            ellipsis as needed;
          </li>
          <li>
            <Code>textAlignment</Code> → <Code>&apos;left&apos; | &apos;center&apos; | &apos;right&apos;</Code>;
            defaults to <Code>&apos;left&apos;</Code> if not specified;
          </li>
          <li>
            <Code>hidden</Code> → if true, the column will not be visible;
          </li>
          <li>
            <Code>visibleMediaQuery</Code> → a media query <Code>string</Code> or a function accepting the current{' '}
            <Code>MantineTheme</Code> as its argument and returning a media-query string; if set, the column will only
            be visible according to the specified media query;
          </li>
          <li>
            <Code>render</Code> → a method that accepts the current record as its argument and must return a{' '}
            <Code>ReactNode</Code>.
          </li>
        </ul>
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
            content: code['column-properties'],
          },
          { title: 'data.ts', language: 'typescript', content: code['column-properties-data'] },
        ]}
      />
      <PageText>The code above will produce the following result:</PageText>
      <ColumnPropertiesExample />
      <PageSubtitle value="Styling column cells" />
      <PageText>
        In addition, each column’s cells can be further customized by specifying the following styling properties:
        <ul>
          <li>
            <Code>cellsClassName</Code>
          </li>
          <li>
            <Code>cellsStyle</Code>
          </li>
          <li>
            <Code>cellsSx</Code>
          </li>
        </ul>
      </PageText>
      <CodeBlock language="typescript" content={code['column-properties-styling-cells']} />
      <ColumnPropertiesExampleStylingCells />
      <PageNavigation of={PATH} />
    </Container>
  );
}
