import { Code, ListItem } from '@mantine/core';
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
  CheckboxPropsExample,
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
      | 'DisabledRecordsExample.tsx'
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
        <ListItem>
          <Code>selectedRecords</Code> → an array of currently selected records (with the same TS type as the{' '}
          <Code>records</Code> property);
        </ListItem>
        <ListItem>
          <Code>onSelectedRecordsChange</Code> → a callback that will be invoked when the user alters the current
          selection.
        </ListItem>
      </UnorderedList>
      <Txt>
        When adding these two properties, the component will render a selection checkbox column and handle user input as
        following:
      </Txt>
      <UnorderedList compact>
        <ListItem>
          <em>Clicking a row selection checkbox</em> will result in selecting/deselecting the underlying record;
        </ListItem>
        <ListItem>
          <em>Clicking the column header checkbox</em> will result in selecting/deselecting all visible records;
        </ListItem>
        <ListItem>
          <strong>
            <em>Shift-clicking a row selection checkbox</em> will result in intuitively selecting all records between
            the last clicked record and the current one.
          </strong>
        </ListItem>
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
      <PageSubtitle value="Additional selection checkbox props" />
      <Txt>
        You can pass additional props to the selection checkboxes by providing the{' '}
        <Code>allRecordsSelectionCheckboxProps</Code> and <Code>getRecordSelectionCheckboxProps</Code> properties. The
        former is an object of props that will be applied to the column header checkbox, while the latter is a function
        that receives the underlying record and record index and returns an object of props. will be applied to the row
        selection checkboxes.
      </Txt>
      <CodeBlock tabs={{ code, keys: ['CheckboxPropsExample.tsx', 'columns.ts'] }} />
      <Txt>
        Inspect the DOM to see the <Code>aria-label</Code> attributes on the selection checkboxes in the following
        example:
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
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
