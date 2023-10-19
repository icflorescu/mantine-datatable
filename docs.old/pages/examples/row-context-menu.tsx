import { Box, Code, Container, createStyles, Paper, Radio, Stack } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import CodeBlock from '~/components/CodeBlock';
import ExternalLink from '~/components/ExternalLink';
import InternalLink from '~/components/InternalLink';
import PageNavigation from '~/components/PageNavigation';
import PageSubtitle from '~/components/PageSubtitle';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import { MANTINE_CONTEXTMENU_LINK } from '~/config';
import {
  RowContextMenuExample1,
  RowContextMenuExample10,
  RowContextMenuExample2,
  RowContextMenuExample3,
  RowContextMenuExample4,
  RowContextMenuExample5,
  RowContextMenuExample6,
  RowContextMenuExample7,
  RowContextMenuExample8,
  RowContextMenuExample9,
  RowContextMenuExampleInsideModal,
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
  RowContextMenuExample10,
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
    [`@media (min-width: ${theme.breakpoints.sm})`]: {
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
          <Box py="sm" className={classes.controls}>
            <Stack>
              <Radio value="1" label="Simple context menu, triggered by right-clicking" />
              <Radio value="2" label="Trigger context menu on row clicking instead of right-clicking" />
              <Radio value="3" label="Hide context menu" />
              <Radio value="4" label="Hide context menu for a specific record" />
              <Radio value="5" label="Disable “delete” context menu action for a specific record" />
            </Stack>
            <Stack>
              <Radio value="6" label="Hide “delete” context menu action for a specific record" />
              <Radio value="7" label="Specify action icons" />
              <Radio value="8" label="Customize “delete” action icon for a specific record" />
              <Radio value="9" label="Customize “delete” action color for a specific record" />
              <Radio value="10" label="Customize border radius, shadow and add an actions divider" />
            </Stack>
          </Box>
        </Radio.Group>
      </Paper>
      <Box sx={{ height: 300 }}>
        <Example />
      </Box>
      <CodeBlock language="typescript" content={code[example]} />
      <PageText info>
        When using a row context menu triggered by click instead of right-click, you might want to{' '}
        <InternalLink to="/examples/disabling-text-selection">disable text selection</InternalLink>. If you need to
        combine context menus triggered by <Code>click</Code> instead of <Code>right-click</Code> with links, buttons,{' '}
        <InternalLink to="/examples/row-actions-cell">row action cells</InternalLink> or any kind of clickable
        components inside cells, make sure to intercept the <Code>click</Code> event on those components and{' '}
        <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation">
          invoke its <Code>.stopPropagation()</Code> method
        </ExternalLink>
        .
        <br />
        See <InternalLink to="/examples/links-or-buttons-inside-clickable-rows-or-cells">this example</InternalLink> for
        more information.
      </PageText>
      <PageText idea>
        If you’re interested in using context menus in other places in your application’s UI, have a look at{' '}
        <ExternalLink to={MANTINE_CONTEXTMENU_LINK}>Mantine ContextMenu</ExternalLink>.
      </PageText>
      <PageSubtitle value="Using row context menus inside modals" />
      <PageText>
        When using row context menus on data tables inside modals, you need to make sure that the context menu is
        rendered above the modal. To do so, you need to set its <Code>zIndex</Code> property to a value higher than the
        modal’s <Code>zIndex</Code>:
      </PageText>
      <RowContextMenuExampleInsideModal />
      <CodeBlock language="typescript" content={code['inside-modal']} />
      <PageText>
        If you’re not a fan of context menus,{' '}
        <InternalLink to="/examples/row-actions-cell">implementing a row actions cell</InternalLink> should’t be
        difficult.
      </PageText>
      <PageNavigation of={PATH} />
    </Container>
  );
}
