import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import RecordsSelectionExample from '~/examples/RecordsSelectionExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/records-selection';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/RecordsSelectionExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        In order to enable records selection, you’ll have to:
        <ul>
          <li>
            add a <Code>selectedRecords</Code>property on the <Code>DataTable</Code> component pointing to an array of
            currently selected records (with the same TS type as the <Code>records</Code> property);
          </li>
          <li>
            add an <Code>onSelectedRecordsChange</Code> handler to perform the required action when the user alters the
            current selection.
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
          <li>
            <em>Shift-clicking a row selection checkbox</em> will result in naturally extending/reducing the current
            selection.
          </li>
        </ul>
      </PageText>
      <PageText info>
        To determine selection inclusion, records are compared based on their ID property values, as specified on the{' '}
        <Code>DataTable</Code>’s <Code>idAccessor</Code> property (defaulting to <Code>id</Code> - see more info{' '}
        <InternalLink to="/examples/non-standard-record-ids">here</InternalLink>).
      </PageText>
      <PageText>Consider the example below:</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <RecordsSelectionExample />
      <PageNavigation of={PATH} />
    </Container>
  );
}
