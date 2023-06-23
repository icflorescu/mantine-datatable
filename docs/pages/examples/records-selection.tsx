import { Code, Container, createStyles } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import {
  RecordsSelectionExample,
  RecordsSelectionWithAdditionalCheckboxProps,
  RecordsSelectionWithDisabledItemsExample,
} from '~/examples/RecordsSelectionExamples';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/records-selection';

type ExampleName = 'standard' | 'disabled-records' | 'with-additional-checkbox-props';

export const getStaticProps: GetStaticProps<{ code: Record<ExampleName, string> }> = async () => ({
  props: { code: (await readCodeExample('examples/RecordsSelectionExamples.tsx')) as Record<ExampleName, string> },
});

const useStyles = createStyles((theme) => ({
  batchSelectionEmphasis: {
    color: theme.colorScheme === 'dark' ? theme.colors.red[4] : theme.colors.red[9],
  },
}));

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { classes } = useStyles();

  return (
    <Container>
      <PageTitle of={PATH} />
      <RecordsSelectionExample />
      <PageText idea>
        Mantine <Code>DataTable</Code> is probably the only data-table component for Mantine that supports an intuitive
        batch selection of records, similar to the one you can find in Gmail: shift-clicking a row selection checkbox
        will result in selecting/deselecting all records between the last selected record and the current one.
      </PageText>
      <PageText>
        In order to enable records selection, you’ll have to add the following properties to the <Code>DataTable</Code>:
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
        When adding these two properties, the component will render a selection checkbox column and handle user input as
        following:
        <ul>
          <li>
            <em>Clicking a row selection checkbox</em> will result in selecting/deselecting the underlying record;
          </li>
          <li>
            <em>Clicking the column header checkbox</em> will result in selecting/deselecting all visible records;
          </li>
          <li className={classes.batchSelectionEmphasis}>
            <em>Shift-clicking a row selection checkbox</em> will result in intuitively selecting all records between
            the last clicked record and the current one.
          </li>
        </ul>
      </PageText>
      <PageText info>
        To determine selection inclusion, records are compared based on their ID property values, as specified on the{' '}
        <Code>DataTable</Code>’s <Code>idAccessor</Code> property (defaulting to <Code>id</Code> - see more info{' '}
        <InternalLink to="/examples/non-standard-record-ids">here</InternalLink>).
      </PageText>
      <CodeBlock language="typescript" content={code['standard']} />
      <PageSubtitle value="Disable selection of certain records" />
      <PageText>
        You can disable the selection of certain records by providing an `isRecordSelectable` property like so:
      </PageText>
      <CodeBlock language="typescript" content={code['disabled-records']} />
      <RecordsSelectionWithDisabledItemsExample />
      <PageSubtitle value="Additional selection checkbox props" />
      <PageText>
        You can pass additional props to the selection checkboxes by providing the{' '}
        <Code>allRecordsSelectionCheckboxProps</Code> and <Code>getRecordSelectionCheckboxProps</Code> properties. The
        former is an object of props that will be applied to the column header checkbox, while the latter is a function
        that receives the underlying record and record index and returns an object of props. will be applied to the row
        selection checkboxes.
      </PageText>
      <CodeBlock language="typescript" content={code['with-additional-checkbox-props']} />
      <RecordsSelectionWithAdditionalCheckboxProps />
      <PageNavigation of={PATH} />
    </Container>
  );
}
