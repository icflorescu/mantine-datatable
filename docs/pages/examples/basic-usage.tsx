import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import BasicUsageExample from '~/examples/BasicUsageExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/basic-usage';

export const getStaticProps: GetStaticProps<{
  code: { 'BasicUsageExample.tsx': string; 'companies.json': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'BasicUsageExample.tsx': readCodeExample('examples/BasicUsageExample.tsx') as Promise<string>,
      'companies.json': readCodeExample('data/companies.json') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <BasicUsageExample />
      <PageText>
        In its most basic usage scenario, the <Code>DataTable</Code> component only requires <Code>records</Code> and{' '}
        <Code>columns</Code> properties to be set:
      </PageText>
      <CodeBlockTabs
        items={[
          { title: 'BasicUsageExample.tsx', language: 'typescript', content: code['BasicUsageExample.tsx'] },
          { title: 'companies.json', language: 'json', content: code['companies.json'] },
        ]}
      />
      <PageText>
        However, there’s much more you can do with Mantine DataTable.
        <br />
        Head over to the next example to discover other features.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
