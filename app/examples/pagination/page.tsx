import { Code, ListItem } from '@mantine/core';
import { Fragment } from 'react';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
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
      <UnorderedList>
        <ListItem>
          <Code>page: number</Code>
          <br />
          The current page number.
        </ListItem>
        <ListItem>
          <Code>onPageChange</Code>
          <br />A callback that is executed when the user changes the current page.
        </ListItem>
        <ListItem>
          <Code>totalRecords: number</Code>
          <br />
          The total number of records in the dataset.
        </ListItem>
        <ListItem>
          <Code>recordsPerPage: number</Code>
          <br />
          The number of records per page.
        </ListItem>
      </UnorderedList>
      <Txt>
        If you’re not happy with the default pagination behavior, you can override it by setting these{' '}
        <strong>optional</strong> properties:
      </Txt>
      <UnorderedList>
        <ListItem>
          <Code>loadingText: string</Code>
          <br />A text to display while loading records.
        </ListItem>
        <ListItem>
          <Code>noRecordsText: string</Code>
          <br />A text to display when no records are present.
        </ListItem>
        <ListItem>
          <Code>paginationText</Code>
          <br />A callback receiving an object in the shape of{' '}
          <Code>{'{ from: number; to: number; totalRecords: number }'}</Code> and returning a <Code>ReactNode</Code>{' '}
          representing the pagination text.
        </ListItem>
        <ListItem>
          <Code>paginationColor: MantineColor</Code>
          <br />
          The pagination color (see <ExternalLink to="https://mantine.dev/theming/colors/">Mantine Colors</ExternalLink>
          ).
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
        </ListItem>
      </UnorderedList>
      <CodeBlock code={code['PaginationExample.tsx']} />
      <PageSubtitle value="Displaying a page size selector" />
      <Txt>
        You can display a selector to let the user choose the page size by setting the following component properties:
      </Txt>
      <UnorderedList>
        <ListItem>
          <Code>recordsPerPageOptions: number[]</Code>
          <br />
          An array of page size numbers to display in the page size selector.
        </ListItem>
        <ListItem>
          <Code>onRecordsPerPageChange</Code>
          <br />A callback that is executed when the user changes the page size. Receives the new page size as its
          argument.
        </ListItem>
        <ListItem>
          <Code>recordsPerPageLabel</Code>
          <br />
          The page size selector label, defaulting to {"'Records per page'"}.
        </ListItem>
      </UnorderedList>
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
