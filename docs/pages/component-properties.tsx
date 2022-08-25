import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'component-properties';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('../package/DataTable.props.ts')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Mantine DataTable component is written in Typescript and its properties are well documented with additional
        JSDoc annotations, so you can harness the full power of your IDE to build type safe applications with
        confidence. Here is the actual source of <Code>DataTable.props.ts</Code>:
      </PageText>
      <CodeBlock language="typescript" content={code} noCopy />
      <PageNavigation of={PATH} />
    </Container>
  );
}
