import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import DefaultColumnPropertiesExample from '~/examples/DefaultColumnPropertiesExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/default-column-properties';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/DefaultColumnPropertiesExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        If you find yourself repeating the same properties over and over again for multiple columns, you can use{' '}
        <Code>defaultColumnProps</Code> (which accepts a subset of{' '}
        <InternalLink to="/examples/column-properties">column properties</InternalLink>) to set them once and use as a
        fallback for all columns:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText>The code above will produce the following result:</PageText>
      <DefaultColumnPropertiesExample />
      <PageText>
        In certain scenarios, you can also use a render fallback function. Head over to the next example to learn more.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
