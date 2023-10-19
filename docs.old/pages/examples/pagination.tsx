import { Code, Container, MANTINE_SIZES } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Fragment } from 'react';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import PaginationExample from '~/examples/PaginationExample';
import PaginationExampleWithControlProps from '~/examples/PaginationExampleWithControlProps';
import PaginationExampleWithPageSizeSelector from '~/examples/PaginationExampleWithPageSizeSelector';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/pagination';

type Example = 'standard' | 'with-page-size-selector' | 'with-control-props';

export const getStaticProps: GetStaticProps<{ code: Record<Example, string> }> = async () => ({
  props: {
    code: await allPromiseProps({
      standard: readCodeExample('examples/PaginationExample.tsx') as Promise<string>,
      'with-page-size-selector': readCodeExample(
        'examples/PaginationExampleWithPageSizeSelector.tsx'
      ) as Promise<string>,
      'with-control-props': readCodeExample('examples/PaginationExampleWithControlProps.tsx') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PaginationExample />
      <PageText>
        You can enable pagination by adding the following component properties:
        <ul>
          <li>
            <Code>page</Code> → the current page number
          </li>
          <li>
            <Code>onPageChange</Code> → a callback that is executed when the user changes the current page
          </li>
          <li>
            <Code>totalRecords</Code> → the total number of records in the dataset
          </li>
          <li>
            <Code>recordsPerPage</Code> → the number of records per page
          </li>
        </ul>
        If you’re not happy with the default pagination behavior, you can override it by setting these{' '}
        <strong>optional</strong> properties:
        <ul>
          <li>
            <Code>loadingText</Code> → a <Code>string</Code> to display while loading records
          </li>
          <li>
            <Code>noRecordsText</Code> → a <Code>string</Code> to display when no records are present
          </li>
          <li>
            <Code>paginationText</Code> → a callback receiving an object in the shape of{' '}
            <Code>{'{ from: number; to: number; totalRecords: number }'}</Code> and returning a <Code>ReactNode</Code>{' '}
            representing the pagination text
          </li>
          <li>
            <Code>paginationColor</Code> → the pagination color; see{' '}
            <ExternalLink to="https://mantine.dev/theming/colors/">Mantine Colors</ExternalLink>
          </li>
          <li>
            <Code>paginationSize</Code> → the pagination size,{' '}
            <Code>
              {MANTINE_SIZES.map((size, index) => (
                <Fragment key={size}>
                  {index !== 0 && ' | '}
                  &apos;{size}&apos;
                </Fragment>
              ))}
            </Code>
          </li>
          <li>
            <Code>paginationWrapBreakpoint</Code> → a breakpoint below which the pagination footer content will wrap on
            multiple lines; defaults to <Code>sm</Code>
          </li>
        </ul>
      </PageText>
      <CodeBlock language="typescript" content={code['standard']} />
      <PageSubtitle value="Displaying a page size selector" />
      <PageText>
        You can display a selector to let the user choose the page size by setting the following component properties:
        <ul>
          <li>
            <Code>recordsPerPageOptions</Code> → an array of page size numbers to display in the page size selector
          </li>
          <li>
            <Code>onRecordsPerPageChange</Code> → a callback that is executed when the user changes the page size
          </li>
          <li>
            <Code>recordsPerPageLabel</Code> → the page size selector label, defaulting to &apos;Records per page&apos;
          </li>
        </ul>
      </PageText>
      <CodeBlock language="typescript" content={code['with-page-size-selector']} />
      <PaginationExampleWithPageSizeSelector />
      <PageSubtitle value="Using pagination control props" />
      <PageText>
        You can provide additional props to pagination controls by using the <Code>getPaginationControlProps</Code>{' '}
        callback. For example, if you’re not happy with the default accesibility aria-labels, you can override them like
        so:
      </PageText>
      <CodeBlock language="typescript" content={code['with-control-props']} />
      <PaginationExampleWithControlProps />
      <PageNavigation of={PATH} />
    </Container>
  );
}
