import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import UsingWithAutoAnimateExample from '~/examples/UsingWithAutoAnimateExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/using-with-auto-animate';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: {
    code: (await readCodeExample('examples/UsingWithAutoAnimateExample.tsx')) as string,
  },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        The <Code>DataTable</Code> component exposes a <Code>bodyRef</Code> property that can be used to pass a ref to
        the underlying table <Code>tbody</Code> element. This ref can be passed to the <Code>useAutoAnimate()</Code>{' '}
        hook from the excellent <ExternalLink to="https://auto-animate.formkit.com/">AutoAnimate</ExternalLink> library
        to animate table rows when they are added, removed or reordered.
      </PageText>
      <UsingWithAutoAnimateExample />
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
