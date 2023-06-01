import { Code, Container } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import CodeBlock from '~/components/CodeBlock';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import SearchingAndFilteringExample from '~/examples/SearchingAndFilteringExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/searching-and-filtering';

export const getStaticProps: GetStaticProps<{ code: string }> = async () => ({
  props: { code: (await readCodeExample('examples/SearchingAndFilteringExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <PageTitle of={PATH} />
      <SearchingAndFilteringExample />
      <PageText>
        Adjust the array of <Code>records</Code> you’re feeding to <Code>Mantine DataTable</Code> based on your own
        logic in order to perform searching and filtering.
      </PageText>
      <PageText>
        In order to support column-based filtering you can use the <Code>filter</Code> and <Code>filtering</Code>{' '}
        <InternalLink to="/examples/column-properties">column properties</InternalLink>.
      </PageText>
      <PageText>Here’s a possible (rather naive) implementation:</PageText>
      <CodeBlock language="typescript" content={code} />
      <PageText info>
        <PageSubtitle mt={0} mb="xs" value="Why no built-in “Excel-like” searching and filtering support?" />
        You’ll often have to implement searching and filtering data in your projects.
        <br />
        However there’s simply no way for <Code>Mantine DataTable</Code> to accommodate every possible usage scenario
        out there. Most of the times you’d have to deal with pagination, sorting, asynchronous loading; sometimes you’d
        have to place a search box or custom filtering criteria selectors in the header of your entire
        website/application.
        <br />
        Not to mention that in real-life you’d most often do the actual filtering and/or searching in a server API.
        <br />
        The responsibilities and areas of control are most of the times spread across your application’s UI and
        architectural layers, and trying to fit all this in a standard component design and behavior would needlessly
        constrain the developer.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
