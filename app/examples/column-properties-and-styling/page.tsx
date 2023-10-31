import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { ColumnFooterExample } from './ColumnFooterExample';
import { ColumnPropertiesExample } from './ColumnPropertiesExample';
import { ColumnStylingExample } from './ColumnStylingExample';

const PATH: Route = '/examples/column-properties-and-styling';

export const metadata = getRouteMetadata(PATH);

export default async function ColumnPropertiesAndStylingExamplePage() {
  const code = await allPromiseProps({
    'ColumnPropertiesExample.tsx': readCodeFile<string>(`${PATH}/ColumnPropertiesExample.tsx`),
    'ColumnStylingExample.tsx': readCodeFile<string>(`${PATH}/ColumnStylingExample.tsx`),
    'ColumnStylingExample.module.css': readCodeFile<string>(`${PATH}/ColumnStylingExample.module.css`),
    'ColumnFooterExample.tsx': readCodeFile<string>(`${PATH}/ColumnFooterExample.tsx`),
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
        <Code>{"'department.company.name'"}</Code>).
        <br />
        The component will try to derive a column header title by “humanizing” the provided accessor (i.e.{' '}
        <Code>{"'firstName'"}</Code> → <Code>{"'First name'"}</Code> or <Code>{"'department.company.name'"}</Code> →{' '}
        <Code>{"'Department company name'"}</Code>
        ).
        <br />
        If you’re not happy with the automatically derived title, you can override it by setting your own column{' '}
        <Code>title</Code>.
      </Txt>
      <PageSubtitle value="Basic column properties" />
      <Txt>In addition, each column can be customized by specifying the following properties:</Txt>
      <UnorderedList>
        <li>
          <Code>width: number | string</Code>
          <br />
          Desired column width.
        </li>
        <li>
          <Code>ellipsis: boolean</Code>
          <br />
          If true, cell content in this column will not wrap to multiple lines and will be truncated with ellipsis if/as
          needed.
          <br />
          You can either set this property to <Code>true</Code> or set <Code>noWrap</Code> to <Code>true</Code>, but not
          both.
        </li>
        <li>
          <Code>noWrap: boolean</Code>
          <br />
          If true, cell content in this column will not wrap on multiple lines (i.e. <Code>white-space: nowrap</Code>).
          <br />
          You can either set this property to <Code>true</Code> or set <Code>ellipsis</Code> to <Code>true</Code>, but
          not both.
        </li>
        <li>
          <Code>{"textAlign: 'left' | 'center' | 'right'"}</Code>
          <br />
          Defaults to <Code>{"'left'"}</Code> if not specified.
        </li>
        <li>
          <Code>hidden: boolean</Code>
          <br />
          If true, the column will not be visible.
        </li>
        <li>
          <Code>visibleMediaQuery</Code>
          <br />A media query <Code>string</Code> or a function accepting the current <Code>MantineTheme</Code> as its
          argument and returning a media-query string.
          <br />
          If set, the column will only be visible according to the specified media query.
        </li>
        <li>
          <Code>render</Code>
          <br />A method that accepts the current record as its argument and returns a <Code>ReactNode</Code> (keep in
          mind that strings and numbers are valid react nodes).
        </li>
        <li>
          <Code>filter</Code>
          <br />
          An optional property which provides the user with filtering options. It can be either a <Code>
            ReactNode
          </Code>{' '}
          or a function returning a <Code>ReactNode</Code>.
          <br />
          If a <Code>ReactNode</Code> is provided, a filter button will be added to the column header. Upon clicking the
          button, a popover showing the provided node will be opened.
          <br />
          Alternatively, you can provide a function returning a <Code>ReactNode</Code>. The function will be called with
          an object containing a <Code>close()</Code> method, which you can call to close the popover.
        </li>
        <li>
          <Code>filtering: boolean</Code>
          <br />
          If true, the column will be styled as an active filtering column. Defaults to <Code>false</Code> if not
          specified.
        </li>
      </UnorderedList>
      <Txt info>
        See the <InternalLink to="/examples/searching-and-filtering">searching and filtering</InternalLink> example to
        learn how to use the <Code>filter</Code> and <Code>filtering</Code> properties.
      </Txt>
      <Txt>
        You can create a <em>“virtual column”</em> by providing an accessor that doesn’t to refer an existing property
        (or nested property) name. In this case, you <strong>must</strong> provide a custom <Code>render</Code> method.
        Also, keep in mind that each accessor name must be unique amongst the collection of columns.
      </Txt>
      <Txt>Consider this example:</Txt>
      <ColumnPropertiesExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock tabs={{ code, keys: ['ColumnPropertiesExample.tsx', 'data/index.ts'] }} />
      <PageSubtitle value="Column footers" />
      <Txt>
        The DataTable component will display a footer row at the bottom of the table if you specify a{' '}
        <Code>footer</Code> property for at least one column:
      </Txt>
      <ColumnFooterExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock tabs={{ code, keys: ['ColumnFooterExample.tsx', 'data/index.ts'] }} />
      <PageSubtitle value="Styling column titles, cells and footers" />
      <Txt>In addition, each column can be further customized by specifying the following styling properties:</Txt>
      <UnorderedList>
        <li>
          <Code>titleClassName: string</Code>
          <br />A custom class name for the column title.
        </li>
        <li>
          <Code>titleStyle</Code>
          <br />A custom style object for the column title, or a function accepting the current theme and returning a
          style object.
        </li>
        <li>
          <Code>cellsClassName: string</Code>
          <br />A function that accepts the current record as its argument and returns a <Code>string</Code>{' '}
          representing a custom class name for the column cells.
        </li>
        <li>
          <Code>cellsStyle</Code>
          <br />A function that accepts the current record as its argument and returns either a style object for the
          column cells, or a function accepting the current theme and returning a style object.
        </li>
        <li>
          <Code>footerClassName: string</Code>
          <br />A custom class name for the column footer.
        </li>
        <li>
          <Code>footerStyle</Code>
          <br />A custom style object for the column footer, or a function accepting the current theme and returning a
          style object.
        </li>
      </UnorderedList>
      <Txt>Consider this example:</Txt>
      <ColumnStylingExample />
      <Txt>Here’s the code for the example above:</Txt>
      <CodeBlock
        tabs={{
          code,
          keys: ['ColumnStylingExample.tsx', 'ColumnStylingExample.module.css', 'data/index.ts'],
        }}
      />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
