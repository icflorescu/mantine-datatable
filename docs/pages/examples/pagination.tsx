import { Code, Container, MANTINE_SIZES } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Fragment } from 'react';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import PaginationExample from '~/examples/PaginationExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/pagination';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/PaginationExample.tsx')) as string },
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
        </ul>
      </PageText>
      <PageText>Consider the example below:</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
