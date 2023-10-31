import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { ColumnGroupingExample } from './ColumnGroupingExample';

const PATH: Route = '/examples/column-grouping';

export const metadata = getRouteMetadata(PATH);

export default async function ColumnGroupingExamplePage() {
  const code = await allPromiseProps({
    'ColumnGroupingExample.tsx': readCodeFile<string>(`${PATH}/ColumnGroupingExample.tsx`),
    'companies.json': readCodeFile<string>('/../data/companies.json'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Sometimes a sub-set of data is very closely related. In such a case it might make sense to group the headers of
        those columns. This can be easily achieved by specifying <Code>groups</Code> instead of <Code>columns</Code>.
      </Txt>
      <Txt>Each group requires the following properties:</Txt>
      <UnorderedList>
        <li>
          <Code>id</Code>
          <br />
          Used as a{' '}
          <ExternalLink to="https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key">
            key
          </ExternalLink>
          . Can be any string, as long as it is unique among the groups.
          <br />A humanized version of this value is used as header if no <Code>title</Code> is provided.
        </li>
        <li>
          <Code>columns</Code>
          <br />
          An array of <InternalLink to="/examples/column-properties-and-styling">column definitions</InternalLink> that
          are part of this group.
        </li>
      </UnorderedList>
      <Txt>
        In addition to the aforementioned required properties, a group accepts some optional props for customization
        purposes:
      </Txt>
      <UnorderedList>
        <li>
          <Code>title</Code>
          <br />A <Code>ReactNode</Code> that will be rendered inside the column group. If not specified (or set to{' '}
          <Code>undefined</Code>), the <Code>id</Code> is humanized to generate a string.
        </li>
        <li>
          <Code>{"textAlign: 'left' | 'center' | 'right'"}</Code>
          <br />
          The text alignment for all columns in this group.
        </li>
        <li>
          <Code>className: string</Code>
          <br />
          Optional class to apply to the group header.
        </li>
        <li>
          <Code>style</Code>
          <br />
          Optional style to be applied to the group header.
          <br />
          Can be a style object or a function that receives the current theme and returns a style object.
        </li>
      </UnorderedList>
      <Txt>
        Groups are hidden if they don’t have any visible columns. This could be the result of all columns being hidden
        due to the <Code>hidden</Code> or <Code>visibleMediaQuery</Code> attribute, or by simply providing an empty
        array of columns.
      </Txt>
      <ColumnGroupingExample />
      <Txt>Here is the code used to generate the table above:</Txt>
      <CodeBlock tabs={{ code, keys: ['ColumnGroupingExample.tsx', 'companies.json'] }} />
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
