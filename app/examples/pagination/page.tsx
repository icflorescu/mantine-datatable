import { Code } from '@mantine/core';
import type { Route } from 'next';
import { Fragment } from 'react';
import { PRODUCT_NAME } from '~/app/config';
import { CodeBlock } from '~/components/CodeBlock';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { MANTINE_SIZES } from '~/lib/constants';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import PaginationExample from './PaginationExample';
import PaginationExampleWithControlProps from './PaginationExampleWithControlProps';
import PaginationExampleWithPageSizeSelector from './PaginationExampleWithPageSizeSelector';

const PATH: Route = '/examples/pagination';

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
      <Txt>You can enable pagination by setting the following {PRODUCT_NAME} properties:</Txt>
      <UnorderedList>
        <li>
          <Code>page: number</Code>
          <br />
          The current page number.
        </li>
        <li>
          <Code>onPageChange</Code>
          <br />A callback that is executed when the user changes the current page.
        </li>
        <li>
          <Code>totalRecords: number</Code>
          <br />
          The total number of records in the dataset.
        </li>
        <li>
          <Code>recordsPerPage: number</Code>
          <br />
          The number of records per page.
        </li>
      </UnorderedList>
      <PaginationExample />
      <Txt>
        If you’re not happy with the default pagination behavior, you can override it by setting these{' '}
        <strong>optional</strong> properties:
      </Txt>
      <UnorderedList>
        <li>
          <Code>loadingText: string</Code>
          <br />A text to display while loading records.
        </li>
        <li>
          <Code>noRecordsText: string</Code>
          <br />A text to display when no records are present.
        </li>
        <li>
          <Code>paginationText</Code>
          <br />A callback receiving an object in the shape of{' '}
          <Code>{'{ from: number; to: number; totalRecords: number }'}</Code> and returning a <Code>ReactNode</Code>{' '}
          representing the pagination text.
        </li>
        <li>
          <Code>
            paginationSize:{' '}
            {MANTINE_SIZES.map((size, index) => (
              <Fragment key={size}>
                {index !== 0 && ' | '}
                &apos;{size}&apos;
              </Fragment>
            ))}
          </Code>
          <br />
          The pagination size.
        </li>
        <li>
          <Code>
            paginationWrapBreakpoint:{' '}
            {MANTINE_SIZES.map((size, index) => (
              <Fragment key={size}>
                {index !== 0 && ' | '}
                &apos;{size}&apos;
              </Fragment>
            ))}
            {' | (string & {}) | number'}
          </Code>
          <br />A breakpoint below which the pagination footer content will wrap on multiple lines. Defaults to{' '}
          <Code>sm</Code>.
          <br />
          You can also provide a <Code>string</Code> like <Code>{"'300px'"}</Code> or <Code>{"'20rem'"}</Code>, or a{' '}
          <Code>number</Code>, in which case it will be interpreted as a pixel value and converted to rem value before
          being applied.
        </li>
        <li>
          <Code>{'paginationActiveTextColor: MantineColor | { light: MantineColor; dark: MantineColor }'}</Code>
          <br />
          Color applied to active page button text.
          <br />
          Can be a <Code>MantineColor</Code> (key of <Code>theme.colors</Code> or any valid CSS color string), or an
          object with <Code>light</Code> and <Code>dark</Code> keys and <Code>MantineColor</Code> values.
          <br />
          Defaults to white.
        </li>
        <li>
          <Code>{'paginationActiveBackgroundColor: MantineColor | { light: MantineColor; dark: MantineColor }'}</Code>
          <br />
          Color applied to active page button background.
          <br />
          Can be a <Code>MantineColor</Code> (key of <Code>theme.colors</Code> or any valid CSS color string), or an
          object with <Code>light</Code> and <Code>dark</Code> keys and <Code>MantineColor</Code> values.
          <br />
          Defaults to primary theme color.
        </li>
      </UnorderedList>
      <Txt>Here is the code:</Txt>
      <CodeBlock code={code['PaginationExample.tsx']} />
      <PageSubtitle value="Displaying a page size selector" />
      <Txt>
        You can display a selector to let the user choose the page size by setting the following component properties:
      </Txt>
      <UnorderedList>
        <li>
          <Code>recordsPerPageOptions: number[]</Code>
          <br />
          An array of page size numbers to display in the page size selector.
        </li>
        <li>
          <Code>onRecordsPerPageChange</Code>
          <br />A callback that is executed when the user changes the page size. Receives the new page size as its
          argument.
        </li>
        <li>
          <Code>recordsPerPageLabel</Code>
          <br />
          The page size selector label, defaulting to {"'Records per page'"}.
        </li>
      </UnorderedList>
      <CodeBlock code={code['PaginationExampleWithPageSizeSelector.tsx']} />
      <PaginationExampleWithPageSizeSelector />
      <PageSubtitle value="Using pagination control props" />
      <Txt>
        You can provide additional props to pagination controls by using the <Code>getPaginationControlProps</Code>{' '}
        callback. For example, if you’re not happy with the default accessibility aria-labels, you can override them
        like so:
      </Txt>
      <CodeBlock code={code['PaginationExampleWithControlProps.tsx']} />
      <PaginationExampleWithControlProps />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
