import { Code } from '@mantine/core';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { ColumnPropertiesExample } from './ColumnPropertiesExample';
import { ColumnPropertiesExampleStyling } from './ColumnPropertiesExampleStyling';
import { ColumnPropertiesExampleWithFooter } from './ColumnPropertiesExampleWithFooter';

const PATH = '/examples/column-properties';

export const metadata = getRouteMetadata(PATH);

export default async function ColumnPropertiesExamplePage() {
  const code = await allPromiseProps({
    'ColumnPropertiesExample.tsx': readCodeFile<string>(`${PATH}/ColumnPropertiesExample.tsx`),
    'ColumnPropertiesExampleStyling.tsx': readCodeFile<string>(`${PATH}/ColumnPropertiesExampleStyling.tsx`),
    'ColumnPropertiesExampleStyling.module.css': readCodeFile<string>(
      `${PATH}/ColumnPropertiesExampleStyling.module.css`
    ),
    'ColumnPropertiesExampleWithFooter.tsx': readCodeFile<string>(`${PATH}/ColumnPropertiesExampleWithFooter.tsx`),
    'data/index.ts': readCodeFile<string>('/../data/index.ts'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <PageSubtitle value="The accessor" />
      <Txt>
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
      </Txt>
      <PageSubtitle value="Basic column properties" />
      <Txt>In addition, each column can be customized by specifying the following properties:</Txt>
      <ul>
        <li>
          <Code>width</Code> → desired column width as a <Code>number</Code> or <Code>string</Code>.
        </li>
        <li>
          <Code>ellipsis</Code> → <Code>boolean</Code>; if true, cell content in this column will not wrap to multiple
          lines and will be truncated with ellipsis if/as needed; you can either set this property to <Code>true</Code>{' '}
          or set <Code>noWrap</Code> to <Code>true</Code>, but not both.
        </li>
        <li>
          <Code>noWrap</Code> → <Code>boolean</Code>; if true, cell content in this column will not wrap on multiple
          lines (i.e. <Code>white-space: nowrap</Code>); you can either set this property to <Code>true</Code> or set{' '}
          <Code>ellipsis</Code> to <Code>true</Code>, but not both.
        </li>
        <li>
          <Code>textAlign</Code> → <Code>&apos;left&apos; | &apos;center&apos; | &apos;right&apos;</Code>; defaults to{' '}
          <Code>&apos;left&apos;</Code> if not specified.
        </li>
        <li>
          <Code>hidden</Code> → if true, the column will not be visible.
        </li>
        <li>
          <Code>visibleMediaQuery</Code> → a media query <Code>string</Code> or a function accepting the current{' '}
          <Code>MantineTheme</Code> as its argument and returning a media-query string; if set, the column will only be
          visible according to the specified media query.
        </li>
        <li>
          <Code>render</Code> → a method that accepts the current record as its argument and must return a{' '}
          <Code>ReactNode</Code>.
        </li>
        <li>
          <Code>filter</Code> → an optional node which provides the user with filtering options. If present, a filter
          button will be added to the column header. Upon clicking the button, a pop-over showing the provided node will
          be opened. Alternatively, you can provide a function returning a <Code>ReactNode</Code>. The function will be
          called with an object containing a <Code>close</Code> method, which you can call to close the pop-over.
        </li>
        <li>
          <Code>filtering</Code> → if true, the column will be styled as an active filtering column; defaults to{' '}
          <Code>false</Code> if not specified.
        </li>
      </ul>
      <Txt info>
        See the <InternalLink to="/examples/searching-and-filtering">searching and filtering</InternalLink> example to
        learn how to use the <Code>filter</Code> and <Code>filtering</Code> properties.
      </Txt>
      <Txt>
        You can create a <em>“virtual column”</em> by providing an accessor that doesn’t to refer an existing property
        (or nested property) name. In this case, you <strong>must</strong> provide a custom <Code>render</Code> method.
        Also, keep in mind that each accessor name must be unique amongst the collection of columns.
      </Txt>
      <Txt>Consider the example below:</Txt>
      <CodeBlock tabs={{ code, keys: ['ColumnPropertiesExample.tsx', 'data/index.ts'] }} />
      <Txt>The code above will produce the following result:</Txt>
      <ColumnPropertiesExample />
      <PageSubtitle value="Column footers" />
      <Txt>
        The <Code>DataTable</Code> component will display a footer row at the bottom of the table if you specify a{' '}
        <Code>footer</Code> property for at least one column:
      </Txt>
      <CodeBlock tabs={{ code, keys: ['ColumnPropertiesExampleWithFooter.tsx', 'data/index.ts'] }} />
      <Txt>The code above will produce the following result:</Txt>
      <ColumnPropertiesExampleWithFooter />
      <PageSubtitle value="Styling column titles, cells and footers" />
      <Txt>In addition, each column can be further customized by specifying the following styling properties:</Txt>
      <ul>
        <li>
          <Code>titleClassName</Code>
        </li>
        <li>
          <Code>titleStyle</Code>
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
          <Code>footerClassName</Code>
        </li>
        <li>
          <Code>footerStyle</Code>
        </li>
      </ul>
      <Txt info>
        When styling column titles and footers with class names, you may need to increase selector specificity to
        override the default styling.
      </Txt>
      <CodeBlock
        tabs={{
          code,
          keys: ['ColumnPropertiesExampleStyling.tsx', 'ColumnPropertiesExampleStyling.module.css', 'data/index.ts'],
        }}
      />
      <Txt>The code above will produce the following result:</Txt>
      <ColumnPropertiesExampleStyling />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
