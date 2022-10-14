import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import LinksOrButtonsInsideClickableRowsExample from '~/examples/LinksOrButtonsInsideClickableRowsExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/links-or-buttons-inside-clickable-rows-or-cells';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/LinksOrButtonsInsideClickableRowsExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If you need to add links, buttons or any kind of clickable components inside clickable{' '}
        <InternalLink to="/examples/handling-row-clicks">clickable rows</InternalLink>,{' '}
        <InternalLink to="/examples/handling-cell-clicks">clickable cells</InternalLink>,{' '}
        <InternalLink to="/examples/expanding-rows">expandable rows</InternalLink> or{' '}
        <InternalLink to="/examples/row-context-menu">
          row context-menus triggered by <Code>click</Code> instead of <Code>right-click</Code>
        </InternalLink>
        , make sure to intercept the <Code>click</Code> event on the clickable components and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        , like so:
      </PageText>
      <LinksOrButtonsInsideClickableRowsExample />
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
