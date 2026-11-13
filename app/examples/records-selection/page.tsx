import { Code } from '@mantine/core';
import type { Route } from 'next';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
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
          shift-clicking a row selection checkbox selects or deselects all records between the last clicked record and
          the current one
        </strong>
        .
      </Txt>
      <Txt>To enable records selection, add the following properties to the DataTable:</Txt>
      <UnorderedList compact>
        <li>
          <Code>selectedRecords</Code> → an array of currently selected records (of the same type as the items in the{' '}
          <Code>records</Code> array);
        </li>
        <li>
          <Code>onSelectedRecordsChange</Code> → a callback invoked with the new array of selected records when the user
          changes the selection.
        </li>
      </UnorderedList>
      <Txt>
        With these two properties set, the component renders a selection checkbox column and handles user input as
        follows:
      </Txt>
      <UnorderedList compact>
        <li>
          <em>Clicking a row selection checkbox</em> selects or deselects the underlying record;
        </li>
        <li>
          <em>Clicking the column header checkbox</em> selects or deselects all visible records (selected records that
          are not currently visible, e.g. on other pages, are left untouched);
        </li>
        <li>
          <strong>
            <em>Shift-clicking a row selection checkbox</em> selects or deselects all records between the last clicked
            record and the current one.
          </strong>
        </li>
      </UnorderedList>
      <RecordsSelectionExample />
      <Txt info title="Keep in mind">
        To determine whether a record is selected, records are compared by their IDs, as designated by the DataTable’s{' '}
        <Code>idAccessor</Code> property (which defaults to <Code>{"'id'"}</Code> &mdash; see{' '}
        <InternalLink to="/examples/non-standard-record-ids">non-standard record IDs</InternalLink>), not by object
        reference.
      </Txt>
      <CodeBlock tabs={{ code, keys: ['RecordsSelectionExample.tsx', 'columns.ts'] }} />
      <PageSubtitle value="Disable selection of certain records" />
      <Txt>
        You can disable the selection of certain records by providing an <Code>isRecordSelectable</Code> function. It
        receives a record and its index and should return <Code>false</Code> for records that can’t be selected:
      </Txt>
      <CodeBlock tabs={{ code, keys: ['DisabledRecordsExample.tsx', 'columns.ts'] }} />
      <Txt>
        The selection checkboxes of non-selectable records are disabled, and both the column header checkbox and
        shift-click range selection skip them:
      </Txt>
      <DisabledRecordsExample />
      <PageSubtitle value="Customizing the selection column className and style" />
      <Txt>
        By default, the selection column has a fixed width of <Code>44px</Code>, just enough to fit the selection
        checkboxes. If you need a different width, or you need to customize the column for other reasons, you can do so
        by providing the <Code>selectionColumnClassName</Code> and/or <Code>selectionColumnStyle</Code> properties:
      </Txt>
      <CodeBlock code={code['CustomColumnStyleExample.tsx']} />
      <CustomColumnStyleExample />
      <PageSubtitle value="Additional selection checkbox props" />
      <Txt>
        You can pass additional{' '}
        <ExternalLink to="https://mantine.dev/core/checkbox/?t=props">Mantine Checkbox props</ExternalLink> to the
        selection checkboxes with the following properties:
      </Txt>
      <UnorderedList compact>
        <li>
          <Code>selectionCheckboxProps</Code> → an object of props applied to all selection checkboxes (both the column
          header checkbox and the row selection checkboxes);
        </li>
        <li>
          <Code>allRecordsSelectionCheckboxProps</Code> → an object of props applied to the column header checkbox;
        </li>
        <li>
          <Code>getRecordSelectionCheckboxProps</Code> → a function receiving a record and its index and returning an
          object of props applied to that record’s selection checkbox.
        </li>
      </UnorderedList>
      <CodeBlock tabs={{ code, keys: ['CheckboxPropsExample.tsx', 'columns.ts'] }} />
      <Txt>
        In this example, the checkboxes are rendered with a smaller size and have custom <Code>aria-label</Code>{' '}
        attributes, which are read by screen readers (inspect the DOM to check them):
      </Txt>
      <CheckboxPropsExample />
      <PageSubtitle value="Selecting all records on all pages" />
      <Txt>
        When using <InternalLink to="/examples/pagination">pagination</InternalLink>, the best practice is to{' '}
        <strong>only load the current page’s records from the server</strong>.
        <br />
        This also means that {PRODUCT_NAME} can’t &mdash; and <strong>shouldn’t</strong> &mdash; know about your entire
        dataset, so the “select all” checkbox only selects or deselects the records on the current page.
      </Txt>
      <Txt>
        However, in certain cases you might want to give users the ability to “select all records on all pages” (like in
        Gmail’s user interface). In this case, you can use <Code>allRecordsSelectionCheckboxProps</Code> to implement
        your own selection mechanism. The example below also makes use of the <Code>uniqBy</Code> and{' '}
        <Code>differenceBy</Code> utility functions exported by {PRODUCT_NAME}:
      </Txt>
      <SelectAllRecordsOnAllPagesExample />
      <Txt>Here is the code for the above example:</Txt>
      <CodeBlock code={code['SelectAllRecordsOnAllPagesExample.tsx']} />
      <PageSubtitle value="Horizontal scrolling behavior" />
      <Txt>
        Notice how, when the table is horizontally scrollable, the selection column stays pinned to the left side of the
        table, so that the selection checkboxes are always visible:
      </Txt>
      <RecordsSelectionHorizontalScrollingBehaviorExample />
      <Txt>Code:</Txt>
      <CodeBlock code={code['RecordsSelectionHorizontalScrollingBehaviorExample.tsx']} />
      <PageSubtitle value="Maximizing the selection trigger area to the entire cell" />
      <Txt>
        By default, selection is triggered when the user clicks a selection checkbox.
        <br />
        However, you can extend the trigger area to the entire cell holding the checkbox by setting the{' '}
        <Code>selectionTrigger</Code> property to <Code>{"'cell'"}</Code> (the default value is{' '}
        <Code>{"'checkbox'"}</Code>):
      </Txt>
      <CodeBlock code={code['CellTriggerRecordsSelectionExample.tsx']} />
      <Txt>In this case, clicking anywhere in the cell selects or deselects the underlying record:</Txt>
      <CellTriggerRecordsSelectionExample />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
