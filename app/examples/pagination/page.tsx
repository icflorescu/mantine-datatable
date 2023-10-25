import { Code } from '@mantine/core';
import { Fragment } from 'react';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import PaginationExample from './PaginationExample';
import PaginationExampleWithControlProps from './PaginationExampleWithControlProps';
import PaginationExampleWithPageSizeSelector from './PaginationExampleWithPageSizeSelector';

const PATH = '/examples/pagination';

export const metadata = getRouteMetadata(PATH);

export default async function PaginationExamplePage() {
  const code = await allPromiseProps({
    'PaginationExample.tsx': readCodeFile<string>(`${PATH}/PaginationExample.tsx`),
    'PaginationExampleWithControlProps.tsx': readCodeFile<string>(`${PATH}/PaginationExampleWithControlProps.tsx`),
    'PaginationExampleWithPageSizeSelector.tsx': readCodeFile<string>(
      `${PATH}/PaginationExampleWithPageSizeSelector.tsx`
    ),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <PaginationExample />
      <Txt>You can enable pagination by adding the following component properties:</Txt>
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
      <Txt>
        If you’re not happy with the default pagination behavior, you can override it by setting these{' '}
        <strong>optional</strong> properties:
      </Txt>
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
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
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
      <CodeBlock code={code['PaginationExample.tsx']} />
      <PageSubtitle value="Displaying a page size selector" />
      <Txt>
        You can display a selector to let the user choose the page size by setting the following component properties:
      </Txt>
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
      <CodeBlock code={code['PaginationExampleWithPageSizeSelector.tsx']} />
      <PaginationExampleWithPageSizeSelector />
      <PageSubtitle value="Using pagination control props" />
      <Txt>
        You can provide additional props to pagination controls by using the <Code>getPaginationControlProps</Code>{' '}
        callback. For example, if you’re not happy with the default accesibility aria-labels, you can override them like
        so:
      </Txt>
      <CodeBlock code={code['PaginationExampleWithControlProps.tsx']} />
      <PaginationExampleWithControlProps />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
