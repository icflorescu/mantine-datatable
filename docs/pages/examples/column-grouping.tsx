import { Code, Container, List } from '@mantine/core';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ColumnGroupingExample from '~/examples/ColumnGroupingExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/column-grouping';

export const getStaticProps: GetStaticProps<{
  code: {
    'ColumnGroupingExample.tsx': string;
    'companies.json': string;
  };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'ColumnGroupingExample.tsx': readCodeExample('examples/ColumnGroupingExample.tsx') as Promise<string>,
      'companies.json': readCodeExample('data/companies.json') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Sometimes a sub-set of data is very closely related. In such a case it might make sense to group the headers of
        those columns. This can be easily achieved by specifying <Code>groups</Code> instead of <Code>columns</Code>.
      </PageText>
      <PageText>
        Each group requires the following properties:
        <List>
          <List.Item>
            <Code>id</Code> → Used as a{' '}
            <ExternalLink to="https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key">
              key
            </ExternalLink>
            . Can be any string, as long as it is unique among the groups. A humanized version of this value is used as
            header if no <Code>title</Code> is provided.
          </List.Item>
          <List.Item>
            <Code>columns</Code> → An array of{' '}
            <InternalLink to="/examples/column-properties">column definitions</InternalLink> that are part of this
            group.
          </List.Item>
        </List>
      </PageText>
      <PageText>
        In addition to the aforementioned required properties, a group accepts some optional props for customization
        purposes:
        <List>
          <List.Item>
            <Code>title</Code> → A React component which will be rendered inside the column group. If not specified (or
            set to <Code>undefined</Code>), the <Code>id</Code> is humanized to generate a string
          </List.Item>
          <List.Item>
            <Code>className</Code> → Class to apply to the <Code>{'<th/>'}</Code>
          </List.Item>
          <List.Item>
            <Code>sx</Code>: See{' '}
            <ExternalLink to="https://mantine.dev/styles/sx/">Mantine’s documentation</ExternalLink> for more
            information.
          </List.Item>
          <List.Item>
            <Code>style</Code> → Object with CSS styles to be applied to the <Code>{'<th/>'}</Code>
          </List.Item>
        </List>
      </PageText>
      <PageText>
        Groups are hidden if they don’t have any visible columns. This could be the result of all columns being hidden
        due to the <Code>hidden</Code> or <Code>visibleMdediaQuery</Code> attribute, or by simply providing an empty
        array of columns.
      </PageText>
      <ColumnGroupingExample />
      <CodeBlockTabs
        items={[
          { title: 'ColumnGroupingExample.tsx', language: 'typescript', content: code['ColumnGroupingExample.tsx'] },
          { title: 'companies.json', language: 'json', content: code['companies.json'] },
        ]}
      />
      <PageNavigation of={PATH} />
    </Container>
  );
}
