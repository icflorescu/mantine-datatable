import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
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
        The only property you <strong>have</strong> to specify for a column is its <Code>accessor</Code> &mdash; the
        name of the record property whose value you want to display in the column cells.
        <br />
        The <Code>accessor</Code> supports dot-notation for drilling into nested objects (e.g.{' '}
        <Code>{"'department.company.name'"}</Code>).
        <br />
        The component derives a column header title by “humanizing” the accessor (e.g. <Code>{"'firstName'"}</Code> →{' '}
        <Code>{"'First name'"}</Code> or <Code>{"'department.company.name'"}</Code> →{' '}
        <Code>{"'Department company name'"}</Code>
        ).
        <br />
        If you’re not happy with the automatically derived title, you can override it by setting your own column{' '}
        <Code>title</Code>, which can be any <Code>ReactNode</Code>.
      </Txt>
      <PageSubtitle value="Basic column properties" />
      <Txt>Each column can be further customized by specifying the following properties:</Txt>
      <UnorderedList>
        <li>
          <Code>width: number | string</Code>
          <br />
          Desired column width.
        </li>
        <li>
          <Code>ellipsis: boolean</Code>
          <br />
          If <Code>true</Code>, cell content in this column will not wrap to multiple lines and will be truncated with
          an ellipsis if needed.
          <br />
          You can set either this property or <Code>noWrap</Code>, but not both.
        </li>
        <li>
          <Code>noWrap: boolean</Code>
          <br />
          If <Code>true</Code>, cell content in this column will not wrap to multiple lines (i.e.{' '}
          <Code>white-space: nowrap</Code>).
          <br />
          You can set either this property or <Code>ellipsis</Code>, but not both.
        </li>
        <li>
          <Code>{"textAlign: 'left' | 'center' | 'right'"}</Code>
          <br />
          Text alignment of the column title, cells and footer. Defaults to <Code>{"'left'"}</Code> if not specified.
        </li>
        <li>
          <Code>hidden: boolean</Code>
          <br />
          If <Code>true</Code>, the column will not be visible.
        </li>
        <li>
          <Code>visibleMediaQuery</Code>
          <br />A media query <Code>string</Code>, or a function accepting the current <Code>MantineTheme</Code> as its
          argument and returning a media query string.
          <br />
          If set, the column will only be visible when the media query matches.
        </li>
        <li>
          <Code>render</Code>
          <br />A function that accepts the current record and its index in <Code>records</Code> as arguments and
          returns a <Code>ReactNode</Code> (keep in mind that strings and numbers are valid React nodes).
        </li>
        <li>
          <Code>filter</Code>
          <br />
          An optional property which provides the user with filtering options. It can be either a <Code>ReactNode</Code>{' '}
          or a function returning a <Code>ReactNode</Code>.
          <br />
          If set, a filter button will be added to the column header. Clicking the button opens a popover showing the
          provided node.
          <br />
          If you provide a function, it will be called with an object containing a <Code>close()</Code> method, which
          you can call to close the popover.
        </li>
        <li>
          <Code>filtering: boolean</Code>
          <br />
          If <Code>true</Code>, the filter button in the column header will be highlighted to indicate that a filter is
          in effect. Defaults to <Code>false</Code> if not specified.
        </li>
        <li>
          <Code>filterPopoverProps</Code>
          <br />
          Props passed to the filter <ExternalLink to="https://mantine.dev/core/popover/">Popover</ExternalLink>, in
          case you need to override its defaults (position, width, shadow, etc.).
        </li>
        <li>
          <Code>filterPopoverDisableClickOutside: boolean</Code>
          <br />
          If <Code>true</Code>, disables the click-outside handler the DataTable attaches to the filter popover
          dropdown. Combine it with <Code>{'filterPopoverProps={{ closeOnClickOutside: false }}'}</Code> to keep the
          popover open until it’s closed explicitly, which is useful when the filter contains components rendering their
          own dropdowns in a portal, such as date pickers or selects.
        </li>
      </UnorderedList>
      <Txt info>
        See the <InternalLink to="/examples/searching-and-filtering">searching and filtering</InternalLink> example to
        learn how to use the <Code>filter</Code> and <Code>filtering</Code> properties.
      </Txt>
      <Txt>
        You can create a <em>“virtual column”</em> by providing an accessor that doesn’t refer to an existing property
        (or nested property) of the records. In this case, you <strong>must</strong> provide a custom{' '}
        <Code>render</Code> function. Also, keep in mind that each accessor must be unique within the columns
        collection.
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
      <Txt>
        The footer is always visible and sticks to the bottom of the table. For example, if the table is scrollable:
      </Txt>
      <ColumnFooterExample height={200} />
      <Txt>Or if the table is taller than its content:</Txt>
      <ColumnFooterExample height={550} />
      <PageSubtitle value="Styling column titles, cells and footers" />
      <Txt>You can customize the look of each column by specifying the following styling properties:</Txt>
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
          <Code>cellsClassName</Code>
          <br />A custom class name for the column cells, or a function that accepts the current record and its index as
          arguments and returns a class name.
        </li>
        <li>
          <Code>cellsStyle</Code>
          <br />A function that accepts the current record and its index as arguments and returns either a style object
          for the column cells, or a function accepting the current theme and returning a style object.
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
      <PageSubtitle value="Other column properties" />
      <Txt>Column definitions accept a few more properties, each covered in detail by a dedicated example:</Txt>
      <UnorderedList>
        <li>
          <Code>sortable</Code> and <Code>sortKey</Code> &mdash; see{' '}
          <InternalLink to="/examples/sorting">sorting</InternalLink>;
        </li>
        <li>
          <Code>draggable</Code>, <Code>toggleable</Code> and <Code>defaultToggle</Code> &mdash; see{' '}
          <InternalLink to="/examples/column-dragging-and-toggling">column dragging and toggling</InternalLink>;
        </li>
        <li>
          <Code>resizable</Code> &mdash; see <InternalLink to="/examples/column-resizing">column resizing</InternalLink>
          ;
        </li>
        <li>
          <Code>pinned</Code> and <Code>pinnable</Code> &mdash; see{' '}
          <InternalLink to="/examples/pinning-arbitrary-columns">pinning arbitrary columns</InternalLink>;
        </li>
        <li>
          <Code>customCellAttributes</Code> &mdash; see{' '}
          <InternalLink to="/examples/custom-row-or-cell-attributes">custom row or cell attributes</InternalLink>;
        </li>
        <li>
          <Code>hiddenContent</Code> &mdash; if <Code>true</Code>, the column header is rendered, but the column’s body
          cells are not. This is only useful in advanced scenarios where you render the table rows yourself, as in the{' '}
          <InternalLink to="/examples/row-dragging">row dragging</InternalLink> example.
        </li>
      </UnorderedList>
      <Txt idea>
        If you find yourself repeating the same properties for many columns, have a look at{' '}
        <InternalLink to="/examples/default-column-properties">default column properties</InternalLink>.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
