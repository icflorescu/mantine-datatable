import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import CodeBlockTabs from '~/components/CodeBlockTabs';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import CustomizeBasicPropertiesExample from '~/examples/CustomizeBasicPropertiesExample';
import allPromiseProps from '~/lib/allPromiseProps';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/customize-basic-properties';

export const getStaticProps: GetStaticProps<{
  code: { 'CustomizeBasicPropertiesExample.tsx': string; 'companies.json': string };
}> = async () => {
  return {
    props: {
      code: await allPromiseProps({
        'CustomizeBasicPropertiesExample.tsx': readCodeExample(
          'examples/CustomizeBasicPropertiesExample.tsx'
        ) as Promise<string>,
        'companies.json': readCodeExample('data/companies.json') as Promise<string>,
      }),
    },
  };
};

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const initialTsxCode = code['CustomizeBasicPropertiesExample.tsx'];
  const [tsxCode, setTsxCode] = useState(initialTsxCode);

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        The <Code>DataTable</Code> component exposes the basic properties of the internal{' '}
        <ExternalLink to="https://mantine.dev/core/table/">Mantine Table</ExternalLink> component and implements a
        number of additional ones. Try to customize them interactively below.
      </PageText>
      <CustomizeBasicPropertiesExample initialCode={initialTsxCode} setCode={setTsxCode} />
      <CodeBlockTabs
        items={[
          { title: 'tsx code', language: 'typescript', content: tsxCode },
          { title: 'companies.json', language: 'json', content: code['companies.json'] },
        ]}
      />
      <PageNavigation of={PATH} />
    </Container>
  );
}
