import { Container } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { readFile } from 'node:fs/promises';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';

const PATH = 'component-properties';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => {
  const code = await readFile('../package/DataTable.props.ts', { encoding: 'utf8' });
  return { props: { code } };
};

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Mantine DataTable component properties are well documented in Typescript &amp; JSDoc, so you can build type safe
        applications with confidence:
      </PageText>
      <Prism language="typescript" noCopy>
        {code}
      </Prism>
      <PageNavigation of={PATH} />
    </Container>
  );
}
