import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import HandlingRowClicksExample from '~/examples/HandlingRowClicksExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/handling-row-clicks';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/HandlingRowClicksExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Click on a row to see it in action:</PageText>
      <HandlingRowClicksExample />
      <PageText>
        Provide a handler called <Code>onRowClick</Code> to the <Code>DataTable</Code> component, like so:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText info>
        When handling row clicks, you might want to{' '}
        <InternalLink to="/examples/disabling-text-selection">disable text selection</InternalLink>.
      </PageText>
      <PageText info>
        If you need to combine this behavior with links, buttons,{' '}
        <InternalLink to="/examples/row-actions-cell">row action cells</InternalLink> or any kind of clickable
        components inside cells, make sure to intercept the <Code>click</Code> event on those components and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
        <br />
        See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">this example</InternalLink> for
        more information.
      </PageText>
      <PageText>
        If you need more granularity, consider using an{' '}
        <InternalLink to="/examples/handling-cell-clicks">
          <Code>onCellClick</Code> handler
        </InternalLink>{' '}
        instead.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
