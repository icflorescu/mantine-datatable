import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import {
  RowExpansionExampleCollapseProps,
  RowExpansionExampleInitiallyExpandedRows,
  RowExpansionExampleMultipleExpandedRows,
  RowExpansionExampleSimple,
  RowExpansionExampleTriggerAlways,
} from '~/examples/RowExpansionExamples';
import RowExpansionExampleWithInlineEditor from '~/examples/RowExpansionExampleWithInlineEditor';
import RowExpansionExampleWithLazyLoading from '~/examples/RowExpansionExampleWithLazyLoading';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/expanding-rows';

type Example =
  | 'simple'
  | 'collapse-props'
  | 'initially-expanded-rows'
  | 'multiple-expanded-rows'
  | 'trigger-always'
  | 'with-inline-editor-table'
  | 'with-inline-editor-row-expansion'
  | 'with-lazy-loading-table'
  | 'with-lazy-loading-row-expansion';

export const getStaticProps: GetStaticProps<{
  code: Record<Example, string>;
}> = async () => ({
  props: {
    code: {
      ...((await readCodeExample('examples/RowExpansionExamples.tsx')) as Record<Example, string>),
      ...((await readCodeExample('examples/RowExpansionExampleWithInlineEditor.tsx')) as Record<Example, string>),
      ...((await readCodeExample('examples/RowExpansionExampleWithLazyLoading.tsx')) as Record<Example, string>),
    },
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        The <Code>rowExpansion</Code> property allows you to define the <em>“row expansion”</em> behavior of the{' '}
        <Code>DataTable</Code>.
      </PageText>
      <PageSubtitle value="Basic usage" />
      <PageText>
        In its most basic usage scenario, the feature only requires specifying the content to be{' '}
        <em>lazily rendered</em> when a row is expanded.
      </PageText>
      <PageText info>Styling the expanded content falls within your responsibility.</PageText>
      <CodeBlock language="typescript" content={code['simple']} />
      <PageText>Click on a row to test the behavior:</PageText>
      <RowExpansionExampleSimple />
      <PageSubtitle value="Specifying collapse properties" />
      <PageText>
        Internally, the expanded content is rendered inside a Mantine{' '}
        <ExternalLink to="https://mantine.dev/core/collapse/">Collapse</ExternalLink> component. You can customize the
        underlying <Code>Collapse</Code> component like so:
      </PageText>
      <CodeBlock language="typescript" content={code['collapse-props']} />
      <RowExpansionExampleCollapseProps />
      <PageSubtitle value="Specifying which rows are initially expanded" />
      <PageText>You can specify which rows are initially expanded like so:</PageText>
      <CodeBlock language="typescript" content={code['initially-expanded-rows']} />
      <RowExpansionExampleInitiallyExpandedRows />
      <PageSubtitle value="Allowing multiple rows to be expanded at once" />
      <PageText>
        By default, a single row can be expanded at a certain time. You can override the default behavior like so:
      </PageText>
      <CodeBlock language="typescript" content={code['multiple-expanded-rows']} />
      <RowExpansionExampleMultipleExpandedRows />
      <PageSubtitle value="Always expand all rows" />
      <PageText>
        If you want all rows to be locked in their expanded state, just set the row expansion <Code>trigger</Code>{' '}
        property to <Code>always</Code>:
      </PageText>
      <CodeBlock language="typescript" content={code['trigger-always']} />
      <RowExpansionExampleTriggerAlways />
      <PageSubtitle value="Using collapse() function in row expansion content" />
      <PageText>
        Besides the current record, the <Code>content</Code> function also receives a <Code>collapse</Code> callback
        that could be used, for instance, in an inline editor like so:
      </PageText>
      <CodeBlockTabs
        items={[
          { language: 'typescript', title: 'Table.tsx', content: code['with-inline-editor-table'] },
          { language: 'typescript', title: 'CompanyEditor.tsx', content: code['with-inline-editor-row-expansion'] },
        ]}
      />
      <RowExpansionExampleWithInlineEditor />
      <PageSubtitle value="Lazy-loading row expansion data" />
      <PageText>
        As mentioned above, the <Code>content</Code> function is <em>lazily executed</em> when a row is expanded to
        prevent creating unnecessary DOM elements.
        <br />
        If your row expansion content needs to show data that comes from outside the table <Code>records</Code>, you
        could exploit this behavior to lazy-load it only when a row is expanded:
      </PageText>
      <CodeBlockTabs
        items={[
          { language: 'typescript', title: 'Table.tsx', content: code['with-lazy-loading-table'] },
          { language: 'typescript', title: 'CompanyDetails.tsx', content: code['with-lazy-loading-row-expansion'] },
        ]}
      />
      <RowExpansionExampleWithLazyLoading />
      <PageText info>
        If you need to combine the row expansion behavior with links, buttons,{' '}
        <InternalLink to="/examples/row-actions-cell">row action cells</InternalLink> or any kind of clickable
        components inside cells, make sure to intercept the <Code>click</Code> event on those components and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
        <br />
        See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows">this example</InternalLink> for more
        information.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
