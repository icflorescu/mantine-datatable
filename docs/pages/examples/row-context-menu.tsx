import { Box, Code, Container, createStyles, Paper, Radio, Stack } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import CodeBlock from '~/components/CodeBlock';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import {
  RowContextMenuExample1,
  RowContextMenuExample2,
  RowContextMenuExample3,
  RowContextMenuExample4,
  RowContextMenuExample5,
  RowContextMenuExample6,
  RowContextMenuExample7,
  RowContextMenuExample8,
  RowContextMenuExample9,
} from '~/examples/RowContextMenuExamples';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/row-context-menu';

const EXAMPLES = [
  RowContextMenuExample1,
  RowContextMenuExample2,
  RowContextMenuExample3,
  RowContextMenuExample4,
  RowContextMenuExample5,
  RowContextMenuExample6,
  RowContextMenuExample7,
  RowContextMenuExample8,
  RowContextMenuExample9,
];

export const getStaticProps: GetStaticProps<{
  code: Record<string, string>;
}> = async () => ({
  props: {
    code: (await readCodeExample('examples/RowContextMenuExamples.tsx')) as Record<string, string>,
  },
});

const useStyles = createStyles((theme) => ({
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xl,
    [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
}));

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [example, setExample] = useState('1');
  const Example = EXAMPLES[parseInt(example) - 1];

  const { classes } = useStyles();

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Mantine doesn’t have a context-menu component, but the <Code>DataTable</Code> does allow you to create this
        useful functionality for your data-rich desktop applications by providing a property called{' '}
        <Code>rowContextMenu</Code> to describe the menu actions and behavior.
      </PageText>
      <PageText>Try it in the interactive example below:</PageText>
      <Paper my="xl" px="xl" py="sm" withBorder>
        <Radio.Group value={String(example)} onChange={setExample}>
          <div className={classes.controls}>
            <Stack>
              <Radio value="1" label="Simple context menu" />
              <Radio value="2" label="Show context menu on click" />
              <Radio value="3" label="Hide context menu" />
              <Radio value="4" label="Hide context menu for the first row" />
              <Radio value="5" label="Disable “delete” context menu action for the first row" />
            </Stack>
            <Stack>
              <Radio value="6" label="Hide “delete” context menu action for the first row" />
              <Radio value="7" label="Specify action icons" />
              <Radio value="8" label="Customize “delete” action icon for the first row" />
              <Radio value="9" label="Customize “delete” action color for the first row" />
            </Stack>
          </div>
        </Radio.Group>
      </Paper>
      <Box sx={{ height: 300 }}>
        <Example />
      </Box>
      <CodeBlock language="typescript" content={code[example]} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
