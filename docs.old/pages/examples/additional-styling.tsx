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
import AdditionalStylingExampleWithRowStyling from '~/examples/AdditionalStylingExampleWithRowStyling';
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
    | 'with-row-styling',
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
      'with-row-styling': readCodeExample('examples/AdditionalStylingExampleWithRowStyling.tsx') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        There are more ways to style a Mantine <Code>DataTable</Code> component besides setting its{' '}
        <InternalLink to="/examples/basic-table-properties">basic properties</InternalLink> and{' '}
        <InternalLink to="/examples/column-properties">column properties</InternalLink> or customizing it’s{' '}
        <InternalLink to="/examples/customizing-border-colors">border colors</InternalLink>.
      </PageText>
      <PageSubtitle value="With className" />
      <PageText>
        You can specify a <Code>className</Code> that will target the Mantine <Code>DataTable</Code> component root:
      </PageText>
      <CodeBlock language="typescript" content={code['with-class-name']} />
      <AdditionalStylingExampleWithClassName />
      <PageSubtitle value="With inline style" />
      <PageText>
        You can provide a <Code>style</Code> object that will target the Mantine <Code>DataTable</Code> component root:
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
      <PageText info>
        When styling with class names, you may need to increase selector specificity to override the default styling.
        <br />
        See{' '}
        <ExternalLink to="https://stackoverflow.com/questions/62660480/is-there-a-way-to-increase-specificity-by-adding-the-element-with-emotion">
          this StackOverflow question
        </ExternalLink>{' '}
        for more information.
      </PageText>
      <PageText>
        You can specifically target the component root, its header, footer and/or its pagination with different{' '}
        <Code>classNames</Code>:
      </PageText>
      <CodeBlock language="typescript" content={code['with-class-names']} />
      <AdditionalStylingExampleWithClassNames />
      <PageSubtitle value="With styles property" />
      <PageText>
        You can specifically target the component root, its header, footer and/or its pagination with a{' '}
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
      <CodeBlock language="typescript" content={code['with-row-styling']} />
      <AdditionalStylingExampleWithRowStyling />
      <PageNavigation of={PATH} />
    </Container>
  );
}
