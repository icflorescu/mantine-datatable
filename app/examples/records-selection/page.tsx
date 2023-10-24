import { Code } from '@mantine/core';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { getRouteMetadata } from '~/lib/utils';
import {
  RecordsSelectionExample,
  RecordsSelectionWithAdditionalCheckboxProps,
  RecordsSelectionWithDisabledItemsExample,
} from './RecordsSelectionExamples';

const PATH = '/examples/records-selection';

export const metadata = getRouteMetadata(PATH);

export default async function RecordsSelectionExamplePage() {
  const code = await readCodeFile<Record<'default' | 'disabled-records' | 'with-additional-checkbox-props', string>>(
    `${PATH}/RecordsSelectionExamples.tsx`
  );

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        {PRODUCT_NAME} is probably the only data-table component for Mantine that supports an intuitive batch selection
        of records, similar to the one you can find in Gmail: shift-clicking a row selection checkbox will result in
        selecting/deselecting all records between the last selected record and the current one.
      </Txt>
      <Txt>In order to enable records selection, you’ll have to add the following properties to the DataTable:</Txt>
      <ul>
        <li>
          <Code>selectedRecords</Code> → an array of currently selected records (with the same TS type as the{' '}
          <Code>records</Code> property);
        </li>
        <li>
          <Code>onSelectedRecordsChange</Code> → a callback that will be invoked when the user alters the current
          selection.
        </li>
      </ul>
      <Txt>
        When adding these two properties, the component will render a selection checkbox column and handle user input as
        following:
      </Txt>
      <ul>
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
      </ul>
      <RecordsSelectionExample />
      <Txt info>
        To determine selection inclusion, records are compared based on their ID property values, as specified on the{' '}
        DataTable’s <Code>idAccessor</Code> property (defaulting to <Code>id</Code> - see more info{' '}
        <InternalLink to="/examples/non-standard-record-ids">here</InternalLink>).
      </Txt>
      <CodeBlock language="tsx" code={code['default']} />
      <PageSubtitle value="Disable selection of certain records" />
      <Txt>You can disable the selection of certain records by providing an `isRecordSelectable` property like so:</Txt>
      <CodeBlock language="tsx" code={code['disabled-records']} />
      <RecordsSelectionWithDisabledItemsExample />
      <PageSubtitle value="Additional selection checkbox props" />
      <Txt>
        You can pass additional props to the selection checkboxes by providing the{' '}
        <Code>allRecordsSelectionCheckboxProps</Code> and <Code>getRecordSelectionCheckboxProps</Code> properties. The
        former is an object of props that will be applied to the column header checkbox, while the latter is a function
        that receives the underlying record and record index and returns an object of props. will be applied to the row
        selection checkboxes.
      </Txt>
      <CodeBlock language="tsx" code={code['with-additional-checkbox-props']} />
      <RecordsSelectionWithAdditionalCheckboxProps />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
