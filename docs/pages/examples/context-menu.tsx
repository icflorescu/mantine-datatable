import { Code, Container, Group, Paper, SegmentedControl, Text } from '@mantine/core';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState } from 'react';
import CodeBlock from '~/components/CodeBlock';
import ExampleContainer from '~/components/ExampleContainer';
import PageNavigation from '~/components/PageNavigation';
import PageText from '~/components/PageText';
import PageTitle from '~/components/PageTitle';
import ContextMenuExample, { ContextMenuExampleStatus } from '~/examples/ContextMenuExample';
import readCodeExample from '~/lib/readCodeExample';

const PATH = 'examples/context-menu';

export const getStaticProps: GetStaticProps<{
  code: string;
}> = async () => ({
  props: { code: (await readCodeExample('examples/ContextMenuExample.tsx')) as string },
});

export default function Page({ code }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [status, setStatus] = useState<ContextMenuExampleStatus>(ContextMenuExampleStatus.enabled);

  return (
    <Container>
      <PageTitle of={PATH} />
      <PageText>
        Mantine doesn’t have a context-menu component, but the <Code>DataTable</Code> does allow you to create this
        useful functionality for your data-rich desktop applications. Try it in the interactive example below:
      </PageText>
      <Paper my="xl" p="sm" withBorder>
        <Group>
          <Text size="sm">Context menu status</Text>
          <SegmentedControl
            data={[
              { value: ContextMenuExampleStatus.enabled, label: 'Enabled' },
              { value: ContextMenuExampleStatus.disabled, label: 'Disabled' },
              { value: ContextMenuExampleStatus.disabledForTheFirstRow, label: 'Disabled for the first row' },
            ]}
            value={status}
            onChange={(value) => setStatus(value as ContextMenuExampleStatus)}
          />
        </Group>
      </Paper>
      <ExampleContainer>
        <ContextMenuExample exampleStatus={status} />
      </ExampleContainer>
      <PageText>
        In order to enable the context-menu feature, you’ll have to provide a property called{' '}
        <Code>rowContextMenu</Code> which describes the context-menu behavior:
      </PageText>
      <CodeBlock language="typescript" content={code} />
      <PageNavigation of={PATH} />
    </Container>
  );
}
