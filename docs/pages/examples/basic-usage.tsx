import { Code, Container } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import BasicUsageExample from '~/examples/BasicUsageExample';
import { readExampleCodeFile } from '~/lib/code';

const PATH = 'examples/basic-usage';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: await readExampleCodeFile('BasicUsageExample.tsx') },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <ExampleContainer>
        <BasicUsageExample />
      </ExampleContainer>
      <PageText>
        In its most basic usage scenario, the <Code>DataTable</Code> component only requires <Code>records</Code> and{' '}
        <Code>columns</Code> properties to be set.
      </PageText>
      <Prism language="typescript">{code}</Prism>
      <PageNavigation of={PATH} />
    </Container>
  );
}
