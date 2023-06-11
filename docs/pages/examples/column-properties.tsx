import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ColumnPropertiesExample from '~/examples/ColumnPropertiesExample';
import ColumnPropertiesExampleStyling from '~/examples/ColumnPropertiesExampleStyling';
import ColumnPropertiesExampleWithFooter from '~/examples/ColumnPropertiesExampleWithFooter';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/column-properties';

export const getStaticProps: GetStaticProps<{
  code: Record<
    'column-properties' | 'column-properties-data' | 'column-properties-with-footer' | 'column-properties-styling',
    string
  >;
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'column-properties': readCodeExample('examples/ColumnPropertiesExample.tsx') as Promise<string>,
      'column-properties-data': readCodeExample('data/index.ts') as Promise<string>,
      'column-properties-with-footer': readCodeExample(
        'examples/ColumnPropertiesExampleWithFooter.tsx'
      ) as Promise<string>,
      'column-properties-styling': readCodeExample('examples/ColumnPropertiesExampleStyling.tsx') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageSubtitle value="The accessor" />
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
            <Code>width</Code> → desired column width as a <Code>number</Code> or <Code>string</Code>.
          </li>
          <li>
            <Code>ellipsis</Code> → <Code>boolean</Code>; if true, cell content in this column will not wrap to multiple
            lines and will be truncated with ellipsis if/as needed; you can either set this property to{' '}
            <Code>true</Code> or set <Code>noWrap</Code> to <Code>true</Code>, but not both.
          </li>
          <li>
            <Code>noWrap</Code> → <Code>boolean</Code>; if true, cell content in this column will not wrap on multiple
            lines (i.e. <Code>white-space: nowrap</Code>); you can either set this property to <Code>true</Code> or set{' '}
            <Code>ellipsis</Code> to <Code>true</Code>, but not both.
          </li>
          <li>
            <Code>textAlignment</Code> → <Code>&apos;left&apos; | &apos;center&apos; | &apos;right&apos;</Code>;
            defaults to <Code>&apos;left&apos;</Code> if not specified.
          </li>
          <li>
            <Code>hidden</Code> → if true, the column will not be visible.
          </li>
          <li>
            <Code>visibleMediaQuery</Code> → a media query <Code>string</Code> or a function accepting the current{' '}
            <Code>MantineTheme</Code> as its argument and returning a media-query string; if set, the column will only
            be visible according to the specified media query.
          </li>
          <li>
            <Code>render</Code> → a method that accepts the current record as its argument and must return a{' '}
            <Code>ReactNode</Code>.
          </li>
          <li>
            <Code>filter</Code> * → an optional node which provides the user with filtering options. If present, a
            filter button will be added to the column header. Upon clicking the button, a pop-over showing the provided
            node will be opened. Alternatively, you can provide a function returning a <Code>ReactNode</Code>. The
            function will be called with an object containing a <Code>close</Code> method, which you can call to close
            the pop-over.
          </li>
          <li>
            <Code>filtering</Code> * → if true, the column will be styled as an active filtering column; defaults to{' '}
            <Code>false</Code> if not specified.
          </li>
        </ul>
      </PageText>
      <PageText info>
        See the <InternalLink to="/examples/searching-and-filtering">searching and filtering</InternalLink> example to
        learn how to use the <Code>filter</Code> and <Code>filtering</Code> properties.
      </PageText>
      <PageText>
        You can create a <em>“virtual column”</em> by providing an accessor that doesn’t to refer an existing property
        (or nested property) name. In this case, you <strong>must</strong> provide a custom <Code>render</Code> method.
        Also, keep in mind that each accessor name must be unique amongst the collection of columns.
      </PageText>
      <PageText>Consider the example below:</PageText>
      <CodeBlockTabs
        items={[
          {
            title: 'ColumnPropertiesExample.tsx',
            language: 'typescript',
            content: code['column-properties'],
          },
          { title: 'data/index.ts', language: 'typescript', content: code['column-properties-data'] },
        ]}
      />
      <PageText>The code above will produce the following result:</PageText>
      <ColumnPropertiesExample />
      <PageSubtitle value="Column footers" />
      <PageText>
        The <Code>DataTable</Code> component will display a footer row at the bottom of the table if you specify a{' '}
        <Code>footer</Code> property for at least one column:
      </PageText>
      <CodeBlock language="typescript" content={code['column-properties-with-footer']} />
      <PageText>The code above will produce the following result:</PageText>
      <ColumnPropertiesExampleWithFooter />
      <PageSubtitle value="Styling column titles, cells and footers" />
      <PageText>
        In addition, each column can be further customized by specifying the following styling properties:
        <ul>
          <li>
            <Code>titleClassName</Code> *
          </li>
          <li>
            <Code>titleStyle</Code>
          </li>
          <li>
            <Code>titleSx</Code> *
          </li>
          <li>
            <Code>cellsClassName</Code>
          </li>
          <li>
            <Code>cellsStyle</Code>
          </li>
          <li>
            <Code>cellsSx</Code>
          </li>
          <li>
            <Code>footerClassName</Code> *
          </li>
          <li>
            <Code>footerStyle</Code>
          </li>
          <li>
            <Code>footerSx</Code> *
          </li>
        </ul>
      </PageText>
      <PageText info>
        When styling column titles and footers with class names or <Code>Sx</Code>, you may need to increase selector
        specificity to override the default styling. See{' '}
        <ExternalLink to="https://stackoverflow.com/questions/62660480/is-there-a-way-to-increase-specificity-by-adding-the-element-with-emotion">
          this StackOverflow question
        </ExternalLink>{' '}
        for more information.
      </PageText>
      <CodeBlock language="typescript" content={code['column-properties-styling']} />
      <PageText>The code above will produce the following result:</PageText>
      <ColumnPropertiesExampleStyling />
      <PageNavigation of={PATH} />
    </Container>
  );
}
