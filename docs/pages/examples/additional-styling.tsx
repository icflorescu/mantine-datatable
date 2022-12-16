import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import AdditionalStylingExampleWithClassName from '~/examples/AdditionalStylingExampleWithClassName';
import AdditionalStylingExampleWithClassNames from '~/examples/AdditionalStylingExampleWithClassNames';
import AdditionalStylingExampleWithRowClassName from '~/examples/AdditionalStylingExampleWithRowClassName';
import AdditionalStylingExampleWithStyleObject from '~/examples/AdditionalStylingExampleWithStyleObject';
import AdditionalStylingExampleWithStylesFunction from '~/examples/AdditionalStylingExampleWithStylesFunction';
import AdditionalStylingExampleWithStylesObject from '~/examples/AdditionalStylingExampleWithStylesObject';
import AdditionalStylingExampleWithSxFunction from '~/examples/AdditionalStylingExampleWithSxFunction';
import AdditionalStylingExampleWithSxObject from '~/examples/AdditionalStylingExampleWithSxObject';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/additional-styling';

export const getStaticProps: GetStaticProps<{
  code: Record<
    | 'with-class-name'
    | 'with-style-object'
    | 'with-sx-object'
    | 'with-sx-function'
    | 'with-class-names'
    | 'with-styles-object'
    | 'with-styles-function'
    | 'with-row-class-name',
    string
  >;
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'with-class-name': readCodeExample('examples/AdditionalStylingExampleWithClassName.tsx') as Promise<string>,
      'with-style-object': readCodeExample('examples/AdditionalStylingExampleWithStyleObject.tsx') as Promise<string>,
      'with-sx-object': readCodeExample('examples/AdditionalStylingExampleWithSxObject.tsx') as Promise<string>,
      'with-sx-function': readCodeExample('examples/AdditionalStylingExampleWithSxFunction.tsx') as Promise<string>,
      'with-class-names': readCodeExample('examples/AdditionalStylingExampleWithClassNames.tsx') as Promise<string>,
      'with-styles-object': readCodeExample('examples/AdditionalStylingExampleWithStylesObject.tsx') as Promise<string>,
      'with-styles-function': readCodeExample(
        'examples/AdditionalStylingExampleWithStylesFunction.tsx'
      ) as Promise<string>,
      'with-row-class-name': readCodeExample(
        'examples/AdditionalStylingExampleWithRowClassName.tsx'
      ) as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        There are more ways to style a <Code>Mantine DataTable</Code> component besides setting it’s{' '}
        <InternalLink to="/examples/basic-table-properties">basic properties</InternalLink> and{' '}
        <InternalLink to="/examples/column-properties">column properties</InternalLink> or customizing it’s{' '}
        <InternalLink to="/examples/customizing-border-colors">border colors</InternalLink>.
      </PageText>
      <PageSubtitle value="With className" />
      <PageText>
        You can specify a <Code>className</Code> that will target the <Code>Mantine DataTable</Code> component root:
      </PageText>
      <CodeBlock language="typescript" content={code['with-class-name']} />
      <AdditionalStylingExampleWithClassName />
      <PageSubtitle value="With inline style" />
      <PageText>
        You can provide an <Code>style</Code> object that will target the <Code>Mantine DataTable</Code> component root:
      </PageText>
      <CodeBlock language="typescript" content={code['with-style-object']} />
      <AdditionalStylingExampleWithStyleObject />
      <PageSubtitle value="With SX" />
      <PageText>
        You can provide{' '}
        <ExternalLink to="https://mantine.dev/styles/sx/">
          an <Code>sx</Code> property
        </ExternalLink>{' '}
        that will target the <Code>Mantine DataTable</Code> component root:
      </PageText>
      <CodeBlock language="typescript" content={code['with-sx-object']} />
      <AdditionalStylingExampleWithSxObject />
      <PageText>
        The <Code>sx</Code> property can also point to a function that receives the current theme as its argument:
      </PageText>
      <CodeBlock language="typescript" content={code['with-sx-function']} />
      <AdditionalStylingExampleWithSxFunction />
      <PageSubtitle value="With multiple class names" />
      <PageText>
        You can specifically target the component root, its header and/or its pagination footer with different{' '}
        <Code>classNames</Code>:
      </PageText>
      <CodeBlock language="typescript" content={code['with-class-names']} />
      <AdditionalStylingExampleWithClassNames />
      <PageText>
        You can specifically target the component root, its header and/or its pagination footer with a{' '}
        <Code>styles</Code> property:
      </PageText>
      <CodeBlock language="typescript" content={code['with-styles-object']} />
      <AdditionalStylingExampleWithStylesObject />
      <PageText>
        The <Code>styles</Code> property can also point to a function that receives the current theme as its argument:
      </PageText>
      <CodeBlock language="typescript" content={code['with-styles-function']} />
      <AdditionalStylingExampleWithStylesFunction />
      <PageSubtitle value="Row styling" />
      <PageText>
        You can style rows with <Code>rowClassName</Code>, <Code>rowStyle</Code> and <Code>rowSx</Code> properties. They
        work the same way as <Code>className</Code>, <Code>style</Code> and <Code>sx</Code>, but target rows instead of
        the component root.
      </PageText>
      <CodeBlock language="typescript" content={code['with-row-class-name']} />
      <AdditionalStylingExampleWithRowClassName />
      <PageNavigation of={PATH} />
    </Container>
  );
}
