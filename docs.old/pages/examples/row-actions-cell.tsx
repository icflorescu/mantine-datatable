import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import RowActionsCellExample from '~/examples/RowActionsCellExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/row-actions-cell';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/RowActionsCellExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If a simple <InternalLink to="/examples/handling-row-clicks">row click</InternalLink> or{' '}
        <InternalLink to="/examples/handling-cell-clicks">cell click</InternalLink> handler is not enough and{' '}
        <InternalLink to="/examples/row-context-menu">context menus</InternalLink> are not your thing, implementing a
        row actions cell should’t be difficult. Here’s how you could do it, unsing the column <Code>render</Code>{' '}
        function:
      </PageText>
      <RowActionsCellExample />
      <CodeBlock language="typescript" content={code} />
      <PageText info>
        If you need to combine row actions with{' '}
        <InternalLink to="/examples/handling-row-clicks">clickable rows</InternalLink>,{' '}
        <InternalLink to="/examples/handling-cell-clicks">clickable cells</InternalLink>,{' '}
        <InternalLink to="/examples/expanding-rows">expandable rows</InternalLink> or{' '}
        <InternalLink to="/examples/row-context-menu">
          row context-menus triggered by <Code>click</Code> instead of <Code>right-click</Code>
        </InternalLink>
        , make sure to intercept the <Code>click</Code> event on the actions and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
        <br />
        See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">this example</InternalLink> for
        more information.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
