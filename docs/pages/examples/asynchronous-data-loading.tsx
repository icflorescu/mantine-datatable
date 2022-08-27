import { Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import AsynchronousDataLoadingExample from '~/examples/AsynchronousDataLoadingExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/asynchronous-data-loading';

export const getStaticProps: GetStaticProps<{
  code: { 'AsynchronousDataLoadingExample.tsx': string; 'data.ts': string };
}> = async () => ({
  props: {
    code: await allPromiseProps({
      'AsynchronousDataLoadingExample.tsx': readCodeExample(
        'examples/AsynchronousDataLoadingExample.tsx'
      ) as Promise<string>,
      'data.ts': readCodeExample('data.ts') as Promise<string>,
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
            title: 'AsynchronousDataLoadingExample.tsx',
            language: 'typescript',
            content: code['AsynchronousDataLoadingExample.tsx'],
          },
          { title: 'data.ts', language: 'json', content: code['data.ts'] },
        ]}
      />
      <PageText>The code above will produce the following result:</PageText>
      <ExampleContainer>
        <AsynchronousDataLoadingExample />
      </ExampleContainer>
      <PageNavigation of={PATH} />
    </Container>
  );
}
