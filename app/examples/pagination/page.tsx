import { Code } from '@mantine/core';
import type { Route } from 'next';
import { Fragment } from 'react';
import { PRODUCT_NAME } from '~/app/config';
import PaginationCustomRenderExample from '~/app/examples/pagination/PaginationCustomRenderExample';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
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
import PaginationExampleWithEdges from './PaginationExampleWithEdges';
import PaginationExampleWithPageSizeSelector from './PaginationExampleWithPageSizeSelector';

const PATH: Route = '/examples/pagination';

export const metadata = getRouteMetadata(PATH);

export default async function PaginationExamplePage() {
  const code = await allPromiseProps({
    'PaginationExample.tsx': readCodeFile<string>(`${PATH}/PaginationExample.tsx`),
    'PaginationExampleWithEdges.tsx': readCodeFile<string>(`${PATH}/PaginationExampleWithEdges.tsx`),
    'PaginationExampleWithControlProps.tsx': readCodeFile<string>(`${PATH}/PaginationExampleWithControlProps.tsx`),
    'PaginationCustomRenderExample.tsx': readCodeFile<string>(`${PATH}/PaginationCustomRenderExample.tsx`),
    'PaginationExampleWithPageSizeSelector.tsx': readCodeFile<string>(
      `${PATH}/PaginationExampleWithPageSizeSelector.tsx`
    ),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>To enable pagination, set the following {PRODUCT_NAME} properties:</Txt>
      <UnorderedList>
        <li>
          <Code>page: number</Code>
          <br />
          The current page number (1-based).
        </li>
        <li>
          <Code>onPageChange: (page: number) =&gt; void</Code>
          <br />A callback invoked when the user navigates to another page; receives the new page number.
        </li>
        <li>
          <Code>totalRecords: number | undefined</Code>
          <br />
          The total number of records in the dataset (used to compute the number of pages).
        </li>
        <li>
          <Code>recordsPerPage: number</Code>
          <br />
          The number of records per page.
        </li>
      </UnorderedList>
      <PaginationExample />
      <Txt info title="Keep in mind">
        {PRODUCT_NAME} does not slice your data. The <Code>records</Code> property should only contain the records of
        the current page. Typically, you’d fetch them from a server API whenever <Code>page</Code> changes, setting the{' '}
        <Code>fetching</Code> property to <Code>true</Code> while the request is in flight (see the{' '}
        <InternalLink to="/examples/asynchronous-data-loading">asynchronous data loading example</InternalLink> and the{' '}
        <InternalLink to="/examples/complex-usage-scenario">complex usage scenario</InternalLink>).
      </Txt>
      <Txt>
        You can customize the default pagination behavior and appearance with the following <strong>optional</strong>{' '}
        properties:
      </Txt>
      <UnorderedList>
        <li>
          <Code>loadingText: string</Code>
          <br />
          The text displayed in the pagination footer while records are loading. Defaults to <Code>...</Code>.
        </li>
        <li>
          <Code>noRecordsText: string</Code>
          <br />
          The text displayed when there are no records. Defaults to <Code>No records</Code>. The same text is used by
          the <InternalLink to="/examples/empty-state">empty state</InternalLink> indicator.
        </li>
        <li>
          <Code>paginationText</Code>
          <br />A callback receiving an object in the shape of{' '}
          <Code>{'{ from: number; to: number; totalRecords: number }'}</Code> and returning a <Code>ReactNode</Code>{' '}
          representing the pagination text. By default, the text looks like <Code>1 - 15 / 500</Code>.
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
          The pagination size. Defaults to <Code>sm</Code>.
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
          <Code>number</Code>, which is interpreted as a pixel value and converted to <Code>rem</Code>.
        </li>
        <li>
          <Code>{'paginationActiveTextColor: MantineColor | { light: MantineColor; dark: MantineColor }'}</Code>
          <br />
          The text color of the active page button. Defaults to white.
        </li>
        <li>
          <Code>{'paginationActiveBackgroundColor: MantineColor | { light: MantineColor; dark: MantineColor }'}</Code>
          <br />
          The background color of the active page button. Defaults to the theme’s primary color.
        </li>
      </UnorderedList>
      <Txt>
        Both color properties accept a <Code>MantineColor</Code> (a key of <Code>theme.colors</Code> or any valid CSS
        color string), or an object with <Code>light</Code> and <Code>dark</Code> keys, to use different colors for the
        light and dark color schemes.
      </Txt>
      <Txt>Here is the code for the example above:</Txt>
      <CodeBlock code={code['PaginationExample.tsx']} />
      <PageSubtitle value="Displaying a page size selector" />
      <Txt>To let the user choose the page size, set the following properties:</Txt>
      <UnorderedList>
        <li>
          <Code>recordsPerPageOptions: number[]</Code>
          <br />
          An array of page sizes to choose from.
        </li>
        <li>
          <Code>onRecordsPerPageChange: (recordsPerPage: number) =&gt; void</Code>
          <br />A callback invoked when the user selects another page size; receives the new page size.
        </li>
        <li>
          <Code>recordsPerPageLabel: string</Code>
          <br />
          The page size selector label. Defaults to <Code>{"'Records per page'"}</Code>.
        </li>
      </UnorderedList>
      <Txt idea>
        When the page size changes, the current page may no longer exist, so it’s usually a good idea to reset it to{' '}
        <Code>1</Code>, as shown below.
      </Txt>
      <CodeBlock code={code['PaginationExampleWithPageSizeSelector.tsx']} />
      <PaginationExampleWithPageSizeSelector />
      <PageSubtitle value="Showing first and last page buttons" />
      <Txt>
        The pagination component shows “previous page” and “next page” buttons by default. Set{' '}
        <Code>paginationWithEdges</Code> to also show “first page” and “last page” buttons, or set{' '}
        <Code>paginationWithControls</Code> to <Code>false</Code> to hide the “previous” and “next” buttons:
      </Txt>
      <CodeBlock code={code['PaginationExampleWithEdges.tsx']} />
      <PaginationExampleWithEdges />
      <PageSubtitle value="Customizing pagination controls" />
      <Txt>
        You can fully customize the pagination footer by providing a <Code>renderPagination</Code> callback. It receives
        a context object with the following keys:
      </Txt>
      <UnorderedList>
        <li>
          <Code>state</Code>: the current pagination state (<Code>page</Code>, <Code>totalPages</Code>,{' '}
          <Code>totalRecords</Code>, <Code>recordsPerPage</Code>, <Code>from</Code>, <Code>to</Code>,{' '}
          <Code>fetching</Code>, <Code>paginationSize</Code>, <Code>isWrapped</Code>, etc.);
        </li>
        <li>
          <Code>actions</Code>: <Code>setPage</Code> and, when the page size selector is enabled,{' '}
          <Code>setRecordsPerPage</Code>;
        </li>
        <li>
          <Code>Controls</Code>: factories for the default controls &mdash; <Code>Controls.Text</Code> (the pagination
          text), <Code>Controls.PageSizeSelector</Code> (the page size selector, if enabled) and{' '}
          <Code>Controls.Pagination</Code> (the{' '}
          <ExternalLink to="https://mantine.dev/core/pagination/">Mantine Pagination</ExternalLink> component). Each of
          them accepts optional props to override the defaults.
        </li>
      </UnorderedList>
      <Txt>
        This allows you to render the controls in any order, inject your own elements, or override their props. The
        example below adds a “jump to page” input between the page size selector and the pagination component:
      </Txt>
      <CodeBlock code={code['PaginationCustomRenderExample.tsx']} />
      <PaginationCustomRenderExample />
      <PageSubtitle value="Passing props to pagination buttons" />
      <Txt>You can pass additional props to the pagination buttons with these callbacks:</Txt>
      <UnorderedList>
        <li>
          <Code>getPaginationControlProps</Code>: receives the control type (<Code>{"'first'"}</Code>,{' '}
          <Code>{"'last'"}</Code>, <Code>{"'previous'"}</Code> or <Code>{"'next'"}</Code>) and returns an object of
          props for that control;
        </li>
        <li>
          <Code>getPaginationItemProps</Code>: receives a page number and returns an object of props for the
          corresponding page button.
        </li>
      </UnorderedList>
      <Txt>For instance, if you’re not happy with the default accessibility labels, you can override them like so:</Txt>
      <CodeBlock code={code['PaginationExampleWithControlProps.tsx']} />
      <PaginationExampleWithControlProps />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
