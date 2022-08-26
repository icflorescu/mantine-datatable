import { Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import BasicUsageExample from '~/examples/BasicUsageExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/context-menu';

export const getStaticProps: GetStaticProps<{
  code: { 'ContextMenuExample.tsx': string; 'companies.json': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'ContextMenuExample.tsx': readCodeExample('examples/ContextMenuExample.tsx') as Promise<string>,
      'companies.json': readCodeExample('data/companies.json') as Promise<string>,
    }),
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>To be written...</PageText>
      <CodeBlockTabs
        items={[
          {
            title: 'ContextMenuExample.tsx',
            language: 'typescript',
            content: code['ContextMenuExample.tsx'],
          },
          { title: 'companies.json', language: 'json', content: code['companies.json'] },
        ]}
      />
      <PageText>The code above will produce the following result:</PageText>
      <ExampleContainer>
        <BasicUsageExample />
      </ExampleContainer>
      <PageNavigation of={PATH} />
    </Container>
  );
}
