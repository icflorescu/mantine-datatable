import { Container } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import PageNavigation from '~/components/PageNavigation';
import PageTitle from '~/components/PageTitle';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/column-media-queries';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/BasicUsageExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <Prism language="typescript">{code}</Prism>
      <PageNavigation of={PATH} />
    </Container>
  );
}
