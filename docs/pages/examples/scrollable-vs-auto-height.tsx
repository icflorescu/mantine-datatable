import { Code, Container, Paper, Switch, createStyles } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import {
  AutoHeightExample,
  ScrollAreaPropsExample,
  ScrollableExample,
} from '~/examples/ScrollableVsAutoHeightExamples';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/scrollable-vs-auto-height';

type ExampleName = 'scrollable' | 'auto-height' | 'scroll-area-props';

export const getStaticProps: GetStaticProps<{
  code: Record<ExampleName, string>;
}> = async () => ({
  props: {
    code: (await readCodeExample('examples/ScrollableVsAutoHeightExamples.tsx')) as Record<ExampleName, string>,
  },
});

const useStyles = createStyles({
  control: { fontSize: 0 },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [scrollable, setScrollable] = useState(true);
  const { classes } = useStyles();

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>Try the interactive example below to see the feature it in action:</PageText>
      <Paper my="xl" p="sm" withBorder>
        <Switch
          className={classes.control}
          label="Set height to make it vertically-scrollable"
          checked={scrollable}
          onChange={() => setScrollable((value) => !value)}
        />
      </Paper>
      {scrollable ? <ScrollableExample /> : <AutoHeightExample />}
      <PageText>
        The <Code>DataTable</Code> component embeds a{' '}
        <ExternalLink to="https://mantine.dev/core/scroll-area/">Mantine ScrollArea</ExternalLink> and has a default{' '}
        <Code>height</Code> of <Code>100%</Code>.
        <br />
        Thus, setting the component height or placing it inside a height-restricted container will turn on its{' '}
        <em>“vertically-scrollable”</em> behavior.
        <br />
      </PageText>
      <PageText info>
        The <Code>DataTable</Code> will always be <em>“horizontally-scrollable”</em> if its width it greater than its
        container width.
      </PageText>
      <CodeBlock language="typescript" content={code[scrollable ? 'scrollable' : 'auto-height']} />
      <PageSubtitle value="Customize the underlying ScrollArea" />
      <PageText>
        You can customize the underlying scroll area by passing <Code>scrollAreaProps</Code> to the{' '}
        <Code>DataTable</Code> component. The <Code>scrollAreaProps</Code> accepts a subset of{' '}
        <ExternalLink to="https://mantine.dev/core/scroll-area/?t=props">Mantine ScrollArea props</ExternalLink>:{' '}
        <Code>type</Code>, <Code>scrollbarSize</Code> and <Code>scrollHideDelay</Code>. For instance, here’s how you
        could make the scrollbars invisible:
      </PageText>
      <CodeBlock language="typescript" content={code['scroll-area-props']} />
      <ScrollAreaPropsExample />
      <PageNavigation of={PATH} />
    </Container>
  );
}
