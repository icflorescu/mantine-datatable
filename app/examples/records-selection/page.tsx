import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import {
  CellTriggerRecordsSelectionExample,
  CheckboxPropsExample,
  CustomColumnStyleExample,
  DisabledRecordsExample,
  RecordsSelectionExample,
  RecordsSelectionHorizontalScrollingBehaviorExample,
  SelectAllRecordsOnAllPagesExample,
} from './RecordsSelectionExamples';

const PATH: Route = '/examples/records-selection';

export const metadata = getRouteMetadata(PATH);

export default async function RecordsSelectionExamplePage() {
  const code = await readCodeFile<
    Record<
      | 'columns.ts'
      | 'RecordsSelectionExample.tsx'
      | 'CellTriggerRecordsSelectionExample.tsx'
      | 'DisabledRecordsExample.tsx'
      | 'CustomColumnStyleExample.tsx'
      | 'CheckboxPropsExample.tsx'
      | 'SelectAllRecordsOnAllPagesExample.tsx'
      | 'RecordsSelectionHorizontalScrollingBehaviorExample.tsx',
      string
    >
  >(`${PATH}/RecordsSelectionExamples.tsx`);

  return (
    <>
      <PageTitle of={PATH} />
      <Txt idea title="Top feature">
        {PRODUCT_NAME} is probably the only data-table component for Mantine that supports an intuitive batch selection
        of records, similar to the one you can find in Gmail:{' '}
        <strong>
          shift-clicking a row selection checkbox will result in selecting/deselecting all records between the last
          selected record and the current one
        </strong>
        .
      </Txt>
      <Txt>In order to enable records selection, you’ll have to add the following properties to the DataTable:</Txt>
      <UnorderedList compact>
        <li>
          <Code>selectedRecords</Code> → an array of currently selected records (with the same TS type as the{' '}
          <Code>records</Code> property);
        </li>
        <li>
          <Code>onSelectedRecordsChange</Code> → a callback that will be invoked when the user alters the current
          selection.
        </li>
      </UnorderedList>
      <Txt>
        When adding these two properties, the component will render a selection checkbox column and handle user input as
        following:
      </Txt>
      <UnorderedList compact>
        <li>
          <em>Clicking a row selection checkbox</em> will result in selecting/deselecting the underlying record;
        </li>
        <li>
          <em>Clicking the column header checkbox</em> will result in selecting/deselecting all visible records;
        </li>
        <li>
          <strong>
            <em>Shift-clicking a row selection checkbox</em> will result in intuitively selecting all records between
            the last clicked record and the current one.
          </strong>
        </li>
      </UnorderedList>
      <RecordsSelectionExample />
      <Txt info title="Keep in mind">
        To determine selection inclusion, records are compared based on their ID property values, as specified on the{' '}
        DataTable’s <Code>idAccessor</Code> property (defaulting to <Code>id</Code> - see more info{' '}
        <InternalLink to="/examples/non-standard-record-ids">here</InternalLink>).
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RecordsSelectionExample.tsx', 'columns.ts'] }} />
      <PageSubtitle value="Disable selection of certain records" />
      <Txt>You can disable the selection of certain records by providing an `isRecordSelectable` property like so:</Txt>
      <CodeBlock tabs={{ code, keys: ['DisabledRecordsExample.tsx', 'columns.ts'] }} />
      <Txt>The above code will result in the following behavior:</Txt>
      <DisabledRecordsExample />
      <PageSubtitle value="Customizing the selection column className and style" />
      <Txt>
        By default, the selection column has an absolute width of <Code>0</Code>, to that it only takes up the space
        required by the selection checkboxes. If you’re not happy with this behavior, or you have other reasons to
        customize the column’s properties, you can do so by providing the <Code>selectionColumnClassName</Code> and/or{' '}
        <Code>selectionColumnStyle</Code> properties:
      </Txt>
      <CodeBlock code={code['CustomColumnStyleExample.tsx']} />
      <CustomColumnStyleExample />
      <PageSubtitle value="Additional selection checkbox props" />
      <Txt>You can pass additional props to the selection checkboxes by providing the following properties:</Txt>
      <UnorderedList compact>
        <li>
          <Code>checkboxProps</Code> → an object of props that will be applied to all selection checkboxes (both the
          column header checkbox and the row selection checkboxes);
        </li>
        <li>
          <Code>allRecordsSelectionCheckboxProps</Code> → an object of props that will be applied to the column header
          checkbox;
        </li>
        <li>
          <Code>getRecordSelectionCheckboxProps</Code> → a function that receives the underlying record and record index
          and returns an object of props that will be applied to the row selection checkboxes.
        </li>
      </UnorderedList>
      <CodeBlock tabs={{ code, keys: ['CheckboxPropsExample.tsx', 'columns.ts'] }} />
      <Txt>
        In this example, the checkboxes will be rendered with a smaller size and will have custom{' '}
        <Code>aria-label</Code> attributes that will be read by screen readers (inspect the DOM to check these):
      </Txt>
      <CheckboxPropsExample />
      <PageSubtitle value="Selecting all records on all pages" />
      <Txt>
        When using <InternalLink to="/examples/pagination">pagination</InternalLink>, the best practice is to{' '}
        <strong>only load the current page’s records from the server</strong>.
        <br />
        This also means that {PRODUCT_NAME} can’t—and <strong>shouldn’t</strong>—know about your entire dataset, so the
        “select all” checkbox will only select/deselect the records on the currently visible page.
      </Txt>
      <Txt>
        However, in certain you might want to give users the ability to “select all records on all pages” (like you have
        in Gmail’s user interface). In this case, you can use the <Code>allRecordsSelectionCheckboxProps</Code> to
        create your own selection mechanism:
      </Txt>
      <SelectAllRecordsOnAllPagesExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['SelectAllRecordsOnAllPagesExample.tsx']} />
      <PageSubtitle value="Horizontal scrolling behavior" />
      <Txt>
        Notice how, when the table needs to be horizontally scrollable, the selection column will be fixed to the left
        side of the table, so that the selection checkboxes are always visible:
      </Txt>
      <RecordsSelectionHorizontalScrollingBehaviorExample />
      <Txt>Code:</Txt>
      <CodeBlock code={code['RecordsSelectionHorizontalScrollingBehaviorExample.tsx']} />
      <PageSubtitle value="Maximizing the selection trigger area to the entire cell" />
      <Txt>
        By default, selection is triggered when the user clicks the row selection checkbox.
        <br />
        However, you can maximize the trigger area to the entire cell holding the checkbox by setting the{' '}
        <Code>selectionTrigger</Code> property value to <Code>cell</Code>:
      </Txt>
      <CodeBlock code={code['CellTriggerRecordsSelectionExample.tsx']} />
      <Txt>In this case, clicking anywhere in the cell will result in selecting/deselecting the underlying record:</Txt>
      <CellTriggerRecordsSelectionExample />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
