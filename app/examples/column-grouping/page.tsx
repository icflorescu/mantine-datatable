import { Code } from '@mantine/core';
import type { Route } from 'next';
import { CodeBlock } from '~/components/CodeBlock';
import { ExternalLink } from '~/components/ExternalLink';
import { InternalLink } from '~/components/InternalLink';
import { PageNavigation } from '~/components/PageNavigation';
import { PageSubtitle } from '~/components/PageSubtitle';
import { PageTitle } from '~/components/PageTitle';
import { Txt } from '~/components/Txt';
import { UnorderedList } from '~/components/UnorderedList';
import { readCodeFile } from '~/lib/code';
import { allPromiseProps, getRouteMetadata } from '~/lib/utils';
import { ColumnGroupingExample } from './ColumnGroupingExample';
import { MultilevelColumnGroupingExample } from './MultilevelColumnGroupingExample';

const PATH: Route = '/examples/column-grouping';

export const metadata = getRouteMetadata(PATH);

export default async function ColumnGroupingExamplePage() {
  const code = await allPromiseProps({
    'ColumnGroupingExample.tsx': readCodeFile<string>(`${PATH}/ColumnGroupingExample.tsx`),
    'MultilevelColumnGroupingExample.tsx': readCodeFile<string>(`${PATH}/MultilevelColumnGroupingExample.tsx`),
    'companies.json': readCodeFile<string>('/../data/companies.json'),
    'data/index.ts': readCodeFile<string>('/../data/index.ts'),
  });

  return (
    <>
      <PageTitle of={PATH} />
      <Txt>
        Sometimes a subset of columns is closely related, in which case it makes sense to group their headers under a
        shared title. You can do this by passing the <Code>groups</Code> prop to the DataTable instead of{' '}
        <Code>columns</Code>.
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
          . It can be any string, as long as it is unique among the groups.
          <br />A humanized version of this value is used as the group header if no <Code>title</Code> is provided.
        </li>
        <li>
          <Code>columns</Code>
          <br />
          An array of <InternalLink to="/examples/column-properties-and-styling">column definitions</InternalLink> that
          are part of this group.
          <br />
          Alternatively, you can provide nested <Code>groups</Code> instead of <Code>columns</Code> &mdash; see{' '}
          <InternalLink to={PATH} scrollTo="Multilevel column grouping">
            multilevel column grouping
          </InternalLink>{' '}
          below.
        </li>
      </UnorderedList>
      <Txt>A group also accepts a few optional properties for customization purposes:</Txt>
      <UnorderedList>
        <li>
          <Code>title</Code>
          <br />A <Code>ReactNode</Code> to render inside the group header. If not specified, the <Code>id</Code> is
          humanized to generate a title.
        </li>
        <li>
          <Code>{"textAlign: 'left' | 'center' | 'right'"}</Code>
          <br />
          The text alignment of the group header. It doesn’t affect the alignment of the columns in the group, which you
          can set individually.
        </li>
        <li>
          <Code>className: string</Code>
          <br />
          Optional class name to apply to the group header.
        </li>
        <li>
          <Code>style</Code>
          <br />
          Optional style to apply to the group header.
          <br />
          Can be a style object or a function that receives the current theme and returns a style object.
        </li>
      </UnorderedList>
      <Txt>
        Groups are hidden if they don’t have any visible columns. This can happen when all of their columns are hidden
        by the <Code>hidden</Code> or <Code>visibleMediaQuery</Code> properties, or when the group has an empty array of
        columns.
      </Txt>
      <ColumnGroupingExample />
      <Txt>Here is the code used to generate the table above:</Txt>
      <CodeBlock tabs={{ code, keys: ['ColumnGroupingExample.tsx', 'companies.json'] }} />
      <PageSubtitle value="Multilevel column grouping" />
      <Txt>
        Groups can be nested to create multiple header rows. To do this, provide a <Code>groups</Code> array instead of{' '}
        <Code>columns</Code> for a group; each nested group can, in turn, contain either <Code>columns</Code> or further{' '}
        <Code>groups</Code>, but not both.
      </Txt>
      <Txt>
        Branches don’t need to have the same depth: if a group containing <Code>columns</Code> sits at a shallower level
        than others, its header will span the extra header rows. The order of the leaf columns in the table follows the
        order in which they appear in the group tree.
      </Txt>
      <MultilevelColumnGroupingExample />
      <Txt>Here is the code used to generate the table above:</Txt>
      <CodeBlock tabs={{ code, keys: ['MultilevelColumnGroupingExample.tsx', 'data/index.ts'] }} />
      <Txt info>
        Column grouping works together with other column features such as{' '}
        <InternalLink to="/examples/sorting">sorting</InternalLink> or pinning. See{' '}
        <InternalLink to="/examples/pinning-the-first-column">pinning the first column</InternalLink>,{' '}
        <InternalLink to="/examples/pinning-the-last-column">pinning the last column</InternalLink> and{' '}
        <InternalLink to="/examples/pinning-arbitrary-columns">pinning arbitrary columns</InternalLink> to learn how
        pinning interacts with column groups.
      </Txt>
      <Txt>Head over to the next example to discover more features.</Txt>
      <PageNavigation of={PATH} />
    </>
  );
}
